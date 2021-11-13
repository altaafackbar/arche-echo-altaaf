import React from 'react';
import { useState } from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView, Pressable, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/styles/textBox';
import OrBreak from '../components/styles/or_divider'
import GIcon from '../assets/images/Google__G__Logo.svg.png'
import AppleIcon from '../assets/images/Apple_logo_black.svg.png'
import Guest from '../assets/images/Profile.png'
import * as Google from 'expo-google-app-auth';
import LoginButton from '../components/styles/login-button';
import ForgotPassword from '../components/styles/forgot-password';
import { StatusBar } from 'expo-status-bar';
import { firebase } from '../Firebase';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    const [hidePass, setHidePass] = useState(true)

    navigateToOnboarding = () => navigation.navigate('Onboarding');
    navigateToSignUp = () => navigation.navigate('SignUp');
    navigateToLanding = () => navigation.navigate('Landing')

    navigateToMainMenu = () => navigation.navigate('MainMenu')
    navigateToDisclaimer = () => navigation.navigate('DisclaimerModal')

    const handleLogIn = () => {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Logged in with: ', user.email)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                Alert.alert('Error', errorMessage, [
                    {text: 'OK', onPress: () => console.log('OK pressed')}
                ]);
            })
    };
    
    const handleAnonymousSignIn = () => {
        firebase.auth()
            .signInAnonymously()
            .then(() => {
                console.log('User signed in anonymously');
            })
            .catch(error => {
                if (error.code === 'auth/operation-not-allowed') {
                    console.log('Enable anonymous in your firebase console.');
                }

                console.error(error);
            })
    };

    // Sign In With Google Information

    async function signInWithGoogleAsync() {

        try {
            const result = await Google.logInAsync({
                // behavior: 'web',
                iosClientId: '382032993333-iirilhp0hb7uglsjj5tqjlr0n0putv17.apps.googleusercontent.com',
                androidClientId: '382032993333-bc2mqr2c4vbi9q1fql7qlie9iock098a.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                console.log(result.user.name)
                const {idToken, accessToken} = result
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    idToken,
                    accessToken
                )
                firebase.auth()
                    .signInWithCredential(credential)
                    .then(userCredentials => {
                        const user = userCredentials.user;
                        user.updateProfile({
                            displayName: result.user.givenName,
                            })
                        const currentUser = firebase.auth().currentUser;
                        const db = firebase.firestore()
                        // console.log(result.user.email)
                        // console.log(result.user.givenName)
                        db
                            .collection('users')
                            .doc(currentUser.uid)
                            .set({
                                email: currentUser.email,
                                firstName: result.user.givenName,
                                lastName: result.user.familyName,
                                disclaimer: true,
                                admin: false,
                                starTools: ['empty'],
                            })
                    })
                    .catch((error) => {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // ...
                    })
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto'/>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Welcome Back!</Text>
                <Text style={styles.subheaderText}>Enter your email and password to get started.</Text>
            </View>
            <CustomInput 
                placeholder='Email' 
                value={email} 
                setValue={setEmail} 
                onChangeText={text => setEmail(text)}
            />
            <CustomInput
                placeholder='Password'
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
            ></CustomInput>

            <ForgotPassword></ForgotPassword>

            <LoginButton
                type='signIn'
                content='Sign In'
                onPress={() => {handleLogIn(); navigateToLanding()}}
            ></LoginButton>
            

            {/* Add lines with 'or' section */}
            <OrBreak></OrBreak>

            <View style={styles.socialContainer}>
                <TouchableOpacity
                    onPress={() => signInWithGoogleAsync()}
                    style={styles.socialSignUpStyles}>
                    <Image source={GIcon} style={styles.socialIcons} />
                    <Text style={styles.socialIconText}>Sign In With Google</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.socialSignUpStyles}>
                    <Image source={AppleIcon} style={{
                        padding: 10,
                        margin: 20,
                        width: 24,
                        height: 24,
                        resizeMode: 'contain'
                    }} />
                    <Text style={styles.socialIconText}>Sign In With Apple</Text>
                </TouchableOpacity>
            </View>

            <View style={{ width: '90%', padding: 10, alignItems: 'center', paddingBottom: '10%' }}>
                <Text>
                    Don't have an account?
                    <Text style={{ fontStyle: 'italic', color: '#8A76B6', fontWeight: 'bold' }} onPress={() => navigateToSignUp()}> Sign Up.</Text>
                </Text>
            </View>

            {/* <Button title="Open SignUp Screen"
    onPress= {()=>navigateToSignUp()}
    /> */}

        </SafeAreaView>
    )

}


// Creating the stylesheet
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        width: '100%',
        textAlign: 'left',
        padding: 20,
        alignSelf: 'flex-end',
        marginTop: -5,
    },
    headerText: {
        fontSize: 32,
        color: '#1f1f1f',
        textAlign: 'left',
    },
    subheaderText: {
        fontSize: 16,
        color: '#1f1f1f',
        textAlign: 'left',
        marginTop: '0.5%',
        color: '#919191',
    },
    buttonContainer: {
        width: '70%',
        padding: 10,
        textAlignVertical: 'center',
    },
    button: {
        backgroundColor: '#8A76B6',
        borderRadius: 50,
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    socialIcons: {
        padding: 10,
        margin: 20,
        width: 24,
        height: 24,
    },
    socialSignUpStyles: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 5,
        borderColor: '#B9B9B9',
        height: 40,
        borderWidth: 0.5,
        margin: 5,
        marginVertical: 10,
    },
    socialIconText: {
        color: '#1f1f1f',
        textAlignVertical: 'center',
        textAlign: 'center',
        alignItems: 'center'
    },
    socialContainer: {
        width: '70%',
        padding: 10,
        marginVertical: 0,
    }

});