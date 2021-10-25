import React, { Component } from 'react';
import { useState } from "react";
import { Text, StyleSheet, FlatList, TouchableOpacity, View, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar, ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import { getTools, contains } from "./testapi";
import _ from 'lodash';





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

        getTools()
            .then(tools => {
                this.setState({
                    loading: false,
                    data: tools,
                    fullData: tools,
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };

    handleSearch = (text) => {
        const formateQuery = text.toLowerCase();
        const data = _.filter(this.state.fullData, tool => {
            return contains(tool, formateQuery);
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

    render() {
        return (
            <SafeAreaView style={styles.container}>
            {/* <Text>Hello World</Text> */}
            {/* <SearchBar placeholder="Search Tools..." lightTheme round editable={true}/> */}
            <FlatList
                
                data={this.state.data}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => 
                <ListItem 
                    containerStyle={{backgroundColor: "#E7ECF2"}}
                    bottomDivider
                    Component={TouchableScale}
                    friction={90}
                    tension={100}
                    activeScale={0.95}
                >
                    <ListItem.Content>
                        <ListItem.Title h3>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.details}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color="black" solid/>
                </ListItem>
                }
                ItemSeparatorComponent={this.renderSeparator}
                ListHeaderComponent={this.renderHeader}
                ListFooterComponent={this.renderFooter}
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
        paddingTop: 40,
        paddingHorizontal: 10,
    },
    flat_list_item: {
        backgroundColor: "#E7ECF2",
    }
});
