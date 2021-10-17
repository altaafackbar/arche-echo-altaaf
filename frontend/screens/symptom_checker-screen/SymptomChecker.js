import React from "react";
import { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, Pressable, TouchableOpacity, FlatList, Image, Picker } from "react-native";;
import bodyImage from '../../assets/images/Body.png'
import bodyImageHead from '../../assets/images/Body-Head.png'
import bodyImageArms from '../../assets/images/Body-Arms.png'
import bodyImageBody from '../../assets/images/Body-Body.png'
import bodyImageLegs from '../../assets/images/Body-Legs.png'

export default function SymptomChecker() {

    const [currentImage, setCurrentImage] = useState(bodyImage)
    const [selectedValue, setSelectedValue] = useState("none");

    function updateBody (itemValue) {
        setSelectedValue(itemValue)
        if (itemValue == 'head'){
            setCurrentImage(bodyImageHead)
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
        <SafeAreaView style={styles.safeview}>
            <View style={styles.titles}>
                <Text style={styles.headerTitle}>Symptom Checker</Text>
                <Text style={styles.subTitle}>Please select a body part to get started.</Text>
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
                <Image source={currentImage} style={styles.bodyImage}></Image>
                
            </View>
            <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
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
            
                
        </SafeAreaView>
        


    );
  }
  
  const styles = StyleSheet.create({
    safeview:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'    
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
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
        width: '100%',
        alignItems: 'center',
    },
    bodyImage: {
        margin: 20,
        width: '70%',
        height: '70%',
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
