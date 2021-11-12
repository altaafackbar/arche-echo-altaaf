import React from "react";
import { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, SafeAreaView, ScrollView, Pressable, TouchableOpacity, FlatList, Image, Picker } from "react-native";;
import TouchableScale from 'react-native-touchable-scale';
import symptoms from './symptoms.json'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import _ from "lodash"
import { useNavigation } from '@react-navigation/native';
import { SearchBar, ListItem, Card } from 'react-native-elements';

export default function RelatedCauses({ route }) {

    const [causes, setCauses] = useState(route.params.relatedCauses)
    function renderSeparator (){
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    };

    function renderHeader() {
        return <SearchBar placeholder="Search Tools..." lightTheme round onChangeText={this.handleSearch} value={this.state.query}/>
    };

    function renderFooter (){
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
    function getToolsData(item){
        var tool = item.name;
        // console.log(tool)

        //this.props.navigation.navigate('ToolDetails', {toolName: tool})

        // Alert.alert('Test', tool, [
        //     {text: 'OK', onPress: () => console.log('OK pressed')}
        // ]);
    };
    return (
        <SafeAreaView style={styles.container}>
        {/* <Text>Hello World</Text> */}
        {/* <SearchBar placeholder="Search Tools..." lightTheme round editable={true}/> */}
            <SearchBar inputContainerStyle={{height: 40}} placeholder="Search Tools..." lightTheme round onChangeText={this.handleSearch} value={this.state.query}/>
            <FlatList
                
            data={this.state.data}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => 
            <TouchableOpacity onPress={getToolsData.bind(this,item)}>
                <Card containerStyle={styles.card_item}>
                <Card.Title h4 style={{color: '#8A76B6',}}>{item.name}</Card.Title>
                <Card.Divider></Card.Divider>
                <View>
                    <Text>{item.details}</Text>
                </View>
                </Card>
            </TouchableOpacity>
            }
            />
        </SafeAreaView>
    );
}
  
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
