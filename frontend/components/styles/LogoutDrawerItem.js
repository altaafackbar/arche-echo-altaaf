import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer'
import * as IconlyPack from 'react-native-iconly';
import { firebase } from "../../Firebase";
import { useTheme } from '@react-navigation/native';
import themeContext from './ThemeContext'

const LogoutDrawerItem = () => {

    const { setTheme, theme } = React.useContext(themeContext);

    // Set the color of the logout text based on the theme
    let logoutText;

    if (theme === 'Light'){
        logoutText = '#1f1f1f'
    }
    else {
        logoutText = '#ffffff'
    }

    function handleLogOut () {
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
        <TouchableOpacity 
            onPress={() => handleLogOut()}
            style={{ bottom: 0, position: 'absolute', width: '100%', marginBottom: '5%' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection:'row', alignItems: 'center' }}>
            <IconlyPack.Logout set='bold' style={{marginRight: 10, color: logoutText}} size={16} />
            <Text style={{color: logoutText, fontWeight: '600'}}>Logout</Text>
            </View>
        </TouchableOpacity>
    )
}


export default LogoutDrawerItem

const style = StyleSheet.create({
    topContainer: {
        bottom: 0, 
        position: 'absolute', 
        width: '100%', 
        marginBottom: '5%', 
    },
    textContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection:'row', 
        alignItems: 'center',
    },
    textStyle: {
        color: '#1f1f1f',
        fontSize: 16,
        fontWeight: '600',
    }
})