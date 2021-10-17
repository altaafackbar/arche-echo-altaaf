import React from 'react';
import { useState } from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView, Pressable, Image, TouchableOpacity, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/styles/textBox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import GIcon from '../assets/images/Google__G__Logo.svg.png'
import AppleIcon from '../assets/images/Apple_logo_black.svg.png'
import * as Google from 'expo-google-app-auth';
import LoginButton from '../components/styles/login-button';
import OrBreak from '../components/styles/or_divider'


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

    async function signInWithGoogleAsync() {

        try {
          const result = await Google.logInAsync({
            androidClientId: '772373435594-hqgdpesi3riqnjr4aqt641dc8d0ho7t8.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
      
          if (result.type === 'success') {
              console.log(result.user.name)
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
      }

    // Renders the elements on the screen
    return (
    
    //Entire screen container. Welcome header and subtext as well.
    <SafeAreaView style={styles.container}>
    <View style={styles.headerContainer}>
    <Text style={styles.headerText}>Welcome!</Text>
    <Text style={styles.subheaderText}>Enter your details to get started.</Text>
    </View>

    {/* Setting Up Text Inputs: First Name, Last Name, Email, and Password. Using a CustomInput component created in textBox.js */}
    <CustomInput placeholder='First Name' value={firstName} setValue={setFirstName}/>
    <CustomInput placeholder='Last Name' value={lastName} setValue={setLastName}/>
    <CustomInput placeholder='Email' value={email} setValue={setEmail}/>
    <CustomInput 
    placeholder='Password' 
    value={password} 
    setValue={setPassword} 
    secureTextEntry={true}
    ></CustomInput>

    {/* Sign Up Button Component */}
    <LoginButton
    type='signIn'
    content='Sign Up'
    onPress={() => navigateToOnboarding()}
    ></LoginButton>

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