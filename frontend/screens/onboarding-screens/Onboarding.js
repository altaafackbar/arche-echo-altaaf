import React from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';

//This is the onboarding page. These are for the onboarding screens for new users and guests.

const OnboardingScreen = () => {
    const navigation = useNavigation()
    return (
        <Onboarding
        onSkip={() => navigation.replace('MainMenu')}
        onDone={() => navigation.replace('MainMenu')}
        pages={[
            {
                backgroundColor: '#ffffff',
                image: <Image source={require('../../assets/images/onboarding-updated.png')} style={styles.imageResizer} />,
                title: "Tools For Children's Health",
                subtitle: "We work with parents to co-create tools for learning about common childhood illnesses. Access these award-winning tools in our app to learn more about caring for your child's illness!",
            },
            
        ]} 
        />
    )

}

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    imageResizer: {
        width: '100%', 
        height: '100%',
        resizeMode: 'center', 
        marginBottom: '-95%',
    },
})

// 76c1f9

// Test