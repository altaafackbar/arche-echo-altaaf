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
import { useNavigation } from '@react-navigation/native';
import symptoms from './symptoms.json'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import _ from "lodash"


export default function SymptomChecker() {

    const navigation = useNavigation();
    const [currentImage, setCurrentImage] = useState(bodyImage)
    const [selectedValue, setSelectedValue] = useState("none");
    const [symptomsList, setSymptomsList] = useState(symptoms['symptoms']);
    const [isSelected, setSelection] = useState(false);
    const [checked, setChecked] = useState([]);
    const [causes, setCauses] = useState([])

    let primary = '#007bff'
    const [toggleIcon, setToggle] = useState(true)


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
    function itemChecked(id){
        const index = checked.indexOf(id);
        if (index > -1) {
          return true; 
        } else {
          return false
        }
    }
    function getCauses(){
        const finalCauses = []
        const causesDic = []
        checked.forEach(element => {
            symptomsList[element].conditions.forEach(element => {
                const exists = finalCauses.indexOf(element)
                if (exists == -1) {
                    finalCauses.push(element)
                    causesDic.push({
                        "id" : finalCauses.indexOf(element),
                        "name" : element
                    })
                  }
            });
        }); 
            
        
        //console.log(_.union(finalCauses[0], finalCauses[1]));
        navigation.navigate('RelatedCauses', {
            relatedCauses : causesDic
        })
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
                extraData={checked}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => 

                <View style={{padding:5}}>
                    <TouchableOpacity style={
                        {flex: 1,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center', backgroundColor: "#E7ECF2", borderRadius: 10, height: 40}
                    }>
                        <Text style={{alignItems:'flex-start', paddingLeft:30, marginRight: 50}}>
                        {item.name}
                        </Text>
                        <TouchableOpacity style={{backgroundColor: 'transparent', paddingRight: 20}} 
                        isChecked={checked.includes(item.id)}
                        onPress={() => {
                          const newIds = [...checked];
                          const index = newIds.indexOf(item.id);
                          if (index > -1) {
                            newIds.splice(index, 1); 
                          } else {
                            newIds.push(item.id)
                          }
                          setChecked(newIds)

                        }}
                    >
                            <Icon name={!itemChecked(item.id) ? 'checkbox-blank-circle-outline' : 'check-circle'} size={24} color={!itemChecked(item.id) ? '#dadada' : primary}></Icon>
                        </TouchableOpacity>
                    </TouchableOpacity>

                </View>
                /*
                <ListItem 
                    containerStyle={{backgroundColor: "#E7ECF2", borderRadius: 10}}
                    bottomDivider
                    Component={TouchableScale}
                    friction={90}
                    tension={100}
                    activeScale={0.95}
                    
                >

                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.CheckBox color="black" solid
                        checked={isSelected}
                        style={styles.checkbox}/>

                </ListItem>*/
                }

            />
                <View style={{padding:5, marginHorizontal:120}}>
                    <TouchableOpacity 
                    onPress = {() => getCauses()}
                    style={
                        {alignItems: 'center', 
                        backgroundColor: "#96bdeb", 
                        borderRadius: 10, height: 40, 
                        justifyContent: 'center',
                        borderWidth: 1}
                        
                    }>
                        
                        <Text>Find Causes</Text>
                    </TouchableOpacity>

                </View>

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
        height: 400,
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
      checkbox: {
        alignSelf: "center",
      },
    

  });
