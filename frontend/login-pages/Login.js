import React from 'react';
import { useState } from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView, Pressable, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/styles/textBox';
import OrBreak from '../components/styles/or_divider'
import GIcon from '../assets/images/Google__G__Logo.svg.png'
import AppleIcon from '../assets/images/Apple_logo_black.svg.png'
import Guest from '../assets/images/Profile.png'
import * as Google from 'expo-google-app-auth';
import LoginButton from '../components/styles/login-button';

export default function Login ()
{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();
    // const [hidePass, setHidePass] = useState(true)

    function navigateToOnboarding () {
        navigation.navigate('Onboarding')
    }

    function navigateToSignUp () {
        navigation.navigate('SignUp')
    }

    function navigateToMainMenu () {
        navigation.navigate('MainMenu')
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

    return (
    <SafeAreaView style={styles.container}>
    <View style={styles.headerContainer}>
    <Text style={styles.headerText}>Welcome Back!</Text>
    <Text style={styles.subheaderText}>Enter your email and password to get started.</Text>
    </View>
    <CustomInput placeholder='Email' value={email} setValue={setEmail}/>
    <CustomInput 
    placeholder='Password' 
    value={password} 
    setValue={setPassword} 
    secureTextEntry={true}
    ></CustomInput>
    <LoginButton
    type='signIn'
    content='Sign In'
    onPress={() => navigateToOnboarding()}
    ></LoginButton>

    {/* Add lines with 'or' section */}
    <OrBreak></OrBreak>
 
    <View style={styles.socialContainer}>
    <TouchableOpacity
    onPress = {() => signInWithGoogleAsync()}
    style={styles.socialSignUpStyles}>
        <Image source={GIcon} style={styles.socialIcons}/>
        <Text style={styles.socialIconText}>Sign In With Google</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={styles.socialSignUpStyles}>
        <Image source={AppleIcon} style={{padding: 10,
        margin: 20,
        width: 24,
        height: 24,
        resizeMode: 'contain'}}/>
        <Text style={styles.socialIconText}>Sign In With Apple</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={styles.socialSignUpStyles}
    onPress={()=>navigateToMainMenu()}>
        <Image source={Guest} style={{padding: 10,
        margin: 20,
        width: 24,
        height: 24,
        resizeMode: 'contain'}}/>
        <Text style={styles.socialIconText}>Continue As Guest</Text>
    </TouchableOpacity>
    </View>

    <View style={{width: '90%', padding: 10, alignItems: 'center', paddingBottom: '10%'}}>
        <Text>
            Don't have an account?  
            <Text style={{fontStyle: 'italic', color: '#8A76B6', fontWeight: 'bold'}} onPress= {()=>navigateToSignUp()}> Sign Up.</Text>
        </Text>
    </View>

    {/* <Button title="Open SignUp Screen"
    onPress= {()=>navigateToSignUp()}
    /> */}
    
    </SafeAreaView>
    )

}



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