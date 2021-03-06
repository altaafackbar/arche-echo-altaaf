import React from "react";
import { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, SafeAreaView, ScrollView, Pressable, TouchableOpacity, FlatList, Image, Picker } from "react-native";;
import TouchableScale from 'react-native-touchable-scale';
import { ListItem, Card } from 'react-native-elements';
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
            const detailedTools = []
            querySnapshot.forEach(documentSnapshot => {
                const temp = documentSnapshot.data()
                
                causes.forEach(element => {
                    if(element.name == temp['name']){
                        temp['exists'] = true
                        temp['id'] = element.id.toString()
                        tools.push(temp)
                        detailedTools.push(element)
                        
                    }



                });

            })
            //add tools that have no resources to list
            var missingResourcesTools = _.difference(causes,detailedTools);
            missingResourcesTools.forEach(element => {
                element['exists'] = false
                element['id'] = element['id'].toString()
                tools.push(element)
            });

            setToolsList(tools)

            
        })

    }, [])
    

    function getToolsData(item){
        var tool = item.name;

        navigation.navigate('ToolDetails', {toolName: tool})

    };
    //const user = await firestore().collection('Users').doc('ABC').get();
    return (
        <SafeAreaView style={styles.safeview}>
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
                        <Text>{item.exists ? item.details : 'Resource coming soon!'}</Text>
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
        marginTop: '1%',
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
