import React from 'react';
import { useState } from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../components/styles/textBox';
import TextBox from 'react-native-password-eye';

export default function Login ()
{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();

    function navigateToSignUp () {
        navigation.navigate('SignUp')
    }

    return (
    <SafeAreaView style={styles.container}>
    <View style={styles.headerContainer}>
    <Text style={styles.headerText}>Welcome Back!</Text>
    <Text style={styles.subheaderText}>Enter your account details to get started.</Text>
    </View>
    <CustomInput placeholder='Email' value={email} setValue={setEmail} label='Email'/>
    <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true} label='Password'></CustomInput>
    <Button title="Open SignUp Screen"
    onPress= {()=>navigateToSignUp()}
    />
    
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
        position: 'absolute',
        right: 5,
        top: 5,
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

})