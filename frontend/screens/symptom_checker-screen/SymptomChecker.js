import React from "react";
import { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions, SafeAreaView, ScrollView, Pressable, TouchableOpacity, FlatList, Image, Picker } from "react-native";;
import bodyImage from '../../assets/images/Body.png'
import bodyImageHead from '../../assets/images/Body-Head.png'
import bodyImageArms from '../../assets/images/Body-Arms.png'
import bodyImageChest from '../../assets/images/Body-Chest.png'
import bodyImageStomach from '../../assets/images/Body-Stomach.png'
import bodyImagePelvis from '../../assets/images/Body-Pelvis.png'
import bodyImageLegs from '../../assets/images/Body-Legs.png'
import emergencyImage from '../../assets/images/emergency.png'
import TouchableScale from 'react-native-touchable-scale';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import _ from "lodash"
import { firebase } from '../../Firebase';
import { useTheme } from "@react-navigation/native";
import themeContext from "../../components/styles/ThemeContext";


export default function SymptomChecker() {

    const navigation = useNavigation();
    const [currentImage, setCurrentImage] = useState(bodyImage)
    const [selectedValue, setSelectedValue] = useState("none");
    const [symptomsList, setSymptomsList] = useState([]);
    const [partsList, setPartsList] = useState({});
    const [isSelected, setSelection] = useState(false);
    const [checked, setChecked] = useState([]);
    const [causes, setCauses] = useState([])
    const [highlighted, setHilighted] = useState([])
    const {colors, isDark} = useTheme();
    const { setTheme, theme } = React.useContext(themeContext);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested'])
        firebase.firestore().collection('symptoms')
        .onSnapshot(querySnapshot => {
            const symp = []
            querySnapshot.forEach(documentSnapshot => {
                
                symp.push(documentSnapshot.data())
                
                //console.log(documentSnapshot.data())
            })
            setSymptomsList(symp)
        })
        
        firebase.firestore().collection('bodymap')
        .onSnapshot(querySnapshot => {
            const parts = {}
            querySnapshot.forEach(documentSnapshot => {
                const data = {}
                parts[documentSnapshot.id] = documentSnapshot.data()
                
                
                
                //console.log(documentSnapshot.data())
            })
            setPartsList(parts)
        })
        
    }, [])

    let primary = '#007bff'
    const [toggleIcon, setToggle] = useState(true)


    function updateBody(itemValue) {
        setSelectedValue(itemValue)
        if (itemValue == 'head') {
            setCurrentImage(bodyImageHead)

            setHilighted(partsList["Head or neck"].sID)
        }
        else if (itemValue == 'chest') {
            setCurrentImage(bodyImageChest)
            setHilighted(partsList["Chest or upper back"].sID)
        }
        else if (itemValue == 'stomach') {
            setCurrentImage(bodyImageStomach)
            setHilighted(partsList["Stomach or lower back"].sID)
        }
        else if (itemValue == 'pelvis') {
            setCurrentImage(bodyImagePelvis)
            setHilighted(partsList["Pelvis"].sID)
        }
        else if (itemValue == 'arms') {
            setCurrentImage(bodyImageArms)
            setHilighted(partsList["Arms or legs"].sID)
        }
        else if (itemValue == 'legs') {
            setCurrentImage(bodyImageLegs)
            setHilighted(partsList["Arms or legs"].sID)
        }
        else if (itemValue == 'emergency') {
            setCurrentImage(bodyImage)
            setHilighted(partsList["Emergency symptom"].sID)
        }
    }
    function itemChecked(id) {
        const index = checked.indexOf(id);
        if (index > -1) {
            return true;
        } else {
            return false
        }
    }

    function itemHighlight(id) {

        const index = highlighted.indexOf(parseInt(id));
        if (index > -1) {

            return true;
        } else {

            return false
        }
    }
    function getCauses() {
        const finalCauses = []
        const causesDic = []
        //console.log(symptomsList)
        checked.forEach(element => {
            //console.log(symptomsList[element])
            var symptoms = null
            symptomsList.forEach(symptomID => {
                if(symptomID['id'] == element){
                    symptoms = symptomID
                }
            });
            symptoms.conditions.forEach(element => {
                const exists = finalCauses.indexOf(element)
                if (exists == -1) {
                    finalCauses.push(element)
                    causesDic.push({
                        "id": finalCauses.indexOf(element),
                        "name": element
                    })
                }
            });
        });


        
        navigation.navigate('RelatedCauses', {
            relatedCauses: causesDic
        })
        

        /*partsList2.forEach(element => {
            const key = Object.keys(element)[0]
            console.log(element)
            //console.log(element[key.toString()])
            
            firebase.firestore()
            .collection('bodymap')
            .doc(key.toString())
            .set(element[key.toString()])
            .then(() => {

            });
            
        

        });*/
        

    


    }

    return (
        <ScrollView>
            <View style={styles.titles}>
                <Text style={[styles.headerTitle, {color: colors.text}]}>Symptom Checker</Text>
                <Text style={styles.subTitle}>Select a body part to get started.</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity
                onPress={() => updateBody('emergency')}
                style={styles.emergency}>
                    <Image source={emergencyImage} style={styles.emergencyImage} 
                    onPress={() => updateBody('emergency')}/>
            </TouchableOpacity>

            <TouchableOpacity
                    onPress={() => updateBody('emergency')}
                    style={styles.emergency}></TouchableOpacity>
            <View style={styles.imageContainer}>
                {/*head check */}
                <TouchableOpacity
                    onPress={() => updateBody('head')}
                    style={styles.headRectangle}></TouchableOpacity>

                {/*left arm check */}
                <TouchableOpacity
                    onPress={() => updateBody('arms')}
                    style={styles.leftArmRectangle}></TouchableOpacity>
                {/*right arm check */}
                <TouchableOpacity
                    onPress={() => updateBody('arms')}
                    style={styles.rightArmRectangle}></TouchableOpacity>

                {/*chest check */}
                <TouchableOpacity
                    onPress={() => updateBody('chest')}
                    style={styles.chestRectangle}></TouchableOpacity>

                {/*stomach check */}
                <TouchableOpacity
                    onPress={() => updateBody('stomach')}
                    style={styles.stomachRectangle}></TouchableOpacity>

                {/*pelvis check */}
                <TouchableOpacity
                    onPress={() => updateBody('pelvis')}
                    style={styles.pelvisRectangle}></TouchableOpacity>

                {/*legs check */}
                <TouchableOpacity
                    onPress={() => updateBody('legs')}
                    style={styles.legsRectangle}></TouchableOpacity>
                <Image source={currentImage} style={styles.bodyImage} />

            </View>
            </View>

            <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 10, marginHorizontal: 130 }}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => updateBody(itemValue)}>
                    <Picker.Item label="Select" value="none" />
                    <Picker.Item label="Head" value="head" />
                    <Picker.Item label="Chest" value="chest" />
                    <Picker.Item label="Stomach" value="stomach" />
                    <Picker.Item label="Pelvis" value="pelvis" />
                    <Picker.Item label="Legs" value="legs" />
                    <Picker.Item label="Arms" value="arms" />
                </Picker>
            </View>
            <FlatList
                style={{ borderRadius: 50, overflow: 'hidden', paddingVertical: 10, paddingBottom: 10 }}
                nestedScrollEnabled={true}

                data={symptomsList}
                extraData={checked}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) =>
                    <TouchableOpacity>
                        <Card containerStyle={ itemHighlight(item.id) ? styles.card_item_h : styles.card_item}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ flex: 1, }}>{item.name}</Text>
                            <TouchableOpacity style={{ backgroundColor: 'transparent'}}
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
                                <Icon name={!itemChecked(item.id) ? 'checkbox-blank-circle-outline' : 'check-circle'} size={28} color={!itemChecked(item.id) ? '#dadada' : primary}></Icon>
                            </TouchableOpacity>
                        </View>
                        </Card>
                    </TouchableOpacity>
                }

            />
            <View style={{ padding: 5, marginHorizontal: 120 }}>
                <TouchableOpacity
                    onPress={() => getCauses()}
                    style={
                        {
                            alignItems: 'center',
                            backgroundColor: "#96bdeb",
                            borderRadius: 10, height: 40,
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: '#4285F4' 
                        }

                    }>

                    <Text>Get Suggestions</Text>
                </TouchableOpacity>

            </View>

        </ScrollView>



    );
}
const transparency_hitbox = 0;
const styles = StyleSheet.create({
    safeview: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#fff',

    },
    card_item: {
        flex: 1,
        backgroundColor: "#E7ECF2",
        borderRadius: 15,
        margin: 15,
    },
    card_item_h: {
        flex: 1,
        backgroundColor: "#b2cded",
        borderRadius: 15,
        margin: 15,
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
        flex: 1,
        height: (1.1 * Dimensions.get('window').width),
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
        height: '35%',
        width: '26%',
        backgroundColor: `rgba(52, 52, 52, ${transparency_hitbox})`,
        position: 'absolute',
        zIndex: 90,
        top: '62%',
        left: '37%'
    },
    headRectangle: {
        height: '27%',
        width: '26%',
        backgroundColor: `rgba(52, 52, 52, ${transparency_hitbox})`,
        position: 'absolute',
        zIndex: 90,
        top: '3%',
        left: '37%'
    },
    chestRectangle: {
        height: '17%',
        width: '20%',
        backgroundColor: `rgba(52, 52, 52, ${transparency_hitbox})`,
        position: 'absolute',
        zIndex: 90,
        top: '32%',
        left: '40%'
    },
    stomachRectangle: {
        height: '8%',
        width: '20%',
        backgroundColor: `rgba(52, 52, 52, ${transparency_hitbox})`,
        position: 'absolute',
        zIndex: 90,
        top: '49%',
        left: '40%'
    },
    pelvisRectangle: {
        height: '5%',
        width: '20%',
        backgroundColor: `rgba(52, 52, 52, ${transparency_hitbox})`,
        position: 'absolute',
        zIndex: 90,
        //transform: [{ translateY: 43 }],
        top: '57%',
        left: '40%'
    },
    leftArmRectangle: {
        height: '30%',
        width: '9%',
        backgroundColor: `rgba(52, 52, 52, ${transparency_hitbox})`,
        position: 'absolute',
        zIndex: 90,
        transform: [{ rotate: '15deg' }],
        top: '36%',
        left: '30%'
    },
    rightArmRectangle: {
        height: '30%',
        width: '9%',
        backgroundColor: `rgba(52, 52, 52, ${transparency_hitbox})`,
        position: 'absolute',
        zIndex: 90,
        transform: [{ rotate: '-15deg' }],
        top: '36%',
        left: '61%'
    },
    emergencyImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        zIndex: 90,

    },
    emergency: {
        height: '9%',
        width: '9%',
        backgroundColor: `rgba(52, 52, 52, ${transparency_hitbox})`,
        position: 'absolute',
        zIndex: 90,
        top: '18%',
        left: '69%'

    },
    checkbox: {
        alignSelf: "center",
    },


});
