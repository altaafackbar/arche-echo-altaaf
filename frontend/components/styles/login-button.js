import React from 'react';
import { View, StyleSheet, Text, Image, Button, Pressable } from 'react-native'
import styles from './styles'

const LoginButton = (props) => {

    const type = props.type

    const backgroundColor = type === 'primary' ? '#8A76B6' : 'white'

    return(

        <View style={styles.container}>

        <Pressable style={styles.Button, {backgroundColor: backgroundColor}}>

        <Text style={styles.buttonText}>Sign In</Text>
            
        </Pressable>

        </View>



    )

}



export default LoginButton