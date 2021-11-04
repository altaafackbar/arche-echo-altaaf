import React, { Component, useCallback, useRef, useState } from "react";
import { Text, StyleSheet, View, Alert } from "react-native";
import { ButtonGroup } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";

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


    const updateIndex = (selectedIndex) => {
        setSelectedIndex(selectedIndex)
    }

    const onStateChange = useCallback((state) => {
        if (state === false) {
            setPlaying(false)
            Alert.alert("video has finished playing!");
        }
    }, [])


    

    const component1 = () => <Text>Video</Text>
    const component2 = () => <Text>eBook</Text>
    const component3 = () => <Text>InfoGraphic</Text>

    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
    // const {selectedIndex} = this.state
    // const {playing} = this.state
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titles}>
                <Text style={styles.headerTitle}>Anaphylaxis</Text>
                <Text style={styles.subTitle}>Anaphylaxis is a sever allergic reaction that involves two or more parts of the body and happens quickly.</Text>
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
                <View style={styles.textView}>
                    <Text style={styles.infoTitle}>Understanding and managing your child's anaphylaxis</Text>
                    <Text style={styles.infoSubTitle}>This video provides information on the symptoms of anaphylaxis, how to manage it at home, and when to seek emergency care.</Text>
                </View>

                <View style={styles.subView}>
                    <YoutubePlayer
                        height={500}
                        play={playing}
                        videoId={"qewxzi53zBQ"}
                        onChangeState={onStateChange}
                    />    
                </View>

            </>
            }

            {selectedIndex === 1 &&
            <>
                <View style={styles.textView}>
                    <Text style={styles.infoTitle}>Understanding and managing your child's anaphylaxis</Text>
                    <Text style={styles.infoSubTitle}>This eBook provides information on the symptoms of anaphylaxis, how to manage it at home, and when to seek emergency care.</Text>
                </View>
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
        paddingTop: 40,
        justifyContent: 'center',
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
    }
})