import React, { useCallback, useState, Component, } from 'react'
import { ScrollView, Pressable, Dimensions, PixelRatio, View, Text, StyleSheet, Button, SafeAreaView } from 'react-native'
import YoutubeIFrame from 'react-native-youtube-iframe';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../components/styles/ThemeProvider';


export default function ContactUs(props) {

    const w = Math.floor(Dimensions.get('window').width)
    const h = Math.floor(Dimensions.get('window').height)
    const { children } = props;     // undefined
    const { colors, isDark } = useTheme();

    const styles = StyleSheet.create({
        container:
        {
            flex: 1,
            backgroundColor: "#fff",     // #f0f7f8
            alignItems: 'center',
            height: h,
            // justifyContent: 'center', // put things centered on vertical axis
        },
        tDescription:
        {
            color: "#8b75b5",
            fontWeight: '700',

        },

    });

    return (
        // <SafeAreaView style={{ flex: 1, }}>
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.tDescription}>Contact us for more information.</Text>
            </View>
        </ScrollView >
        // </SafeAreaView>
    )
}