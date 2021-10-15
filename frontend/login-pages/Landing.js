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

export default function Landing ()
{

    const navigation = useNavigation();

    function navigateToLogin () {
        navigation.navigate('Login')
    }

    function navigateToDisclaimer () {
      navigation.navigate('Disclaimer')
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
    <View style={styles.imageContainer}>
        <Image source={MainPhoto} style={styles.mainImage}></Image>
    </View>
    <View style={styles.titles}>
        <Text style={styles.headerTitle}>Welcome to ARCHE | ECHO!</Text>
        <Text style={styles.subTitle}>All the resources you need to maximize your child's care.</Text>
    </View>

    <View style={styles.buttonContainer}>
    <TouchableOpacity
    onPress = {() => navigateToDisclaimer()}
    style={styles.socialSignUpStyles}>
        <Image source={Guest} style={{padding: 10,
        margin: 20,
        width: 24,
        height: 24,
        resizeMode: 'contain'}}/>
        <Text style={styles.socialIconText}>Continue As Guest</Text>
    </TouchableOpacity>


    </View>
    {/* Add lines with 'or' section */}
    <View style={styles.lineContainer}>
    <View style={styles.horizontalLine} />
    <View>
    <Text style={{width: 50, textAlign: 'center', color: '#B9B9B9'}}>Or</Text>
    </View>
    <View style={styles.horizontalLine} />
    </View>

    <View style={styles.socialContainer}>
    <TouchableOpacity
    onPress = {() => signInWithGoogleAsync()}
    style={styles.socialSignUpStyles}>
        <Image source={GIcon} style={styles.socialIcons}/>
        <Text style={styles.socialIconText}>Sign Up With Google</Text>
    </TouchableOpacity>

    <TouchableOpacity
    style={styles.socialSignUpStyles}>
        <Image source={AppleIcon} style={{padding: 10,
        margin: 20,
        width: 24,
        height: 24,
        resizeMode: 'contain'}}/>
        <Text style={styles.socialIconText}>Sign Up With Apple</Text>
    </TouchableOpacity>
    <TouchableOpacity
    style={styles.socialSignUpStyles}>
        <Image source={Email} style={{padding: 10,
        margin: 20,
        width: 24,
        height: 24,
        resizeMode: 'contain'}}/>
        <Text style={styles.socialIconText}>Sign Up With Email</Text>
    </TouchableOpacity>
    </View>


    <View style={styles.signInButtonContainer}>
        <Text style={styles.regularText}>Already have an account?</Text>
        <Pressable
        style={styles.signInButton}
        onPress= {()=>navigateToLogin()}
        >
        <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
    </View>
    {/* <Button title="Open Login Screen"
    onPress= {()=>navigateToLogin()}
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
    width: '60%',
    padding: 10,
    marginVertical: 0,
}
});