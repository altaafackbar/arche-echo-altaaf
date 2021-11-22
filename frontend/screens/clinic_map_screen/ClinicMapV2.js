import React, { useCallback, useMemo } from "react";
import { useState, useEffect, useRef  } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, Pressable, TouchableOpacity, FlatList, Button, StatusBar } from "react-native";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useTheme } from '@react-navigation/native';
import themeContext from "../../components/styles/ThemeContext";
import { DarkMapStyle } from "../../components/styles/CustomMaps";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/core";

export default function ClinicMap() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [clinics, setClinics] = useState([]);
    const {colors, isDark} = useTheme();
    const { setTheme, theme } = React.useContext(themeContext);
    const sheetRef = useRef(null);
    const checkItemColor = theme === 'Light' ? '#bcbcc1' : '#313131'
    const checkMode = theme === 'Light' ? [] : DarkMapStyle
    const mapRef = useRef(null);
    const [clinicLocation, setClinicLocation] = useState(null)
    const [myRegion, setRegion] = useState({
        latitude: 53.5461,
        longitude: -113.4938,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          setRegion({
            latitude: location['coords'].latitude,
            longitude: location['coords'].longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
          )
          console.log(myRegion)
 

        })();
      }, []);
    
      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
        
      }
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
    function getClinics(){
        const latitude = myRegion.latitude;
        const longitude = myRegion.longitude;
        const type = 'hospital';
        const radius = 10000;
        const key = 'AIzaSyBx8_um411OKC9LMqN49FFh835HXO0k3L4'
        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radius + '&type=' + type + '&key=' + key;
        mapRef.current.animateToRegion(myRegion, 3 * 1000);
        
        fetch(url)
            .then(res => {
                return res.json()
            })
            .then(res => {
                // for each service returned retrieve its details, put details in clinics list
                setClinics(res['results'])
            })

            // catch any errors
            .catch(error => {
                console.log(error);
            });
        
        clinics.forEach(element => {
            
        });
        


        //console.log(clinics)

    }
    function goToClinic(item){
        console.log(item['geometry'].location)
        setClinicLocation({
            latitude : item['geometry'].location['lat'],
            longitude : item['geometry'].location['lng']
        })
    }

    const navigation = useNavigation()

    function navigateToSavedLocations() {
        navigation.navigate('SavedLocations')
    }

    // callbacks
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, []);

    const snapPoints = useMemo(() => ["30%", "50%", "90%"], []);

    useEffect (() => {
        getClinics()
    }, [])

    // Header for bottom sheet
    const listHeader = () => (
        <View style={[styles.sheetHeaderContainer, {backgroundColor: colors.background}]}>
        <Text style={[styles.sheetHeaderText, {color: colors.text}]}>Nearby Health Services</Text>
            <View style={styles.nearbyButtonContainer}>
                <TouchableOpacity
                onPress={() => getClinics()}
                style={styles.nearbyButton}>
                    <Text style={styles.nearbyButtonText}>Get Nearby Health Services</Text>
                </TouchableOpacity>
                <TouchableOpacity
                onPress={() => navigateToSavedLocations()}
                style={styles.savedLocationsButton}>
                    <Text style={[styles.nearbyButtonText, {color: '#4285F4'}]}>View Saved Locations</Text>
                </TouchableOpacity>
            </View>
        </View>
    )



    return (
        <SafeAreaView style={styles.safeview}>
            <View style={styles.container}>
                <MapView 
                    style={styles.map}
                    customMapStyle={checkMode}
                    ref={mapRef}
                    provider = { MapView.PROVIDER_GOOGLE }
                    initialRegion={{
                        latitude: 53.5461,
                        longitude: -113.4938,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    

                />
            </View>
            {/* <View style={styles.buttoncontainer}>
                <TouchableOpacity style={styles.button1}>
                    <Text>Sorted By:</Text>
                    <Text>Proximity</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2}>
                    <Text>Saved</Text>
                    <Text>Locations</Text>
                </TouchableOpacity>

                
            </View> */}


            <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
            onChange={handleSheetChange}
            handleIndicatorStyle={{backgroundColor: '#dadada'}}
            handleStyle={{backgroundColor: colors.background}}
            >

            {/* <View style={{alignItems: 'center',}}>
                <TouchableOpacity
                onPress={() => getClinics()}
                style={{backgroundColor: '#b2cded', borderRadius: 10, height: 30,width: '50%',alignItems: 'center',}}>
                    <Text>Get Nearby Hospitals</Text>
                </TouchableOpacity>
            </View> */}

            <BottomSheetFlatList 
            data={clinics}
            renderItem={({ item }) => (
                    <View style={styles.listItem}>
                    <Icon name='map-marker' size={24} color='#4285F4'></Icon>
                        <TouchableOpacity onPress={() => goToClinic(item)}>
                        <Text style={[styles.listName, {color: colors.text}]}>{item.name}{"\n"}{item.distance}</Text>
                    </TouchableOpacity>
                    
                    </View>

                    
                )
                    
                }
                keyExtractor = { (item, index) => index.toString() }
                ListHeaderComponent={listHeader}
                contentContainerStyle={{backgroundColor: colors.background}}
            />

            </BottomSheet>
                
        </SafeAreaView>
        


    );
  }
  
  const styles = StyleSheet.create({
    safeview:{
        flex: 1,
    },
    container: {
        flex: 1,
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
        flexWrap: 'wrap',
        // backgroundColor: "#E7ECF2",
        width: Dimensions.get('window').width,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        // marginRight: 20,

        // alignItems: "flex-start",
    },
    listItem: {
        flexDirection: 'row',
        marginVertical: 10,
        padding: 10,
    },

    sheetHeaderContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    sheetHeaderText: {
        fontWeight: 'bold',
        fontSize: 24,

    },
    nearbyButtonContainer: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    nearbyButton: {
        backgroundColor: '#4285F4',
        borderRadius: 5,
        width: '75%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    nearbyButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fafafa'
      },
      savedLocationsButton: {
        borderRadius: 5,
        width: '75%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderColor: '#4285F4',
        borderWidth: 2,
    },

  });