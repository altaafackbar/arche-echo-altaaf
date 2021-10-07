import React from 'react';
import { Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Login ()
{

    const navigation = useNavigation();

    function navigateToSignUp () {
        navigation.navigate('SignUp')
    }

    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text> Login Screen </Text>
    <Button title="Open SignUp Screen"
    onPress= {()=>navigateToSignUp()}
    />
    
    </View>
    )

}