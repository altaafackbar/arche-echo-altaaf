import React from 'react';
import { useState } from 'react';
import { Text, Button, Pressable, StyleSheet, TouchableOpacity, View, Touchable, SafeAreaView, ScrollView, Image, Platform } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { FlatGrid } from 'react-native-super-grid';
// import ToolsAndResources from '../../assets/images/tools-resources-menu.png'
// import FindAClinic from '../../assets/images/find-clinic-menu.png'
// import StarredResources from '../../assets/images/starred-resources-menu.png'
// import SavedLocations from '../../assets/images/saved-locations.png'
// import Settings from '../../assets/images/settings-menu.png'
// import SymptomCheck from '../../assets/images/symptom-checker.png'
import ToolsAndResources from '../../assets/Menu-Images/ToolsandResources.png'
import FindAClinic from '../../assets/Menu-Images/Map.png'
import StarredResources from '../../assets/Menu-Images/StarredResources.png'
import SavedLocations from '../../assets/Menu-Images/SavedLocations.png'
import Settings from '../../assets/Menu-Images/Settings.png'
import SymptomCheck from '../../assets/Menu-Images/SymptomChecker.png'
import { Dimensions } from 'react-native'
import { firebase } from '../../Firebase';
import { useTheme } from '@react-navigation/native';
import themeContext from "../../components/styles/ThemeContext";
import { StatusBar } from 'expo-status-bar';

export default function MainMenuV2(props) {

    const {children} = props;

    const {colors, isDark} = useTheme();

    const background = colors.background
    const color = colors.text
    
    const { setTheme, theme } = React.useContext(themeContext);

    // const containerStyle = {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     /* 
    //     * the colors.background value will change dynamicly with
    //     * so if we wanna change its value we can go directly to the pallet
    //     * this will make super easy to change and maintain mid or end project
    //     */
    //     backgroundColor: colors.background,
    // };

    var hour = new Date().getHours()
    const user = firebase.auth().currentUser
    var userName = user.displayName
    var message = 'Good '
    if (hour >= 0 && hour < 12) message += 'Morning'
    if (hour >= 12 && hour < 18) message += 'Afternoon'
    if (hour >= 18 && hour < 21) message += 'Evening'
    if (hour >= 21 && hour < 24) message += 'Night'
    if (userName != 'Guest') message += `, ${userName}`

    const navigation = useNavigation();

    function navigateToClinicMap() {
        navigation.navigate('Find A Clinic')
    }
    function navigateToSymptomChecker() {
        navigation.navigate('Symptom Checker')
    }
    function navigateToToolsAndResources() {
        navigation.navigate('Tools And Resources', { screen: 'Tools And Resources' })
    }

    function navigateToSettings() {
        navigation.navigate('Settings')
    }

    function navigateToStarredResources() {
        navigation.navigate('StarredResources')
    }

    function navigateToSavedLocations() {
        navigation.navigate('SavedLocations')
    }

    const cardColor = theme === 'Light' ? '#ffffff' : '#313131'


    const [items, setItems] = React.useState([
        { name: 'Tools and Resources', image: ToolsAndResources },
        { name: 'Symptom Checker', image: SymptomCheck },
        { name: 'Find A Clinic', image: FindAClinic },
        { name: 'Starred Resources', image: StarredResources },
        { name: 'Saved Locations', image: SavedLocations },
        { name: 'Settings', image: Settings }
    ]);

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: background}]}>
            <StatusBar style='auto'/>
            {children}
            <FlatGrid
                itemDimension={Dimensions.get('window').width / 3}
                data={items}
                style={styles.gridView}
                spacing={15}
                ListHeaderComponent={() => <Text style={[styles.messageText, {color: color}]}>{message}</Text>}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.itemContainer, {backgroundColor: cardColor}]} onPress={() => {
                        if (item.name === 'Tools and Resources') { navigateToToolsAndResources() }
                        { if (item.name === 'Symptom Checker') { navigateToSymptomChecker() } }
                        { if (item.name === 'Find A Clinic') { navigateToClinicMap() } }
                        { if (item.name === 'Starred Resources') { navigateToStarredResources() } }
                        { if (item.name === 'Saved Locations') { navigateToSavedLocations() } }
                        { if (item.name === 'Settings') { navigateToSettings() } }
                    }}>
                        <Image source={item.image} style={styles.imageDetails}></Image>
                        <Text style={[styles.textStyle, {color: colors.text}]}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            >

            </FlatGrid>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridView: {
        flex: 1,
    },
    containerRow1: {
        flex: 1,
        marginBottom: '-50%',
        paddingTop: '20%',
        paddingRight: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    containerRow2: {
        flex: 1,
        marginBottom: '-50%',
        paddingRight: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    containerRow3: {
        flex: 1,
        marginBottom: '-35%',
        paddingRight: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "45%",
        height: "45%",
        marginLeft: "5%",
        borderRadius: 15,
        backgroundColor: '#8A76B6',
    },
    text: {
        justifyContent: 'center',
        fontSize: 15,
        lineHeight: 25,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    itemContainer: {
        justifyContent: 'center',
        borderRadius: 10,
        padding: 10,
        height: 150,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.10,
        shadowRadius: 20, 
        elevation: 5,
        // borderColor: '#d1d1d6',
        // borderWidth: 2,
    },
    imageDetails: {
        resizeMode: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    textStyle: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    headerContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        ...Platform.select({
            ios: {
                marginTop: 10,
            },
            android: {
                marginTop: '20%',
            },
        }),
    },
    messageText: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 40,
        alignItems: 'center',
        textAlign: 'center',
    },
    nameText: {
        fontWeight: '500',
        fontSize: 24,
        color: '#1f1f1f',
    }

});