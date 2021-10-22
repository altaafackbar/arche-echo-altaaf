import React from 'react'
import { useState } from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView, Pressable, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DisclaimerModal = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text></Text>
        </SafeAreaView>
    )
}

export default disclaimer-modal


styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fafafa', 
        alignItems: 'center', 
        justifyContent: 'center'
    }

})
