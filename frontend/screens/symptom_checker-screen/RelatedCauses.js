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
    //const user = firebase.firestore().collection('tools').doc(causes[0].name).get();
    
    useEffect(() => {
        //console.log(causes)
        causes.forEach(element => {
            firebase.firestore()
            .collection('tools')
            .doc(element.name)
            .get()
            .then(documentSnapshot => {
              console.log('User exists: ', documentSnapshot.exists);
              const details = documentSnapshot.data()['details']
          
              if (documentSnapshot.exists) {
                console.log('User data: ', documentSnapshot.data());
                element['exists'] = 'true'
                element['details'] = details
              }
            });
            
        }, [])
        //console.log(causes)
    });

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
                
                data={causes}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => 
                <TouchableOpacity onPress={() => {
                    if(item.exists){
                        getToolsData(item)
                    }
                    
                }}>
                    <Card containerStyle={styles.card_item}>
                    <Card.Title h4 style={{color: '#8A76B6',}}>{item.name}</Card.Title>
                    <Card.Divider></Card.Divider>
                    <View>
                        <Text>{item.exists? item.details : 'Resource coming soon!'}</Text>
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
