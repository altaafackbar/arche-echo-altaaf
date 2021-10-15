import React from 'react';
import { Text, View, Button, StyleSheet, Image, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';
import MainPhoto from '../assets/images/landing-image.png'
import * as Google from 'expo-google-app-auth';

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
        <Pressable
        style={styles.button}
        onPress= {()=>navigateToDisclaimer()}
        >
        <Text style={styles.buttonText}>Continue as Guest</Text>
        </Pressable>
    </View>
    <View style={styles.buttonContainer}>
        <Pressable
        style={styles.button}
        onPress= {()=>signInWithGoogleAsync()}
        >
        <Text style={styles.buttonText}>Google Sign up</Text>
        </Pressable>
    </View>
    <View style={styles.buttonContainer}>
        <Pressable
        style={styles.button}
        onPress= {()=>navigateToLogin()}
        >
        <Text style={styles.buttonText}>Apple Sign up</Text>
        </Pressable>
    </View>
    <View style={styles.buttonContainer}>
        <Pressable
        style={styles.button}
        onPress= {()=>navigateToLogin()}
        >
        <Text style={styles.buttonText}>Email Sign up</Text>
        </Pressable>
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
  }
});