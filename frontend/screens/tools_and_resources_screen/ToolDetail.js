import React, { Component, useCallback, useState, useEffect } from "react";
import { Text, StyleSheet, View, Alert, Button, TouchableOpacity, FlatList } from "react-native";
import { ButtonGroup, ListItem, FAB } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import YoutubePlayer from "react-native-youtube-iframe";
import * as WebBrowser from "expo-web-browser";
import TouchableScale from 'react-native-touchable-scale';
import { useRoute, useTheme, useNavigation } from '@react-navigation/native';
import themeContext from "../../components/styles/ThemeContext";
import { firebase } from "../../Firebase";


function ToolDetails() {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [playing, setPlaying] = useState(false)
    const [tool, setTool] = useState([])
    const [eBooks, setEBooks] = useState([])
    const [admin, setAdmin] = useState(false)
    const [disabledButton, setDisabledButton] = useState([])

    const navigation = useNavigation();
    const route = useRoute();
    var toolName = route.params.toolName

    const { setTheme, theme } = React.useContext(themeContext);

    const { colors, isDark } = useTheme();

    const textColor = colors.text

    const user = firebase.auth().currentUser

    navigateToUpdateVideo = () => navigation.navigate('UpdateVideo', { toolName: toolName })
    navigateToUpdateInfoGraphic = () => navigation.navigate('UpdateInfoGraphic', { toolName: toolName })
    navigateToUpdateEBook = () => navigation.navigate('UpdateEBook', { toolName: toolName })

    navigateToEditEbook = (item) => {
        // console.log(item.name)
        navigation.navigate('EditEBook', { toolName: toolName, eBookName: item.name })
    }


    useEffect(() => {
        const subscriber = firebase.firestore()
            .collection('tools')
            .doc(toolName)
            .onSnapshot(documentSnapshot => {
                // console.log('Tool Data: ', documentSnapshot.data());
                setTool(documentSnapshot.data())

                // for disable button use
                // const disable = disabledButton
                // if (documentSnapshot.data().video === false) {
                //     disable.push(0)
                //     setDisabledButton(disable)
                // }
                // if (documentSnapshot.data().eBook === false) {
                //     disable.push(1)
                //     setDisabledButton(disable)
                // }
                // if (documentSnapshot.data().infographic === false) {
                //     disable.push(2)
                //     setDisabledButton(disable)
                // }

                if (documentSnapshot.data().video === false) {
                    if (documentSnapshot.data().eBook === true) {
                        setSelectedIndex(1)
                    } else if (documentSnapshot.data().infographic === true) {
                        setSelectedIndex(2)
                    }
                }
            })


        const eBookSub = firebase.firestore()
            .collection('tools')
            .doc(toolName)
            .collection('eBookCollection')
            .onSnapshot(querySnapshot => {
                const ebook = []
                querySnapshot.forEach(documentSnapshot => {
                    // console.log(documentSnapshot.data())
                    ebook.push({ ...documentSnapshot.data() })
                })
                setEBooks(ebook)
            })

        const userSub = firebase.firestore()
            .collection('users')
            .doc(user.uid)
            .onSnapshot(documentSnapshot => {
                setAdmin(documentSnapshot.data().admin)
            })

        return () => { subscriber(), eBookSub(), userSub() }
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
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.titles}>
                <Text style={[styles.headerTitle, { color: colors.text }]}>{tool.name}</Text>
                <Text style={styles.subTitle}>{tool.details}</Text>
            </View>
            {admin === false &&
                <>
                    <ButtonGroup
                        onPress={updateIndex}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        // disabled={disabledButton}
                        containerStyle={{ height: 45, borderRadius: 15, }}
                    />
                </>
            }
            {admin === true &&
                <ButtonGroup
                    onPress={updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    // disabled={disabledButton}
                    containerStyle={{ height: 45, borderRadius: 15, }}
                />
            }
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
                            {admin === true &&
                                <FAB
                                    title="Update Video"
                                    placement='right'
                                    onPress={() => { navigateToUpdateVideo() }}
                                >
                                </FAB>
                            }
                        </>
                    }
                    {tool.video === false &&
                        <>
                            <View style={styles.textView}>
                                <Text style={styles.infoTitle}>We don't have Video resources yet, Please chckout our eBooks or infoGraphic.</Text>
                            </View>
                            {admin === true &&
                                <FAB
                                    title="Add Video"
                                    placement='right'
                                    onPress={() => { navigateToUpdateVideo() }}
                                >
                                </FAB>
                            }
                        </>
                    }


                </>
            }
            {/* If user selected eBook */}
            {selectedIndex === 1 &&
                <>
                    {tool.eBook === true &&
                        <>
                            {admin === false &&
                                <>
                                    <FlatList
                                        data={eBooks}
                                        keyExtractor={(item) => item.name}
                                        style={{ paddingTop: "5%", paddingHorizontal: "3%" }}
                                        renderItem={({ item }) =>
                                            <ListItem
                                                bottomDivider
                                                Component={TouchableScale}
                                                firction={90}
                                                tension={100}
                                                activeScale={0.95}
                                                onPress={handleeBook.bind(this, item)}
                                                containerStyle={{ borderRadius: 15, backgroundColor: "#E7ECF2", marginTop: 10, }}
                                            >
                                                <ListItem.Content>
                                                    <ListItem.Title style={styles.listItemTitle}>{item.name}</ListItem.Title>
                                                    <ListItem.Title style={styles.listItemInfo}>{item.info}</ListItem.Title>
                                                </ListItem.Content>
                                                {/* <ListItem.Chevron/> */}
                                            </ListItem>
                                        }
                                    />
                                </>
                            }
                            {admin === true &&
                                <>
                                    <FlatList
                                        data={eBooks}
                                        keyExtractor={(item) => item.name}
                                        style={{ paddingTop: "5%", paddingHorizontal: "3%" }}
                                        renderItem={({ item }) =>
                                            <ListItem.Swipeable
                                                bottomDivider
                                                Component={TouchableScale}
                                                firction={90}
                                                tension={100}
                                                activeScale={0.95}
                                                onPress={handleeBook.bind(this, item)}
                                                containerStyle={{ borderRadius: 15, backgroundColor: "#E7ECF2", marginTop: 10, }}
                                                leftContent={
                                                    <Button
                                                        title="edit"
                                                        icon={{ name: 'info', color: 'white' }}
                                                        buttonStyle={{ minHeight: '100%' }}
                                                        onPress={() => { navigateToEditEbook(item) }}
                                                    />
                                                }
                                                rightContent={
                                                    <Button
                                                        title='delete'
                                                        icon={{ name: 'delete', color: 'white' }}
                                                        buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                                                    // onPress={deleteAlert.bind(this, item)}
                                                    />
                                                }
                                            >
                                                <ListItem.Content>
                                                    <ListItem.Title style={styles.listItemTitle}>{item.name}</ListItem.Title>
                                                    <ListItem.Title style={styles.listItemInfo}>{item.info}</ListItem.Title>
                                                </ListItem.Content>
                                                {/* <ListItem.Chevron/> */}
                                            </ListItem.Swipeable>
                                        }
                                    />
                                    <FAB
                                        title="Add eBook"
                                        placement='right'
                                        onPress={() => { navigateToUpdateEBook() }}
                                    >
                                    </FAB>
                                </>
                            }

                        </>
                    }
                    {tool.eBook === false &&
                        <>
                            <View style={styles.textView}>
                                <Text style={styles.infoTitle}>We don't have eBook resources yet, Please chckout our Video or infoGraphic.</Text>
                            </View>
                            {admin === true &&
                                <>
                                    <FAB
                                        title="Add eBook"
                                        placement='right'
                                        onPress={() => { navigateToUpdateEBook() }}
                                    >
                                    </FAB>
                                </>
                            }
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
                                    title="Click Here to open InfoGraphic"
                                    onPress={handleInfoGraphic}
                                ></Button>
                            </View>
                            {admin === true &&
                                <FAB
                                    title="Update infoGraphic"
                                    placement='right'
                                    onPress={() => { navigateToUpdateInfoGraphic() }}
                                >
                                </FAB>
                            }
                        </>
                    }
                    {tool.infographic === false &&
                        <>
                            <View style={styles.textView}>
                                <Text style={styles.infoTitle}>We don't have infoGraphic resources yet, Please chckout our Video or eBooks.</Text>
                            </View>
                            {admin === true &&
                                <FAB
                                    title="Add infoGraphic"
                                    placement='right'
                                    onPress={() => { navigateToUpdateInfoGraphic() }}
                                >
                                </FAB>
                            }
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