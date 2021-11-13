import React from 'react'
import { useState } from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView, Pressable, Image, TouchableOpacity, TextInput, ScrollView, TouchableOpacityBase, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { firebase } from '../../Firebase';

const ForgotPassword = () => {

    var forgotMessage = `Enter your email address down below.
An email will be sent to you allowing you to change your password.`

    const navigation = useNavigation()
    goBack = () => navigation.goBack()

    const [email, setEmail] = React.useState('');

    const checkInput = !email.trim().length == 0

    //Here's the Password Reset Stuff for Firebase

    function sendResetPassword(email) {
        // console.log(email)
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert('If we have an account matching your email address, you will receive an email with a link to reset your password.')
                
            }).catch((error) => {
                console.log(error.code)
                console.log(error.message)
                if (error.code === 'auth/user-not-found') {
                    Alert.alert('If we have an account matching your email address, you will receive an email with a link to reset your password.')
                }
                if (error.code === 'auth/invalid-email') {
                    Alert.alert('Please enter a valid email address.')
                }
            })
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.forgotHeaderContainer}>
                <Text style={styles.forgotHeaderText}>Forgot Password</Text>
            </View>

            <View style={styles.forgotTextContainer}>
                <Text style={styles.forgotPasswordText}>{forgotMessage}</Text>
            </View>
            <View style={styles.textContainer}>
                <TextInput
                selectionColor={'#a5a5a5'}
                placeholder='Email address'
                value={email}
                setValue={setEmail}
                onChangeText={text => setEmail(text)}
                >
                </TextInput>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                style={checkInput ? styles.button : styles.buttonDisabled}
                disabled={checkInput ? false : true}
                onPress={() => {sendResetPassword(email)}}

                >
                <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )


}

export default ForgotPassword

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fafafa', 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start',
    },
    forgotHeaderContainer: {
        width: '100%',
        textAlign: 'left',
        padding: 10,
        alignSelf: 'flex-end',
        marginTop: '20%',
    },
    forgotHeaderText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: '#1f1f1f',
    },
    forgotTextContainer: {
        width: '90%',
        overflow: 'hidden',
        paddingRight: 2,
        alignItems: 'flex-end'
    },
    forgotPasswordText: {
        color: '#1f1f1f',
        fontSize: 16,
        lineHeight: 26,
        textAlign: 'left',
    },
    textContainer: {
        width: '90%',
        backgroundColor: 'transparent',
        height: 40, 
        borderColor: '#dadada', 
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginLeft: 17,
        marginRight: 17,
        marginVertical: 40,
        paddingVertical: 10,
    },
    buttonContainer: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        width: '95%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fafafa'
      },
      buttonDisabled: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        width: '95%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
    },
    buttonTextDisabled: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fafafa',
        opacity: 0.5,
    }

})