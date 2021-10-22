import React, { Component } from 'react';
import { useState } from 'react';
import { TextInput, StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';

export default function ForgotPassword() {

    return(

        <View style={styles.container}>

        <TouchableOpacity 
        style={{backgroundColor: 'transparent'}}
        // onPress={() => onPress()}
        >
        <Text style={styles.textDetails}>Forgot Password?</Text>
        </TouchableOpacity>

        </View>

    )

}

const styles = StyleSheet.create({

    container: {
        width: '90%',
        paddingBottom: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

    textDetails: {
        color: '#1f1f1f',
        backgroundColor: 'transparent',
        fontStyle: 'italic',
        fontSize: 12,
    },

})