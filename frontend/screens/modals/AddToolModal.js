import React, { useState } from 'react'
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { firebase } from '../../Firebase'
import { CheckBox } from 'react-native-elements';

const AddToolModal = () => {
    const navigation = useNavigation()
    goBack = () => navigation.goBack()

    const [toolName, setToolName] = useState('')
    const [toolDetail, setToolDetail] = useState('')
    const [video, setVideo] = useState(false)
    const [videoTitle, setVideoTitle] = useState('')
    const [videoInfo, setVideoInfo] = useState('')
    const [youtubeVideoID, setYoutubeVideoID] = useState('')
    const [eBook, setEBook] = useState(false)
    const [eBookTitle, setEBookTitle] = useState('')
    const [eBookInfo, setEBookInfo] = useState('')
    const [eBookLink, setEBookLink] = useState('')
    const [infoGraphic, setInfoGraphic] = useState(false)
    const [infoGraphicTitile, setInfoGraphicTitle] = useState('')
    const [infoGraphicInfo, setInfoGraphicInfo] = useState('')
    const [infoGraphicLink, setInfoGraphicLink] = useState('')
    const [saveTool, setSaveTool] = useState(false)
    const [toolBoolean, setToolBoolean] = useState(true)

    handleNewTool = () => {
        // console.log(toolName)
        // console.log(toolDetail)
        
        firebase.firestore().collection('tools').doc(toolName)
            .set({
                name: toolName,
                details: toolDetail,
                video: false,
                eBook: false,
                infographic: false,
            })
            .then(() => {
                Alert.alert('New Tool Added. Continue to add Video, eBook or infoGraphic')
                setSaveTool(true)
                setToolBoolean(false)
                setVideo(true)
                setEBook(true)
                setInfoGraphic(true)
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            })
        
    }

    handleNewVideo = () => {
        firebase.firestore().collection('tools').doc(toolName)
            .update({
                video: true,
                videoTitle: videoTitle,
                videoInfo: videoInfo,
                youtubeVideoID: youtubeVideoID,
            })
            .then(() => {
                Alert.alert('New Video added to ' + toolName)
                setVideo(false)
            })
    }

    handleNewInfoGraphic = () => {
        firebase.firestore().collection('tools').doc(toolName)
            .update({
                infographic: true,
                infographicTitle: infoGraphicTitile,
                infographicInfo: infoGraphicInfo,
                infographicLink: infoGraphicLink,
            })
            .then(() => {
                Alert.alert('New InfoGraphic added to ' + toolName)
                setInfoGraphic(false)
            })
    }

    handleNeweBook = () => {
        firebase.firestore().collection('tools').doc(toolName)
            .update({
                eBook: true,
            })

        firebase.firestore().collection('tools').doc(toolName)
            .collection('eBookCollection')
            .doc(eBookTitle)
            .set({
                name: eBookTitle,
                info: eBookInfo,
                link: eBookLink,
            })
            .then(() => {
                Alert.alert('New eBook added, you can continue adding eBook.')
                setEBookTitle('')
                setEBookInfo('')
                setEBookLink('')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollViewContainer}>
                {/* <Text>Hello World</Text> */}
                <View style={styles.headerContainer}>
                    <Text style={styles.headerText}>Add a new tool</Text>
                </View>
                <CheckBox
                    center
                    title="Add New Tool"
                    iconRight
                    iconType='material'
                    uncheckedIcon='clear'
                    checkedIcon='add'
                    checked={toolBoolean}
                ></CheckBox>
                {toolBoolean === true &&
                <>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={styles.textContainer}>
                            <TextInput
                                selectionColor={'#a5a5a5'}
                                placeholder='Tool Name'
                                value={toolName}
                                setValue={toolName}
                                onChangeText={text => setToolName(text)}
                            >
                            </TextInput>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                        <View style={styles.textContainer}>
                            <TextInput
                                selectionColor={'#a5a5a5'}
                                placeholder='Tool Detail'
                                value={toolDetail}
                                setValue={toolDetail}
                                onChangeText={text => setToolDetail(text)}
                            >
                            </TextInput>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => {handleNewTool()}}>
                            <Text style={styles.buttonText}>Save Tool</Text>
                        </TouchableOpacity>
                    </View>
                </>
                }
                
                {/* Add Video */}
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        center
                        title="Click Here to Add Video"
                        iconRight
                        iconType='material'
                        uncheckedIcon='add'
                        checkedIcon='clear'
                        checked={video}
                        onPress={() => setVideo(!video)}
                    ></CheckBox>
                    {/* If admin wants to add a video */}
                    {video === true &&
                    <>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                            <View style={styles.textContainer}>
                                <TextInput
                                selectionColor={'#a5a5a5'}
                                placeholder='Video Title'
                                value={videoTitle}
                                setValue={videoTitle}
                                onChangeText={text => setVideoTitle(text)}
                                >
                                </TextInput>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                            <View style={styles.textContainer}>
                                <TextInput
                                selectionColor={'#a5a5a5'}
                                placeholder='Video Description'
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
                                selectionColor={'#a5a5a5'}
                                placeholder='YouTube Video ID'
                                value={youtubeVideoID}
                                setValue={youtubeVideoID}
                                onChangeText={text => setYoutubeVideoID(text)}
                                >
                                </TextInput>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={saveTool ? styles.button : styles.buttonDisabled} disabled={saveTool ? false : true} onPress={() => {handleNewVideo()}}>
                                <Text style={styles.buttonText}>Save Video</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    }
                </View>
                {/* Add eBook */}
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        center
                        title="Click Here to Add eBook"
                        iconRight
                        iconType='material'
                        uncheckedIcon='add'
                        checkedIcon='clear'
                        checked={eBook}
                        onPress={() => setEBook(!eBook)}
                    ></CheckBox>
                    {eBook === true &&
                    <>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                            <View style={styles.textContainer}>
                                <TextInput
                                selectionColor={'#a5a5a5'}
                                placeholder='eBook Title'
                                value={eBookTitle}
                                setValue={eBookTitle}
                                onChangeText={text => setEBookTitle(text)}
                                >
                                </TextInput>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                            <View style={styles.textContainer}>
                                <TextInput
                                selectionColor={'#a5a5a5'}
                                placeholder='eBook Description'
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
                                selectionColor={'#a5a5a5'}
                                placeholder='eBook Link'
                                value={eBookLink}
                                setValue={eBookLink}
                                onChangeText={text => setEBookLink(text)}
                                >
                                </TextInput>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={saveTool ? styles.button : styles.buttonDisabled} disabled={saveTool ? false : true} onPress={() => {handleNeweBook()}}>
                                <Text style={styles.buttonText}>Save eBook</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    }
                </View>
                {/* Add infoGraphic */}
                <View style={styles.checkBoxContainer}>
                    <CheckBox
                        center
                        title="Click Here to Add infoGraphic"
                        iconRight
                        iconType='material'
                        uncheckedIcon='add'
                        checkedIcon='clear'
                        checked={infoGraphic}
                        onPress={() => setInfoGraphic(!infoGraphic)}
                    ></CheckBox>
                    {infoGraphic == true &&
                    <>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                            <View style={styles.textContainer}>
                                <TextInput
                                selectionColor={'#a5a5a5'}
                                placeholder='infoGraphic Title'
                                value={infoGraphicTitile}
                                setValue={infoGraphicTitile}
                                onChangeText={text => setInfoGraphicTitle(text)}
                                >
                                </TextInput>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                            <View style={styles.textContainer}>
                                <TextInput
                                selectionColor={'#a5a5a5'}
                                placeholder='infoGraphic Description'
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
                                selectionColor={'#a5a5a5'}
                                placeholder='infoGraphic Link'
                                value={infoGraphicLink}
                                setValue={infoGraphicLink}
                                onChangeText={text => setInfoGraphicLink(text)}
                                >
                                </TextInput>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={saveTool ? styles.button : styles.buttonDisabled} disabled={saveTool ? false : true} onPress={() => {handleNewInfoGraphic()}}>
                                <Text style={styles.buttonText}>Save infoGraphic</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    }
                </View>
            </ScrollView>

        </SafeAreaView>
    )


}

export default AddToolModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa', 
        alignItems: 'flex-start', 
        justifyContent: 'flex-start',
    },
    scrollViewContainer:{
        flex: 1,
        width: '100%'
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
        height: 45, 
        borderColor: '#dadada', 
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginLeft: 17,
        marginRight: 17,
        marginVertical: 10,
        paddingVertical: 10,
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
        borderRadius: 5,
        width: '60%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonDisabled: {
        backgroundColor: '#007bff',
        borderRadius: 5,
        width: '60%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fafafa'
    },
})