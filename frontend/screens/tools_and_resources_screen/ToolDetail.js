import React, { Component, useCallback, useState, useEffect } from "react";
import { Text, StyleSheet, View, Alert, Button, TouchableOpacity, FlatList } from "react-native";
import { ButtonGroup, ListItem } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import * as WebBrowser from "expo-web-browser";
import { useRoute } from '@react-navigation/native';
import TouchableScale from 'react-native-touchable-scale';

import { firebase } from "../../Firebase";


function ToolDetails() {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         selectedIndex: 0,
    //         playing: false,
    //     }
    //     this.updateIndex = this.updateIndex.bind(this)
    // }
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [tool, setTool] = useState([])
    const [eBooks, setEBooks] = useState([])

    const route = useRoute();
    var toolName = route.params.toolName
    

    useEffect(() => {
        const subscriber = firebase.firestore()
            .collection('tools')
            .doc(toolName)
            .onSnapshot(documentSnapshot => {
                // console.log('Tool Data: ', documentSnapshot.data());
                setTool(documentSnapshot.data())

            })


        const eBookSub = firebase.firestore()
            .collection('tools')
            .doc(toolName)
            .collection('eBookCollection')
            .onSnapshot(querySnapshot => {
                const ebook = []
                querySnapshot.forEach(documentSnapshot => {
                    // console.log(documentSnapshot.data())
                    ebook.push({...documentSnapshot.data()})
                })
                setEBooks(ebook)
        })
    
        return () => {subscriber(), eBookSub()}
    }, [])



    const updateIndex = (selectedIndex) => {
        setSelectedIndex(selectedIndex)
    }

    const onStateChange = useCallback((state) => {
        if (state === false) {
            setPlaying(false)
            Alert.alert("video has finished playing!");
        }
    }, [])

    const handleeBook = (item) => {
        // console.log(item.link)
        WebBrowser.openBrowserAsync(item.link)
    }

    const handleInfoGraphic = () => {
        WebBrowser.openBrowserAsync(tool.infographicLink)
    }    

    const component1 = () => <Text>Video</Text>
    const component2 = () => <Text>eBook</Text>
    const component3 = () => <Text>InfoGraphic</Text>

    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
    // const {selectedIndex} = this.state
    // const {playing} = this.state
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titles}>
                <Text style={styles.headerTitle}>{tool.name}</Text>
                <Text style={styles.subTitle}>{tool.details}</Text>
            </View>
            <ButtonGroup
                onPress = {updateIndex}
                selectedIndex = {selectedIndex}
                buttons = {buttons}
                containerStyle = {{height: 45, borderRadius: 15,}}
            />
            {/* If user selected video */}
            {selectedIndex === 0 &&
            <>
                {tool.video === true &&
                <>
                    <View style={styles.textView}>
                    <Text style={styles.infoTitle}>{tool.videoTitle}</Text>
                    <Text style={styles.infoSubTitle}>{tool.videoInfo}</Text>
                    </View>

                    <View style={styles.subView}>
                        <YoutubePlayer
                            height={500}
                            play={playing}
                            videoId={tool.youtubeVideoID}
                            onChangeState={onStateChange}
                        />    
                    </View>
                </>
                }
                {tool.video === false &&
                    <View style={styles.textView}>
                    <Text style={styles.infoTitle}>Video is coming soon</Text>
                    </View>
                }
                

            </>
            }
            {/* If user selected eBook */}
            {selectedIndex === 1 &&
            <>
                {tool.eBook === true &&
                <>
                    <FlatList
                    data={eBooks}
                    keyExtractor={(item) => item.name}
                    style={{paddingTop: "5%", paddingHorizontal: "3%"}}
                    renderItem={({ item }) => 
                    <ListItem 
                        bottomDivider 
                        Component={TouchableScale}
                        firction={90}
                        tension={100}
                        activeScale={0.95}
                        onPress={handleeBook.bind(this,item)}
                        containerStyle={{borderRadius: 15, backgroundColor: "#E7ECF2", marginTop: 10,}}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={styles.listItemTitle}>{item.name}</ListItem.Title>
                            <ListItem.Title style={styles.listItemInfo}>{item.info}</ListItem.Title>
                        </ListItem.Content>
                        {/* <ListItem.Chevron/> */}
                    </ListItem>
                    }
                    />
                    {/* <View style={styles.textView}>
                    <Text style={styles.infoTitle}>{tool.eBookTitle}</Text>
                    <Text style={styles.infoSubTitle}>{tool.eBookInfo}</Text>
                    </View>

                    <View style={styles.subView}>
                        <Button
                            title = "Click Here to open eBook"
                            onPress = {handleeBook}
                        ></Button>  
                    </View> */}
                </>
                }
                {tool.eBook === false &&
                <>
                    <View style={styles.textView}>
                    <Text style={styles.infoTitle}>eBook is coming soon</Text>
                    </View>
                </>
                }
                
            </>
            }

            {selectedIndex === 2 &&
            <>
                {tool.infographic === true &&
                <>
                    <View style={styles.textView}>
                    <Text style={styles.infoTitle}>{tool.infographicTitle}</Text>
                    <Text style={styles.infoSubTitle}>{tool.infographicInfo}</Text>
                    </View>

                    <View style={styles.subView}>
                        {/* <Text style={{textAlign: "center"}}>InfoGraphic is coming soon</Text>   */}
                        <Button
                            title = "Click Here to open InfoGraphic"
                            onPress = {handleInfoGraphic}
                        ></Button> 
                    </View>
                </>
                }
                {tool.infographic === false &&
                <>
                    <View style={styles.textView}>
                    <Text style={styles.infoTitle}>infoGraphic is coming soon</Text>
                    </View>
                </>
                }
           
            </>
            }
            
        </SafeAreaView>
    )
}

export default ToolDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
        paddingHorizontal: 5,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    titles: {
        marginTop: '2%',
        width: '100%',
        textAlign: 'center'
    },
    headerTitle: {
        fontSize: 24,
        color: '#1f1f1f',
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 16,
        color: '#919191',
        textAlign: 'center',
        padding: 10,
        paddingTop: 10,
    },
    subView: {
        flex: 1,
        paddingTop: "4%",
        // justifyContent: 'center',
    },
    infoTitle: {
        fontSize: 20,
        color: '#8A76B6',
        textAlign: 'center',
        padding: 10,
    },
    textView: {
        flex: 0.5,
    },
    infoSubTitle: {
        fontSize: 15,
        color: '#1f1f1f',
        textAlign: 'center',
        padding: 10,
    },
    listItemTitle: {
        fontSize: 20,
        color: '#8A76B6',
        textAlign: 'center',
    },
    listItemInfo: {
        fontSize: 15,
        color: '#1f1f1f',
    },
})