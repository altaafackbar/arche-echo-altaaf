import React from "react";
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, Pressable, TouchableOpacity, FlatList } from "react-native";
import MapView from 'react-native-maps';
// import { SafeAreaView } from "react-native-safe-area-context";

export default function ClinicMap() {

    const Clinics = [
        {
            id: 1,
            name: "Medicine Place Pharmacy",
            distance: "700m - 3 mins",
        },
        {
            id: 2,
            name: "Downtown Medical Clinic",
            distance: "1.7km - 6 mins",
        },
        {
            id: 3,
            name: "RaiN MedClinic",
            distance: "1.8km - 7 mins",
        },
        {
            id: 4,
            name: "Downtown Medicentre",
            distance: "1.8km - 7 mins",
        },
        {
            id: 5,
            name: "Alberta Avenue Medical Clinic",
            distance: "2.9km - 11 mins",
        },
    ];

    // function Item({name, distance}) {
    //     return (
    //         <TouchableOpacity style={styles.listItem}>
    //             <Text style={styles.listName}>{name}{"\n"}</Text>
    //             <Text style={styles.listDistance}>{distance}</Text>
    //         </TouchableOpacity>
    //     )
    // };

    return (
        <SafeAreaView style={styles.safeview}>
            <View style={styles.container}>
                <MapView 
                    style={styles.map}
                    provider = { MapView.PROVIDER_GOOGLE }
                    initialRegion={{
                        latitude: 53.5461,
                        longitude: -113.4938,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View>
            <View style={styles.buttoncontainer}>
                <TouchableOpacity style={styles.button1}>
                    <Text>Sorted By:</Text>
                    <Text>Proximity</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2}>
                    <Text>Saved</Text>
                    <Text>Locations</Text>
                </TouchableOpacity>

                
            </View>
            <View style={styles.flatlistContainer}>
                <FlatList
                    data={Clinics}
                    renderItem={({ item }) => (<Text style={styles.listName}>{item.name}{"\n"}{item.distance}</Text>)}
                    keyExtractor = { (item, index) => index.toString() }
                >
                </FlatList>

            </View>
                    
                    


            
                
        </SafeAreaView>
        


    );
  }
  
  const styles = StyleSheet.create({
    safeview:{
        flex: 1,
    },
    container: {
        flex: 0.7,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    //   width: Dimensions.get('window').width,
    //   height: Dimensions.get('window').height,
    },
    buttoncontainer: {
        flex: 1,
        marginBottom: '-75%',
        paddingTop: '5%',
        paddingRight: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
    },

    button1: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "45%",
        height: "20%",
        marginLeft: "5%",
        borderRadius: 15,
        backgroundColor: '#8A76B6',
    },
    button2: {
        alignItems: 'center',
        justifyContent: 'center',
        width: "45%",
        height: "20%",
        marginLeft: "5%",
        borderRadius: 15,
        backgroundColor: '#F3F9FA',
    },

    listName: {
        flex: 1,
        backgroundColor: "#E7ECF2",
        width: Dimensions.get('window').width,
        marginVertical: 20,
        padding: 10,

        // alignItems: "flex-start",
    },

    flatlistContainer: {
        flex: 1,
        // flexDirection: 'row',
        alignItems: "center",
        paddingTop: "-50%",
        // justifyContent: 'center',
        width: Dimensions.get('window').width,
    },

  });
