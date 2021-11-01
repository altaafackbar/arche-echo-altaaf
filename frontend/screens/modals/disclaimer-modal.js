import React from 'react'
import { useState } from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView, Pressable, Image, TouchableOpacity, TextInput, ScrollView, TouchableOpacityBase } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { firebase } from '../../Firebase';

const DisclaimerModal = () => {

    const navigation = useNavigation()
    navigateToOnboarding = () => navigation.replace('Onboarding');
    navigateToSignUp = () => navigation.navigate('SignUp');
    goBack = () => navigation.goBack()

    const [toggleIcon, setToggle] = useState(true)
    const toggleFunction = () => {
        setToggle(!toggleIcon)
    }
    let primary = '#007bff'

    const updateUserProfile = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const currentUser = firebase.auth().currentUser
                firebase.firestore()
                    .collection('users')
                    .doc(currentUser.uid)
                    .update({
                        disclaimer: true,
                    })
            } else {
                console.log('no current user')
            }
        })
    };

    const disclaimer = 'Please remember that ARCHE | ECHO cannot give medical advice. ARCHE | ECHO does not replace your doctor. Call 911 immediately in the event of an emergency.'
    const disclaimerAgree = "I agree to ARCHE | ECHO's terms and conditions and confirm that I have read the disclaimer statement above."
    
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.disclaimerHeaderContainer}>
        <Text style={styles.disclaimerHeaderText}>DISCLAIMER</Text>
        </View>
        <View style={styles.disclaimerTextContainer}>
            <Text style={styles.disclaimerText}>{disclaimer}</Text>
        </View>
        <View style={styles.disclaimerConfirm}>
            <TouchableOpacity style={{backgroundColor: 'transparent', paddingLeft: 13}} onPress={() => toggleFunction()}>
                <Icon name={toggleIcon ? 'checkbox-blank-circle-outline' : 'check-circle'} size={24} color={toggleIcon ? '#dadada' : primary}></Icon>
            </TouchableOpacity>
            <Text style={styles.disclaimerAgreeMsg}>{disclaimerAgree}</Text>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={toggleIcon ? styles.continueButtonDisabled : styles.continueButton} disabled={toggleIcon ? true : false} onPress={() => {updateUserProfile(); navigateToOnboarding()}}>
                <Text style={toggleIcon ? styles.buttonTextDisabled : styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>

        </SafeAreaView>
    )
}

export default DisclaimerModal


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fafafa', 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start',
    },
    disclaimerHeaderContainer: {
        width: '100%',
        textAlign: 'left',
        padding: 10,
        alignSelf: 'flex-end',
        marginTop: '20%',
    },
    disclaimerHeaderText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: '#1f1f1f',
    },
    disclaimerTextContainer: {
        width: '90%',
        overflow: 'hidden',
        alignItems: 'flex-end'
    },
    disclaimerText: {
        color: '#1f1f1f',
        fontSize: 16,
        lineHeight: 26,
        paddingLeft: 10,
        textAlign: 'left'
    },
    disclaimerConfirm: {
        width: '80%',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
    },
     disclaimerAgreeMsg: {
         fontSize: 10,
         marginLeft: 10,
         textAlign: 'left',
     },
     buttonContainer: {
        width: '100%',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
     continueButton: {
         backgroundColor: '#007bff',
         borderRadius: 5,
         width: '100%',
         height: 40,
         alignItems: 'center',
         opacity: 1,
         marginTop: 20,
         textAlign: 'center',
     },
     continueButtonDisabled: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        width: '100%',
        height: 40,
        alignItems: 'center',
        opacity: 0.5,
        marginTop: 20,
     },
     buttonText: {
        fontSize: 16,
        color: '#fafafa',
        fontWeight: '500',
        textAlign: 'center',
        alignItems: 'center',
        margin: 10,
      },
      buttonTextDisabled: {
        fontSize: 16,
        color: '#fafafa',
        fontWeight: '500',
        textAlign: 'center',
        alignItems: 'center',
        margin: 10,
      },

})

// Please remember that ARCHE | ECHO cannot give medical advice. 
// ARCHE | ECHO does not replace your doctor. Call 911 immediately in the event of an emergency.

// Disclaimer Checkbox
// I agree to ARCHE | ECHO's terms and conditions and confirm that I have read the disclaimer statement above.