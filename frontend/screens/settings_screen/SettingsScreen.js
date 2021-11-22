import React, { Component } from "react";
import { Button, StyleSheet, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "../../Firebase";
import { DarkThemeToggle } from "../../components/styles/DarkThemeToggle";
import themeContext from "../../components/styles/ThemeContext";
import { useNavigation } from '@react-navigation/native';
import { useTheme } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


function SettingsScreen () {

    const { setTheme, theme } = React.useContext(themeContext);

    const {colors, isDark} = useTheme();

    // Change the text in the flatlist for the toggle based on the theme
    const checkMode = theme === 'Light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'

    const navigation = useNavigation()

    // Setting up navigation for About Us and Contact Us Pages
    function navigateToAboutUs() {
        navigation.navigate('AboutUs', {screen: 'AboutUs'})
    }

    function navigateToContactUs() {
        navigation.navigate('ContactUs', {screen: 'ContactUs'})
    }

    // Set the color of list item based on the theme 
    const checkItemColor = theme === 'Light' ? '#f2f2f2' : '#313131'

    // Change the > button color in the flatlist based on the theme
    const checkThemeColor = theme === 'Light' ? '#c4c4c4' : '#ffffff'


    // Set the data for the flatlist to get information from
    const settingsData = [
        {
            id: '1',
            title: 'About Us',
        },
        {
            id: '2',
            title: 'Contact Us',
        },
        {
            id: '3',
            title: checkMode,
        },
    ]

    // This is the list item. Here I have the list item initialized based on the width of the window.
    const Item = ({ title }) => (
        <View style={[styles.item, {width: Dimensions.get('window').width * 0.95}, {backgroundColor: checkItemColor}]}>
          <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
          <View>
          {title === checkMode ? <DarkThemeToggle></DarkThemeToggle>
          : <TouchableOpacity onPress={() => 
          {if (title === 'About Us'){navigateToAboutUs()}
          {if (title === 'Contact Us'){navigateToContactUs()}}
          }
          } >
            <Icon name='chevron-right' size={24} color={checkThemeColor}/>
          </TouchableOpacity> }
          </View>
        </View>
      );

      // Set up item object to render inside of the view
      const renderItem = ({ item }) => (
        <Item title={item.title} />
      );


    const handleLogOut = () => {
        // Get current user
        const currentUser = firebase.auth().currentUser;
        console.log(currentUser.isAnonymous)
        // Check if current user is anonymous
        if (currentUser.isAnonymous === true) {
            // If user is anonymous we delete user's profile first 
            firebase.firestore().collection('users').doc(currentUser.uid).delete().then(() => {
                console.log('user deleted')
            }).catch((error) => {
                console.error("Error removing document: ", error);
            })
            // Then delete user
            currentUser.delete().then(() => {
                console.log('Guest user deleted.')
            })
        // If user is a normal user, we just log in out
        } else {
            firebase.auth().signOut()
        }
    }



    
        return (
            <SafeAreaView style={styles.container}>
            <FlatList
                data={settingsData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
                <Button 
                    title="Log Out"
                    onPress={() => {handleLogOut(); navigation.replace('Landing')}}
                >
                </Button>
            </SafeAreaView>
        )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    item: {
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 16,
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 2,
      },
})