import React from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView, Pressable, Image, TouchableOpacity} from 'react-native';
import CustomInput from '../components/styles/textBox';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


export default function SignUp ()
{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const navigation = useNavigation();
    
    function navigateToSignUp () {
        navigation.navigate('SignUp')
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Welcome to ARCHE | ECHO!</Text>
            <Text style={styles.subheaderText}>Enter your account details to get started.</Text>
            </View>
            <CustomInput placeholder='First Name' value={email} setValue={setFirstName}/>
            <CustomInput placeholder='Last Name' value={email} setValue={setLastName}/>
            <CustomInput placeholder='Email' value={email} setValue={setEmail}/>
            <CustomInput 
            placeholder='Password' 
            value={password} 
            setValue={setPassword} 
            secureTextEntry={true}
            ></CustomInput>

            <View style={styles.buttonContainer}>

            <Pressable 
            style={styles.button}
            onPress = {() => navigation.navigate('Onboarding')}
            >
            <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>

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
        padding: 10
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