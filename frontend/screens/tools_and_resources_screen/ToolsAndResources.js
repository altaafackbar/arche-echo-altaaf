import React, { Component } from 'react';
import { useState } from "react";
import { Text, StyleSheet, FlatList, TouchableOpacity, View, ActivityIndicator, Alert } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar, ListItem, Card } from 'react-native-elements';
import _ from 'lodash';
import { firebase } from '../../Firebase';





class ToolsAndResources extends Component {


    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            data: [],
            error: null,
            query: "",
            fullData: [],
        }
    };

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
                    tools.push({...documentSnapshot.data()})
                })
                this.setState({
                    loading: false,
                    data: tools,
                    fullData: tools,
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

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    };

    renderHeader = () => {
        return <SearchBar placeholder="Search Tools..." lightTheme round onChangeText={this.handleSearch} value={this.state.query}/>
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE",
                }}
            >
                <ActivityIndicator animating size='large'/>
            </View>

        );
    };

    getToolsData = (item) => {
        var tool = item.name;

        Alert.alert('Test', tool, [
            {text: 'OK', onPress: () => console.log('OK pressed')}
        ]);
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
            {/* <Text>Hello World</Text> */}
            {/* <SearchBar placeholder="Search Tools..." lightTheme round editable={true}/> */}
                <SearchBar placeholder="Search Tools..." lightTheme round onChangeText={this.handleSearch} value={this.state.query}/>
                <FlatList
                    
                data={this.state.data}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => 
                <TouchableOpacity onPress={this.getToolsData.bind(this,item)}>
                    <Card containerStyle={styles.card_item}>
                    <Card.Title h4>{item.name}</Card.Title>
                    <Card.Divider></Card.Divider>
                    <View>
                        <Text>{item.details}</Text>
                    </View>
                    </Card>
                </TouchableOpacity>
                }
                    // ItemSeparatorComponent={this.renderSeparator}
                    // ListHeaderComponent={this.renderHeader}
                    // ListFooterComponent={this.renderFooter}
                    // data={tools}
                    // renderItem={({ item }) => (
                    //     <TouchableOpacity>
                    //         <ListItem
                    //             key={item.id}
                    //             title={item.name}
                    //             subtitle={item.details}
                    //         />
                    //         {/* <Text style={styles.flat_list_item}>{item.name}</Text> */}
                    //     </TouchableOpacity>
                        
                    // )}
                />
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
        // paddingTop: 40,
        paddingHorizontal: 5,
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
});
