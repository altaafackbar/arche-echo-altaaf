import React from 'react';
import { Text, View, Button, StyleSheet, Image, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';
import MainPhoto from '../assets/images/landing-image.png'

export default function Landing ()
{

    const navigation = useNavigation();

    function navigateToLogin () {
        navigation.navigate('Login')
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
      color: '#DEDEDE',
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
  },
  button: {
      backgroundColor: '#8A76B6',
      borderRadius: 50,
      width: '100%',
      height: 40,
      justifyContent: 'center',
      alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  }
});