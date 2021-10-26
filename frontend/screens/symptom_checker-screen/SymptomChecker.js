import React from "react";
import { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, SafeAreaView, ScrollView, Pressable, TouchableOpacity, FlatList, Image, Picker } from "react-native";;
import bodyImage from '../../assets/images/Body.png'
import bodyImageHead from '../../assets/images/Body-Head.png'
import bodyImageArms from '../../assets/images/Body-Arms.png'
import bodyImageBody from '../../assets/images/Body-Body.png'
import bodyImageLegs from '../../assets/images/Body-Legs.png'
import TouchableScale from 'react-native-touchable-scale';
import { ListItem } from 'react-native-elements';
import symptoms from './symptoms.json'
export default function SymptomChecker() {

    const [currentImage, setCurrentImage] = useState(bodyImage)
    const [selectedValue, setSelectedValue] = useState("none");
    const [symptomsList, setSymptomsList] = useState(symptoms['symptoms']);


    function updateBody (itemValue) {
        setSelectedValue(itemValue)
        if (itemValue == 'head'){
            setCurrentImage(bodyImageHead)
            console.log(symptomsList)
        }
        else if (itemValue == 'body'){
            setCurrentImage(bodyImageBody)
        }
        else if (itemValue == 'arms'){
            setCurrentImage(bodyImageArms)
        }
        else if (itemValue == 'legs'){
            setCurrentImage(bodyImageLegs)
        }
    }



    return (
        <ScrollView>
            <View style={styles.titles}>
                <Text style={styles.headerTitle}>Symptom Checker</Text>
                <Text style={styles.subTitle}>Select a body part to get started.</Text>
            </View>
            <View style={styles.imageContainer}>
                {/*head check */}
                <TouchableOpacity 
                onPress = {() => updateBody('head')}
                style={styles.headRectangle}></TouchableOpacity>

                {/*left arm check */}
                <TouchableOpacity 
                onPress = {() => updateBody('arms')}
                style={styles.leftArmRectangle}></TouchableOpacity>
                {/*right arm check */}
                <TouchableOpacity 
                onPress = {() => updateBody('arms')}
                style={styles.rightArmRectangle}></TouchableOpacity>

                {/*body check */}
                <TouchableOpacity 
                onPress = {() => updateBody('body')}
                style={styles.bodyRectangle}></TouchableOpacity>

                {/*legs check */}
                <TouchableOpacity 
                onPress = {() => updateBody('legs')}
                style={styles.legsRectangle}></TouchableOpacity>
                <Image source={currentImage} style={styles.bodyImage}/>
                
            </View>
            <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 10, marginHorizontal:130}}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => updateBody(itemValue)}>
                    <Picker.Item label="Select" value="none" />
                    <Picker.Item label="Head" value="head" />
                    <Picker.Item label="Body" value="body" />
                    <Picker.Item label="Legs" value="legs" />
                    <Picker.Item label="Arms" value="arms" />
                </Picker>
            </View>
            <FlatList
                style={{ borderRadius: 50, overflow: 'hidden', paddingVertical: 10, paddingBottom: 10}}
                nestedScrollEnabled ={true}
                
                data={symptomsList}
                keyExtractor={(item) => item.id}
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
                        <ListItem.Title>{item.name}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.CheckBox color="black" solid/>
                </ListItem>
                }

            />
            <TouchableOpacity>
                <Text>
                    Check Symptoms
                </Text>
            </TouchableOpacity>

        </ScrollView>
        


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
    imageContainer: {
        height: '15%',
        alignItems: 'center',
        paddingBottom: 10
    },
    bodyImage: {
        margin: 20,
        width: '95%',
        height: '95%',
        resizeMode: 'contain'

    },
    legsRectangle: {
        height: 188,
        width: 90,
        backgroundColor: 'rgba(52, 52, 52, 0)',
        position: 'absolute', 
        zIndex: 90,
        transform: [{translateY: -30}, {translateX: -2}],
        top: '50%',
        left: '40%'
      },
      headRectangle: {
        height: 90,
        width: 90,
        backgroundColor: 'rgba(52, 52, 52, 0)',
        position: 'absolute', 
        zIndex: 90,
        transform: [{translateY: -300}, {translateX: -2}],
        top: '50%',
        left: '40%'
      },
      bodyRectangle: {
        height: 150,
        width: 90,
        backgroundColor: 'rgba(52, 52, 52, 0)',
        position: 'absolute', 
        zIndex: 90,
        transform: [{translateY: -170}, {translateX: -2}],
        top: '50%',
        left: '40%'
      },
      leftArmRectangle: {
        height: 150,
        width: 35,
        backgroundColor: 'rgba(52, 52, 52, 0)',
        position: 'absolute', 
        zIndex: 90,
        transform: [{translateY: -150}, {translateX: -45}, {rotate: '15deg'}],
        top: '50%',
        left: '40%'
      },
      rightArmRectangle: {
        height: 150,
        width: 35,
        backgroundColor: 'rgba(52, 52, 52, 0)',
        position: 'absolute', 
        zIndex: 90,
        transform: [{translateY: -150}, {translateX: 95}, {rotate: '-15deg'}],
        top: '50%',
        left: '40%'
      },
    

  });
