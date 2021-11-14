import React, { useCallback, useState, Component, } from 'react'
import { TextInput, ScrollView, Pressable, Dimensions, PixelRatio, View, Text, StyleSheet, Button, SafeAreaView } from 'react-native'
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
            // height: h,
            // justifyContent: 'center', // put things centered on vertical axis
        },
        tDescription:
        {
            textAlign: 'left',
            color: "#8b75b5",
            fontWeight: '700',

        },
        aboveInputBox:
        {
            marginTop: -22,
            marginLeft: 15,
            color: "rgba(139, 117, 181, 255)",

        },
        inputBox:
        {
            marginTop: 30,
            marginBottom: 20,
            width: w * 0.85,
            height: 40,
            borderRadius: 23,
            borderWidth: 1,
            borderColor: "rgba(139, 117, 181, 255)",
        },
        inputField:
        {
            top: 5,
            marginHorizontal: 15,
            marginVertical: 6,
        },
        underInputBox:
        {
            marginLeft: 15,
            color: "rgba(139, 117, 181, 255)",
            marginTop: 2,
            fontSize: 12,
            fontWeight: "100",
        },
        send:
        {
            paddingHorizontal: 55,
            paddingVertical: 12,
            borderRadius: 23,
            borderWidth: 1,
            borderColor: "rgba(139, 117, 181, 255)",
        },

        sendText:
        {
            "fontWeight": "400",
            "fontSize": 16,
            "letterSpacing": 1,
            "color": "rgba(139, 117, 181, 255)"
        },

    });

    getLength = (text, exist) => {
        if (text.length > 0) exist(true)
        else exist(false)
    }

    const [name, setName] = useState('')
    const [nameExist, setNameExist] = useState(true)
    const [email, setEmail] = useState('')
    const [emailExist, setEmailExist] = useState(true)
    const [detail, setDetail] = useState('')


    return (
        // <SafeAreaView style={{ flex: 1, }}>
        <ScrollView>

            {/* <TextInput
                fontSize={16}
                selectionColor={'#a5a5a5'}
                placeholder='eBook Title'
                multiline={true}
                numberOfLines={3}
                value={eBookTitle}
                setValue={eBookTitle}
                onChangeText={text => setEBookTitle(text)}
            >
            </TextInput> */}
            <View style={styles.container}>
                <Text style={styles.tDescription}>Contact us for more information.</Text>

                <View style={styles.inputBox}>
                    <Text style={styles.aboveInputBox}>Name*</Text>
                    <TextInput
                        style={styles.inputField}
                        fontSize={18}
                        value={name}
                        onChangeText={(text) => {
                            setName(text)
                            if (text.length > 0) setNameExist(true)
                            else setNameExist(false)
                        }}
                        onFocus={() => setNameExist(false)}
                        onEndEditing={() => setNameExist(true)}
                    ></TextInput>
                    {!nameExist && <>
                        <Text style={styles.underInputBox}>Please enter your name here ...</Text>
                    </>}
                </View>

                <View style={styles.inputBox}>
                    <Text style={styles.aboveInputBox}>Email (Optional)</Text>
                    <TextInput
                        style={styles.inputField}
                        fontSize={18}
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text)
                            if (text.length > 0) setEmailExist(true)
                            else setEmailExist(false)
                        }}
                        onFocus={() => setEmailExist(false)}
                        onEndEditing={() => setEmailExist(true)}
                    ></TextInput>
                    {!emailExist && <>
                        <Text style={styles.underInputBox}>Please enter your email here for a response.</Text>
                    </>}
                </View>

                <View style={{
                    marginTop: 30,
                    marginVertical: 20,
                    width: w * 0.85,
                    minHeight: 80,
                    maxHeight: 205,
                    borderRadius: 23,
                    borderWidth: 1,
                    borderColor: "rgba(139, 117, 181, 255)",
                }}>
                    <Text style={styles.aboveInputBox}>Comment or Message*</Text>
                    <TextInput
                        style={{
                            marginHorizontal: 15,
                            marginVertical: 5,
                        }}
                        fontSize={16}
                        value={detail}
                        multiline={true}
                        onChangeText={(text) => setDetail(text)}
                    ></TextInput>
                </View>

                <View style={{
                    paddingBottom: 30,
                }}>
                    <Pressable
                        onPress={() => { }}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? 'rgb(210, 210, 210)'
                                    : 'white'
                            }, styles.send]}>
                        <Text style={styles.sendText} >
                            Send
                        </Text>
                    </Pressable>
                </View>


            </View>
        </ScrollView >
    )
}