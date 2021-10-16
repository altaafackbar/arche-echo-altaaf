import React from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        pages={[
            {
                backgroundColor: '#ffd44d',
                image: <Image source={require('../../assets/images/onboard-yellow.png')} style={styles.imageResizer} />,
                title: 'Onboarding 1',
                subtitle: 'Access our resources from the palm of your hands. Anytime. Anywhere.',
            },
            {
                backgroundColor: '#76c1f9',
                image: <Image source={require('../../assets/images/onboarding-2.png')} style={styles.imageResizer} />,
                title: 'Onboarding 2',
                subtitle: 'Learn about common childhood illnesses developed in collaboration with our partners and funders.',
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