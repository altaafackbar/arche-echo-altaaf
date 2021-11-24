import React from 'react';
import { useState } from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView, Pressable, Image, TouchableOpacity, Platform, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/styles/textBox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import GIcon from '../assets/images/Google__G__Logo.svg.png'
import AppleIcon from '../assets/images/Apple_logo_black.svg.png'
import * as Google from 'expo-google-app-auth';
import LoginButton from '../components/styles/login-button';
import OrBreak from '../components/styles/or_divider'
import { StatusBar } from 'expo-status-bar';
import { firebase } from '../Firebase';



export default function SignUp ()
{
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();


    // Setting up navigation using React Navigation

    // Navigate to the Onboarding Screens from Sign Up
    function navigateToOnboarding () {
        navigation.navigate('Onboarding')
    }

    // Navigate to the Login page from Sign Up
    function navigateToLogin () {
        navigation.navigate('Login')
    }

    function isUserEqual(googleUser, firebaseUser) {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }

    function onSignIn(googleUser) {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!isUserEqual(googleUser, firebaseUser)) {
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
                // googleUser.getAuthResponse().id_token);
            );
                // googleUser.getAuthResponse().id_token);
      
            // Sign in with credential from the Google user.
            firebase.auth()
                .signInWithCredential(credential)
                .then(function(result) {
                    console.log('user signed in')
                    // const currentUser = firebase.auth().currentUser;
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
                });
          } else {
            console.log('User already signed-in Firebase.');
          }
        });
      }

    async function signInWithGoogleAsync() {

        try {
          const result = await Google.logInAsync({
            iosClientId: '382032993333-iirilhp0hb7uglsjj5tqjlr0n0putv17.apps.googleusercontent.com',
            androidClientId: '382032993333-bc2mqr2c4vbi9q1fql7qlie9iock098a.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
            //   onSignIn(result);
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
                            disclaimer: false,
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
            //   const currentUser = firebase.auth().currentUser;
            //   console.log(currentUser)
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }
    
    const handlesSignUp = () => {
        // Creating user on firebase authentication
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                user.updateProfile({
                    displayName: firstName,
                })
                const currentUser = firebase.auth().currentUser;
                console.log(currentUser.email)
                // creating user profile on firestore
                // using user uid as a unique key to connect user profile
                const db = firebase.firestore()
                db
                    .collection("users")
                    .doc(currentUser.uid)
                    .set({
                        email: currentUser.email,
                        firstName: firstName,
                        lastName: lastName,
                        disclaimer: false,
                        admin: false,
                        starTools: ['empty'],
                    })
                    .then(() => {
                        console.log('User created');
                    })
                    .catch((error) => {
                        console.error('Error writing document: ', error);
                    });
            })
            .catch(error => {
                // Check if the email address already exist
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    Alert.alert('Error', 'This email address already in use, please Login instead.',[
                        {text: 'OK', onPress: () => console.log('OK pressed')}
                    ]);
                }
                // Check if the email address is valid
                if (error.code === 'auth/invalid-email') {
                    console.log('email address is invalid.');
                    Alert.alert('Error', 'This email address is invalid, please enter a correct email address.',[
                        {text: 'OK', onPress: () => console.log('OK pressed')}
                    ]);
                }
            // console.error(error)
            });
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

                // console.error(error);
            })
    };

    // Renders the elements on the screen
    return (
    
        //Entire screen container. Welcome header and subtext as well.
        <SafeAreaView style={styles.container}>
        <StatusBar style='auto'/>
        <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome!</Text>
        <Text style={styles.subheaderText}>Enter your details to get started.</Text>
        </View>

        {/* Setting Up Text Inputs: First Name, Last Name, Email, and Password. Using a CustomInput component created in textBox.js */}
        <CustomInput 
            placeholder='First Name' 
            value={firstName} 
            setValue={setFirstName}
            onChangeText={text => setFirstName(text)}
        />
        <CustomInput 
            placeholder='Last Name' 
            value={lastName} 
            setValue={setLastName}
            onChangeText={text => setLastName(text)}
        />
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
        />

        {/* Sign Up Button Component */}
        <LoginButton
            type='signIn'
            content='Sign Up'
            onPress={ () => {handlesSignUp()}}
        >
        </LoginButton>

        {/* Line Break with 'Or' in between two lines. Created as a component. */}
        <OrBreak></OrBreak>

        {/* Setting up sign up with Google and Apple. */}
        <View style={styles.socialContainer}>

        {/* Sign Up with Google Button */}
        <TouchableOpacity
        onPress = {() => signInWithGoogleAsync()}
        style={styles.socialSignUpStyles}>
            <Image source={GIcon} style={styles.socialIcons}/>
            <Text style={styles.socialIconText}>Sign Up With Google</Text>
        </TouchableOpacity>

        {/* Sign Up With Apple button */}
        <TouchableOpacity
        style={styles.socialSignUpStyles}>
            <Image source={AppleIcon} style={{padding: 10,
            margin: 20,
            width: 24,
            height: 24,
            resizeMode: 'contain'}}/>
            <Text style={styles.socialIconText}>Sign Up With Apple</Text>
        </TouchableOpacity>
        </View>

        {/* Already Have An Account dialog at the bottom */}
        <View style={{width: '90%', padding: 10, alignItems: 'center'}}>
            <Text>
                Already have an account?  
                <Text style={{fontStyle: 'italic', color: '#8A76B6', fontWeight: 'bold'}} onPress= {()=>navigateToLogin()}> Sign In.</Text>
            </Text>
        </View>

        
        </SafeAreaView>
        )

}


// Setting up stylesheet
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
    },
    headerText:{
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
        textAlign: 'center',
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