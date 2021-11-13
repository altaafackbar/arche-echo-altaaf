import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { firebase } from '../../Firebase';

const UpdateInfoGraphic = () =>{
    const navigation = useNavigation()
    const route = useRoute();
    goBack = () => navigation.goBack()

    var toolName = route.params.toolName

    const [infoGraphicTitle, setInfoGraphicTitle] = useState('')
    const [infoGraphicInfo, setInfoGraphicInfo] = useState('')
    const [infoGraphicLink, setInfoGraphicLink] = useState('')

    handleNewInfoGraphic = () => {
        firebase.firestore().collection('tools').doc(toolName)
            .update({
                infographic: true,
                infographicTitle: infoGraphicTitle,
                infographicInfo: infoGraphicInfo,
                infographicLink: infoGraphicLink,
            })
            .then(() => {
                // Alert.alert('New InfoGraphic added to ' + toolName)
                goBack()
            })
    }

    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Add or Update infoGraphic</Text>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.textContainer}>
                    <TextInput
                        fontSize={16}
                        selectionColor={'#a5a5a5'}
                        placeholder='infoGraphic Title'
                        multiline={true}
                        numberOfLines={3}
                        value={infoGraphicTitle}
                        setValue={infoGraphicTitle}
                        onChangeText={text => setInfoGraphicTitle(text)}
                    >
                    </TextInput>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.bigTextContainer}>
                    <TextInput
                        fontSize={16}
                        selectionColor={'#a5a5a5'}
                        placeholder='Video Description'
                        multiline={true}
                        numberOfLines={6}
                        value={infoGraphicInfo}
                        setValue={infoGraphicInfo}
                        onChangeText={text => setInfoGraphicInfo(text)}
                    >
                    </TextInput>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.textContainer}>
                    <TextInput
                        fontSize={16}
                        selectionColor={'#a5a5a5'}
                        placeholder='infoGraphic Link'
                        multiline={true}
                        numberOfLines={3}
                        value={infoGraphicLink}
                        setValue={infoGraphicLink}
                        onChangeText={text => setInfoGraphicLink(text)}
                    >
                    </TextInput>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {handleNewInfoGraphic()}}>
                    <Text style={styles.buttonText}>Save infoGraphic</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}

export default UpdateInfoGraphic

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa', 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start',
    },
    headerContainer: {
        width: '100%',
        textAlign: 'left',
        padding: 10,
        alignSelf: 'flex-end',
        marginTop: '5%',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingLeft: 10,
        color: '#1f1f1f',
    },
    textContainer: {
        width: '90%',
        backgroundColor: 'transparent',
        height: 100, 
        borderColor: '#dadada', 
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginLeft: 17,
        marginRight: 17,
        marginVertical: 10,
        paddingVertical: 13,
    },
    bigTextContainer: {
        width: '90%',
        backgroundColor: 'transparent',
        height: 150, 
        borderColor: '#dadada', 
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginLeft: 17,
        marginRight: 17,
        marginVertical: 10,
        paddingVertical: 13,
    },
    buttonContainer: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007bff',
        borderRadius: 5,
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

})