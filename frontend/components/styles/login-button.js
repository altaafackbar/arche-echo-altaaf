import React from 'react';
import { View, StyleSheet, Text, Image, Button, Pressable, TouchableOpacity } from 'react-native'

const LoginButton = (props) => {

    const type = props.type
    const content = props.content
    const onPress = props.onPress
    const backgroundColor = type === 'signIn' ? '#8A76B6' : 'transparent'
    const borderWidth = type === 'signIn' ? 0 : 1
    const borderColor = type === 'signIn' ? 'transparent' : '#8A76B6'
    const textColor = type === 'signIn' ? '#fff' : '#8A76B6'

    return(

        <View style={styles.container}>

        <TouchableOpacity 
        style={[styles.button, {backgroundColor: backgroundColor}, {borderColor: borderColor}, {borderWidth: borderWidth}]}
        onPress={() => onPress()}
        >
        <Text style={[styles.buttonText, {color: textColor}]}>{content}</Text>
        </TouchableOpacity>

        </View>



    )

}

export default LoginButton

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#8A76B6',
        borderRadius: 10,
        width: '85%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500'
      },
})