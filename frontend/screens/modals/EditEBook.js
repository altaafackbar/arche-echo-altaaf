import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { firebase } from '../../Firebase';

const UpdateEBook =() => {
    const navigation = useNavigation()
    const route = useRoute(); 
    goBack = () => navigation.goBack()

    var toolName = route.params.toolName
    var eBookName = route.params.eBookName

    const [eBookTitle, setEBookTitle] = useState('')
    const [eBookInfo, setEBookInfo] = useState('')
    const [eBookLink, setEBookLink] = useState('')

    handleNeweBook = () => {
        firebase.firestore().collection('tools').doc(toolName)
            .collection('eBookCollection')
            .doc(eBookName)
            .update({
                name: eBookTitle,
                info: eBookInfo,
                link: eBookLink,
            })
            .then(() => {
                goBack()
            })
    }


    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Update eBook</Text>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.textContainer}>
                    <TextInput
                        fontSize={16}
                        selectionColor={'#a5a5a5'}
                        placeholder='eBook Title'
                        multiline={true}
                        numberOfLines={3}
                        value={eBookTitle}
                        setValue={eBookTitle}
                        onChangeText={text => setEBookTitle(text)}
                    >
                    </TextInput>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.bigTextContainer}>
                    <TextInput
                        fontSize={16}
                        selectionColor={'#a5a5a5'}
                        placeholder='eBook Description'
                        multiline={true}
                        numberOfLines={6}
                        value={eBookInfo}
                        setValue={eBookInfo}
                        onChangeText={text => setEBookInfo(text)}
                    >
                    </TextInput>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.textContainer}>
                    <TextInput
                        fontSize={16}
                        selectionColor={'#a5a5a5'}
                        placeholder='eBook Link'
                        multiline={true}
                        numberOfLines={3}
                        value={eBookLink}
                        setValue={eBookLink}
                        onChangeText={text => setEBookLink(text)}
                    >
                    </TextInput>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {handleNeweBook()}}>
                    <Text style={styles.buttonText}>Save eBook</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}

export default UpdateEBook

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