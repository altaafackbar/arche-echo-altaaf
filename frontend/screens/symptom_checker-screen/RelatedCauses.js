import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, SafeAreaView, ScrollView, Pressable, TouchableOpacity, FlatList, Image, Picker } from "react-native";;
import TouchableScale from 'react-native-touchable-scale';
import { ListItem, Card } from 'react-native-elements';
import symptoms from './symptoms.json'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import _ from "lodash"
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../../Firebase';

export default function RelatedCauses({ route }) {

    const navigation = useNavigation();
    const [causes, setCauses] = useState(route.params.relatedCauses)
    const[ toolsList, setToolsList] = useState([])

    
    useEffect(() => {
        firebase.firestore().collection('tools')
        .onSnapshot(querySnapshot => {
            const tools = []
            var id = 0
            querySnapshot.forEach(documentSnapshot => {
                const temp = documentSnapshot.data()
                temp['id'] = id.toString()
                causes.forEach(element => {
                    //console.log(element.name, temp['lower_name'])
                    if(element.name == temp['lower_name']){
                        temp['exists'] = true
                        tools.push(temp)
                    }


                });
                id = id + 1

            })

            setToolsList(tools)
        })

    }, [])
    

    function getToolsData(item){
        var tool = item.name;
        // console.log(tool)

        navigation.navigate('ToolDetails', {toolName: tool})

        // Alert.alert('Test', tool, [
        //     {text: 'OK', onPress: () => console.log('OK pressed')}
        // ]);
    };
    //const user = await firestore().collection('Users').doc('ABC').get();
    return (
        <SafeAreaView>
            <View style={styles.titles}>
                <Text style={styles.headerTitle}>Related Causes</Text>
                <Text style={styles.subTitle}>Find possible causes below</Text>
                <FlatList
                
                data={toolsList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => 
                <TouchableOpacity onPress={() => {
                    if(item.exists){
                        getToolsData(item)
                    }
                    return(item)
                    
                }}>
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
            </View>

        </SafeAreaView>
        


    );
  }
  
  const styles = StyleSheet.create({
    safeview:{
        flex: 1,  
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        
    },
    container: {
        backgroundColor: '#fff',
    },
    titles: {
        marginTop: '10%',
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
    },
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
