import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { firebase } from '../../Firebase';

const UpdateVideo = () => {
    const navigation = useNavigation()
    const route = useRoute();
    goBack = () => navigation.goBack()

    var toolName = route.params.toolName

    const [videoTitle, setVideoTitle] = useState('')
    const [videoInfo, setVideoInfo] = useState('')
    const [youtubeVideoID, setYoutubeVideoID] = useState('')

    handleNewVideo = () => {
        firebase.firestore().collection('tools').doc(toolName)
            .update({
                video: true,
                videoTitle: videoTitle,
                videoInfo: videoInfo,
                youtubeVideoID: youtubeVideoID,
            })
            .then(() => {
                // Alert.alert('New Video added to ' + toolName)
                goBack()
            })
    }

    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Add or Update Video</Text>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.textContainer}>
                    <TextInput
                        fontSize={16}
                        selectionColor={'#a5a5a5'}
                        placeholder='Video Title'
                        multiline={true}
                        numberOfLines={3}
                        value={videoTitle}
                        setValue={videoTitle}
                        onChangeText={text => setVideoTitle(text)}
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
                        value={videoInfo}
                        setValue={videoInfo}
                        onChangeText={text => setVideoInfo(text)}
                    >
                    </TextInput>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.textContainer}>
                    <TextInput
                        fontSize={16}
                        selectionColor={'#a5a5a5'}
                        placeholder='YouTube Video ID'
                        multiline={true}
                        numberOfLines={3}
                        value={youtubeVideoID}
                        setValue={youtubeVideoID}
                        onChangeText={text => setYoutubeVideoID(text)}
                    >
                    </TextInput>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {handleNewVideo()}}>
                    <Text style={styles.buttonText}>Save Video</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default UpdateVideo

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