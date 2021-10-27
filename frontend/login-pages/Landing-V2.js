import React from 'react';
import { Text, View, Button, StyleSheet, Image, SafeAreaView, Pressable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';
import MainPhoto from '../assets/images/landing-image.png'
import * as Google from 'expo-google-app-auth';
import GIcon from '../assets/images/Google__G__Logo.svg.png'
import AppleIcon from '../assets/images/Apple_logo_black.svg.png'
import Guest from '../assets/images/Profile.png'
import Email from '../assets/images/email-icon.jpg'
import LoginButton from '../components/styles/login-button';

export default function LandingV2 ()
{

    const navigation = useNavigation();

    function navigateToLogin () {
        navigation.navigate('Login')
    }

    function navigateToDisclaimer () {
      navigation.navigate('DisclaimerModal')
  }

    function navigateToSignUp (){
      navigation.navigate('SignUp')
    }
    
    async function signInWithGoogleAsync() {

        try {
          const result = await Google.logInAsync({
            androidClientId: '370906179427-g4a6l0r1arabjh4oqai6msvds02vrd9p.apps.googleusercontent.com',
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
    <View style={styles.imageContainer}>
        <Image source={MainPhoto} style={styles.mainImage}></Image>
    </View>
    <View style={styles.titles}>
        <Text style={styles.headerTitle}>Welcome to ARCHE | ECHO!</Text>
        <Text style={styles.subTitle}>All the resources you need to maximize your child's care.</Text>
    </View>

    <LoginButton
    type='signIn'
    content='Sign In'
    onPress={() => navigateToLogin()}
    ></LoginButton>

    <LoginButton
    type='signUp'
    content='Sign Up'
    onPress={() => navigateToSignUp()}
    ></LoginButton>

    {/* This is the 'Don't Have An Account' section at the bottom */}
    <View style={{width: '90%', padding: 10, alignItems: 'center', paddingBottom: '10%', marginTop: '2%'}}>
        <TouchableOpacity>  
            <Text style={{fontStyle: 'italic',color: '#1f1f1f', fontWeight: '500', fontSize: 16}} onPress= {()=>navigateToDisclaimer()}>Continue As Guest</Text>
        </TouchableOpacity>
    </View>
    
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
  titles: {
      marginTop: '10%',
      width: '100%',
      textAlign: 'center'
  },
  headerTitle: {
      fontSize: 24,
      color: '#1f1f1f',
      textAlign: 'center',
  },
  subTitle: {
      fontSize: 16,
      color: '#919191',
      textAlign: 'center',
      padding: 10,
  },
  regularText: {
    fontSize: 16,
    color: '#1f1f1f',
    textAlign: 'center',
    padding: 10,
},
  mainImage: {
      width: 300,
      height: 300,
  },
  imageContainer: {
      width: '100%',
      alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  button: {
      backgroundColor: '#8A76B6',
      borderRadius: 50,
      width: '60%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center'
  },
  signInButtonContainer: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
    
  },
  signInButton: {
    backgroundColor: '#5633a1',
    borderRadius: 50,
    width: '30%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
},
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  lineContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 20,
},
horizontalLine: {
    flex: 1, 
    height: 0.5, 
    backgroundColor: '#B9B9B9',
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
    alignItems: 'center',
    paddingRight: 15,
},
socialIcons: {
    padding: 10,
    margin: 20,
    width: 24,
    height: 24,
},
socialContainer: {
    width: '70%',
    padding: 10,
    marginVertical: 0,
}
});