import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import LogoutDrawerItem from './LogoutDrawerItem';

const CustomDrawer = (props) => {


    function dialNumber (number) {
        let phoneNumber = ''
        if (Platform.OS === 'android'){
            phoneNumber = `tel:${number}`
        }
        else {phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    }

    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
            <View>
                <Text style={styles.drawerHeader}>Child Care Aid</Text>
                <Text style={styles.subheaderText}>Call 911 for Emergencies and 811 for Nurse Help</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                    style={styles.emergencyButton}
                    onPress={() => dialNumber(911)}
                    >
                    <Text style={styles.buttonText}>911</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.healthLinkButton}
                    onPress={() => dialNumber(811)}
                    >
                    <Text style={styles.healthButtonText}>811</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.horizontalLine} />
            
            <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <LogoutDrawerItem></LogoutDrawerItem>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    drawerHeader: {
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: '600',
        marginTop: 10,
    },
    emergencyButton: {
        backgroundColor: '#79cc9b',
        borderRadius: 8,
        height: 40,
        width: 120,
        alignItems: 'center',
    },
    healthLinkButton: {
        backgroundColor: '#97c0f6',
        borderRadius: 8,
        height: 40,
        width: 120,
        alignItems: 'center',
    },

    buttonContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        marginTop: 20, 
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: '#16773e',
        margin: 10,
    },
    healthButtonText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: '#215aa6',
        margin: 10,
    },
    subheaderText: {
        fontWeight: '500',
        color: '#bcbcc1',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    horizontalLine: {
        flex: 1, 
        height: 0.3, 
        backgroundColor: '#dadada',
        marginBottom: 20,
    },
    logoutButtonStyle: {
        backgroundColor: '#f6b9b9',
        bottom: 0,
        width: '100%',
    }
})