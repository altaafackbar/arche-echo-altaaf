import React, { Component } from 'react';
import { useState } from "react";
import { Text, StyleSheet, FlatList, TouchableOpacity, View, ActivityIndicator, Alert, SafeAreaView } from "react-native"
import { SearchBar, ListItem, Card, FAB, Icon } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import _ from 'lodash';
import { firebase } from '../../Firebase';
import { useTheme } from '@react-navigation/native';
import themeContext from '../../components/styles/ThemeContext';



class ToolsAndResources extends Component {


    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            data: [],
            error: null,
            query: "",
            fullData: [],
            userData: [],
            starTools: [],
        }
    };

    user = firebase.auth().currentUser

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        this.setState({ loading: true });
        firebase.firestore().collection('tools')
            .onSnapshot(querySnapshot => {
                const tools = []
                querySnapshot.forEach(documentSnapshot => {
                    // console.log(documentSnapshot.data())
                    tools.push({ ...documentSnapshot.data() })
                })
                this.setState({
                    loading: false,
                    data: tools,
                    fullData: tools,
                })
            })


        // console.log(user.uid)
        firebase.firestore().collection('users').doc(this.user.uid)
            .onSnapshot(documentSnapshot => {
                this.setState({
                    userData: documentSnapshot.data(),
                    starTools: documentSnapshot.data().starTools
                })
            })

    };

    contains = ({ name, details }, query) => {
        const nameLower = name.toLowerCase()
        const detailsLower = details.toLowerCase()
        if (name.includes(query) || details.includes(query) || nameLower.includes(query) || detailsLower.includes(query)) {
            return true;
        }
        return false;
    };

    handleSearch = (text) => {
        const formateQuery = text.toLowerCase();
        const data = _.filter(this.state.fullData, tool => {
            return this.contains(tool, formateQuery);
        });

        this.setState({ query: formateQuery, data })
    };

    getToolsData = (item) => {
        var tool = item.name;
        // console.log(tool)

        this.props.navigation.navigate('ToolDetails', { toolName: tool })

        // Alert.alert('Test', tool, [
        //     {text: 'OK', onPress: () => console.log('OK pressed')}
        // ]);
    };

    handleEdit = () => {
        // Alert.alert('Click Test')
        this.props.navigation.navigate('AddToolModal')
    }

    handleStarTool = (item) => {
        var starred = [...this.state.starTools]
        starred.push(item.name)
        // console.log(this.state.starTools)
        firebase.firestore().collection('users').doc(this.user.uid)
            .update({
                starTools: starred,
            })
    }

    handleUnstartool = (item) => {
        var starred = [...this.state.starTools]
        var index = starred.indexOf(item.name)
        if (index > -1) {
            starred.splice(index, 1)
        }
        // console.log(starred)
        firebase.firestore().collection('users').doc(this.user.uid)
            .update({
                starTools: starred,
            })
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>
                {/* <Text>Hello World</Text> */}
                {/* <SearchBar placeholder="Search Tools..." lightTheme round editable={true}/> */}
                <SearchBar containerStyle={styles.SearchBar} inputContainerStyle={{ height: 35 }} placeholder="Search Tools..." lightTheme round onChangeText={this.handleSearch} value={this.state.query} />
                <FlatList

                    data={this.state.data}
                    containerStyle={styles.FlatList}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={this.getToolsData.bind(this, item)}>
                            <Card containerStyle={styles.card_item}>
                                <Card.Title h4 style={{ color: '#8A76B6', }}>{item.name}</Card.Title>
                                <Card.Divider></Card.Divider>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ flex: 0.8 }}>{item.details}</Text>
                                    {/* starred tools */}
                                    {this.state.starTools.includes(item.name) === true &&
                                        <>
                                            <TouchableOpacity style={{ flex: 0.2, alignContent: 'center', alignItems: 'center', paddingTop: '5%' }} onPress={this.handleUnstartool.bind(this, item)}>
                                                <AntDesign name="star" size={35} color="black" />
                                                {/* <AntDesign name="staro" size={35} color="black"/> */}
                                            </TouchableOpacity>
                                        </>
                                    }
                                    {/* unstarred tools */}
                                    {this.state.starTools.includes(item.name) === false &&
                                        <>
                                            <TouchableOpacity style={{ flex: 0.2, alignContent: 'center', alignItems: 'center', paddingTop: '5%' }} onPress={this.handleStarTool.bind(this, item)}>
                                                <AntDesign name="staro" size={35} color="black" />
                                            </TouchableOpacity>
                                        </>
                                    }


                                </View>
                            </Card>
                        </TouchableOpacity>
                    }
                />
                {this.state.userData.admin === true &&
                    <FAB
                        title="Add Tool"
                        placement='right'
                        onPress={this.handleEdit}
                        containerStyle={styles.fab}
                    >
                    </FAB>
                }
            </SafeAreaView>
        );
    }



    // keyExtractor = (item, index) => index.toString()

    // renderItem = ({ item }) =>(
    //     <ListItem bottomDivider>
    //         <ListItem.Content>
    //             <ListItem.Title>{item.name}</ListItem.Title>
    //             <ListItem.Subtitle>{item.details}</ListItem.Subtitle>
    //         </ListItem.Content>
    //         <ListItem.Chevron/>
    //     </ListItem>
    // )


}

export default ToolsAndResources

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '2%',
        backgroundColor: '#fafafa',
    },
    flat_list_item: {
        backgroundColor: "#E7ECF2",
    },
    card_item: {
        flex: 1,
        backgroundColor: "#E7ECF2",
        borderRadius: 15,
        margin: 15,
    },
    SearchBar: {
        // top: -20,
        backgroundColor: 'transparent',
        marginTop: 0,
        marginVertical: 0,
        borderStartWidth: 0,

    },
    FlatList: {     // may not work well on small devices
        padding: 0,
        margin: 0,

    },
    fab: {
        padding: 0,
        margin: 0,
    },
});
