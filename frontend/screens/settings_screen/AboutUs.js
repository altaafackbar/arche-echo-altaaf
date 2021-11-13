import React, { useCallback, useState, Component, } from 'react'
import { ScrollView, Pressable, Dimensions, PixelRatio, View, Text, StyleSheet, Button, SafeAreaView } from 'react-native'
import YoutubeIFrame from 'react-native-youtube-iframe';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../components/styles/ThemeProvider';


export default function AboutUs(props) {

    const w = Math.floor(Dimensions.get('window').width)
    const h = Math.floor(Dimensions.get('window').height)

    const styles = StyleSheet.create({
        container:
        {
            flex: 1,
            backgroundColor: "#fff",     // #f0f7f8
            alignItems: 'center',
            // height: h,
            // justifyContent: 'center', // put things centered on vertical axis
        },

        playerView:
        {
            // flex: 1,
            marginTop: 20,
            // borderWidth: 2,
            // borderColor: "rgba(139, 117, 181, 255)",
            // justifyContent: 'center',
        },

        viewPartner:
        {
            paddingHorizontal: 55,
            paddingVertical: 12,
            borderRadius: 23,
            borderWidth: 1,
            borderColor: "rgba(139, 117, 181, 255)",
        },

        viewPartnerText:
        {
            "fontWeight": "400",
            "fontSize": 16,
            "letterSpacing": 1,
            "color": "rgba(139, 117, 181, 255)"
        },

        aboutWrapper:
        {
            paddingHorizontal: 30,
            // "paddingTop": 15,
            padding: 20,
            "width": w * 0.85,
            "borderRadius": 27,
            borderWidth: 1,
            borderColor: "rgba(139, 117, 181, 255)",
            "backgroundColor": "#fff",
            marginBottom: 20,
        },

        aboutTitleText:
        {
            "fontWeight": "bold",
            "fontSize": 20,
            "letterSpacing": 1.5,
            "color": "#rgba(139, 117, 181, 255)"
        },

        aboutText:
        {
            "fontWeight": "400",
            "fontSize": 16,
            lineHeight: 24,
            letterSpacing: 1.2,
            "color": "rgba(40, 40, 40, 255)",
            "marginTop": 10,
            maxWidth: w * 0.8,
        },


    });

    const { children } = props;
    const { colors, isDark } = useTheme();
    const [ready, setReady] = useState(false);

    return (
        // <SafeAreaView style={{ flex: 1, }}>
        <ScrollView>
            <View style={styles.container}>
                {/* Video */}
                <View style={styles.playerView}>
                    {!ready && <>
                        <Text>Video will arrive shortly ..</Text>
                    </>}
                    <YoutubeIFrame
                        width={w * 0.8}
                        height={w * 9 / 20}
                        videoId={"ydQnzU4nV6Q"}
                        onReady={() => { setReady(true) }}
                    />
                </View>

                {/* Button hided as requested */}
                {/* <View style={{ paddingTop: 20 }}>
                        <Pressable
                            style={({ pressed }) => [
                                {
                                    backgroundColor: pressed
                                        ? 'rgb(210, 210, 210)'
                                        : 'white'
                                }, styles.viewPartner]}
                            onPress={() => this.props.navigation.navigate('ContactUs')}>
                            <Text style={styles.viewPartnerText} >
                                View Our Partners
                            </Text>
                        </Pressable>
                    </View> */}

                {/* About */}
                <View style={{ paddingTop: 20 }}>
                    <View style={styles.aboutWrapper} >
                        <Text style={styles.aboutTitleText} >  ABOUT ARCHE | ECHO </Text>
                        <Text style={styles.aboutText} >ECHO and ARCHE are research programs housed at the University of Alberta.
                            ECHO and ARCHE are aimed at improving child health outcomes and are part of a movement in healthcare towards more patient - and family - centered care, where patients and their families actively engage in health care decision - making in partnership with nurses, clinicians, and other healthcare professionals. </Text>
                    </View>
                </View>
            </View>
        </ScrollView >
        // </SafeAreaView>
    )
}