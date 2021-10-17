import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const or_divider = () => {
    return (
        <View style={styles.lineContainer}>
        <View style={styles.horizontalLine} />
        <View>
            <Text style={{width: 50, textAlign: 'center', color: '#B9B9B9'}}>Or</Text>
        </View>
        <View style={styles.horizontalLine} />
        </View>
    )
}

export default or_divider

const styles = StyleSheet.create({
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
})