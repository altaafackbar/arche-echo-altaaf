import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../components/styles/ThemeProvider';
import { CheckBox, SocialIcon } from 'react-native-elements';
import * as Linking from 'expo-linking';
import { firebase } from '../../Firebase';


function ContactUs() {     // undefined
    const { colors, isDark } = useTheme();
    const [message, setMessage] = useState('')
    const [parents, setParents] = useState(false)
    const [researcher, setResearcher] = useState(false)
    const [student, setStudent] = useState(false)
    const [media, setMedia] = useState(false)
    const [contact, setContact] = useState(false)

    const checkInput = !message.trim().length == 0;

    const currentUser = firebase.auth().currentUser

    const handleARCHETwitter = () => {
        Linking.openURL('https://twitter.com/arche4evidence?s=20')
    }

    const handleIns = () => {
        Linking.openURL('https://instagram.com/archeechokt?utm_medium=copy_link')
    }

    const handleECHOKTTwitter = () => {
        Linking.openURL('https://twitter.com/echoKTresearch?s=20')
    }

    const handleYouTube = () => {
        Linking.openURL('https://www.youtube.com/channel/UC8L-Cciwn7greQ-g2v-jSzQ/featured')
    }

    const handleARCHEWeb = () => {
        Linking.openURL('https://www.ualberta.ca/pediatrics/pediatric-research/affiliated-research-units/alberta-research-centre-for-health-evidence-arche/index.html')
    }

    const handleECHOWeb = () => {
        Linking.openURL('https://www.echokt.ca')
    }

    const handleFirebase = () => {
        // console.log(currentUser.displayName)
        // console.log(currentUser.email)
        var displayName = 'GuestUser'
        var email = 'GuestUser'
        // handle guest user with no email address
        if (currentUser.isAnonymous === false) {
            displayName = currentUser.displayName
            email = currentUser.email
        }
        const role = []
        if (parents === true) {
            role.push('Parents/Family Member')
        }
        if (researcher === true) {
            role.push('Researcher')
        }
        if (student === true) {
            role.push('Student')
        }
        if (media == true) {
            role.push('Member of the Media')
        }

        firebase.firestore()
            .collection('feedback')
            .add({
                name: displayName,
                email: email,
                role: role,
                contactUser: contact,
                feedback: message,
                created: firebase.firestore.Timestamp.now(),
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                setMessage('')
                setContact(false)
                setParents(false)
                setResearcher(false)
                setStudent(false)
                setMedia(false)
                Alert.alert('We have received your feedback and will get back to you as soon as we can.')
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            })
        
    }

    return (
        
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
                style={{flex: 1}}
            >
                <ScrollView style={styles.scrollViewContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Contact us for more infomation.</Text>
                    </View>
                    <View style={styles.mediaContainer}>
                        <SocialIcon
                            iconSize={17}
                            title='@arche4evidence'
                            type='twitter'
                            button
                            Component={TouchableOpacity}
                            onPress={() => {handleARCHETwitter()}}
                        />
                        <SocialIcon
                            iconSize={17}
                            title='@echoKTresearch'
                            type='twitter'
                            button
                            Component={TouchableOpacity}
                            onPress={() => {handleECHOKTTwitter()}}
                        />
                        <SocialIcon
                            iconSize={17}
                            title='@ARCHE ECHO'
                            type='youtube'
                            button
                            Component={TouchableOpacity}
                            onPress={() => {handleYouTube()}}
                        />
                        <SocialIcon
                            iconSize={17}
                            title='@archeechoKT'
                            type='instagram'
                            button
                            Component={TouchableOpacity}
                            onPress={() => {handleIns()}}
                        />
                        <SocialIcon
                            iconSize={17}
                            type='google'
                            button
                            title='ARCHE Website'
                            Component={TouchableOpacity}
                            onPress={() => {handleARCHEWeb()}}
                        />
                        <SocialIcon
                            iconSize={17}
                            type='google'
                            button
                            title='ECHO Website'
                            Component={TouchableOpacity}
                            onPress={() => {handleECHOWeb()}}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.textStyle}>For all other inquiries, please feel free to message us through our contact form below.</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={{textAlign: 'center', fontSize: 16, color: '#8A76B6',}}>Are you contacting us as...(Please select all that apply.)</Text>
                    </View>
                    {/* Checkboxes let user pick what roles are they */}
                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            title='Parents/Family Member'
                            checked={parents}
                            onPress={() => {setParents(!parents)}}
                        />
                    </View>
                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            title='Researcher'
                            checked={researcher}
                            onPress={() => {setResearcher(!researcher)}}
                        />
                    </View>
                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            title='Student'
                            checked={student}
                            onPress={() => {setStudent(!student)}}
                        />
                    </View>
                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            title='Member of the Media'
                            checked={media}
                            onPress={() => {setMedia(!media)}}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                            <TextInput
                                selectionColor={'#a5a5a5'}
                                placeholder='Comment or Message'
                                multiline={true}
                                numberOfLines={6}
                                value={message}
                                setValue={message}
                                onChangeText={text => setMessage(text)}
                            >
                            </TextInput>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.checkBoxContainer}>
                        <CheckBox
                            title='Check this box if you want us to reply you.'
                            checked={contact}
                            onPress={() => {setContact(!contact)}}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                        style={checkInput ? styles.button : styles.buttonDisabled} 
                        disabled={checkInput ? false : true} 
                        onPress={() => {handleFirebase()}}
                        >
                            <Text style={styles.buttonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ContactUs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa', 

    },
    scrollViewContainer:{
        flex: 1,
        width: '100%'
    },
    headerContainer: {
        width: '100%',
        textAlign: 'center',
        padding: 5,
        alignSelf: 'flex-end',
        marginTop: '1%',
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8A76B6',
    },
    mediaContainer: {
        width: '90%',
        backgroundColor: 'transparent',
        height: 377, 
        borderColor: '#dadada', 
        borderWidth: 2,
        borderRadius: 20,
        paddingHorizontal: 10,
        marginLeft: 17,
        marginRight: 17,
        marginVertical: 10,
        paddingVertical: 10,
    },
    textContainer: {
        width: '100%',
        textAlign: 'center',
        padding: 5,
        alignSelf: 'flex-end',
        marginTop: '1%',
    },
    textStyle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8A76B6',
    },
    inputContainer: {
        width: '90%',
        backgroundColor: 'transparent',
        height: 150, 
        borderColor: '#dadada', 
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 10,
        marginLeft: 17,
        marginRight: 17,
        marginVertical: 10,
        paddingVertical: 13,
    },
    checkBoxContainer: {
        width: '90%', 
        marginLeft: 17,
        marginRight: 17,
    },
    buttonContainer: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 10,
        width: '60%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fafafa'
    },
    buttonDisabled: {
        backgroundColor: '#007bff',
        borderRadius: 10,
        width: '60%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
    },
    buttonTextDisabled: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fafafa',
        opacity: 0.5,
    }
});