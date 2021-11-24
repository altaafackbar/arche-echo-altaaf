import React, { useCallback, useMemo } from "react";
import { useState, useEffect, useRef  } from 'react';
import { Card, colors} from 'react-native-elements';
import { Alert, View, Text, Image, StyleSheet, Dimensions, SafeAreaView, ScrollView, Pressable, TouchableOpacity, FlatList, Button, StatusBar } from "react-native";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { AntDesign } from '@expo/vector-icons';
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useTheme } from '@react-navigation/native';
import themeContext from "../../components/styles/ThemeContext";
import { DarkMapStyle } from "../../components/styles/CustomMaps";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/core";
import SavedLocations from '../../assets/Menu-Images/SavedLocations.png'
import { firebase } from '../../Firebase';

export default function ClinicMap({ route }) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [currentList, setCurrentList] = useState([]);
    const [clinics, setClinics] = useState([]);
    const {colors, isDark} = useTheme();
    const [markers, setMarkers] = useState([]);
    const [bookmarked, setBookmarked] = useState([]);
    const [bookmarkedDetail, setBookmarkedDetail] = useState([]);
    const [user, setUser] = useState(null);
    const { setTheme, theme } = React.useContext(themeContext);
    const sheetRef = useRef(null);
    const checkItemColor = theme === 'Light' ? '#bcbcc1' : '#313131'
    const checkMode = theme === 'Light' ? [] : DarkMapStyle
    const mapRef = useRef(null);
    const [showBookmarked, setShowBookmarked] = useState(false)
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
          const region = {
            latitude: location['coords'].latitude,
            longitude: location['coords'].longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
          mapRef.current.animateToRegion(region, 3 * 1000);

          const latitude = region['latitude'];
          const longitude = region['longitude'];
          const type = 'hospital';
          const radius = 8000;
          const key = 'AIzaSyBx8_um411OKC9LMqN49FFh835HXO0k3L4'
          const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radius + '&type=' + type + '&key=' + key;
          const clinicList = []
          
          fetch(url)
              .then(res => {
                  return res.json()
              })
              .then(res => {
                  // for each service returned retrieve its details, put details in clinics list
                  res['results'].forEach(element => {
                    const lat1 = element['geometry']['location'].lat
                    const long1 = element['geometry']['location'].lng
                    const lat2 = region['latitude']
                    const long2 = region['longitude']
                    //get distance and driving time for each location using distance matrix google API
                    var urlToFetchDistance = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins='+lat1+','+long1+'&destinations='+lat2+'%2C'+long2+'&key=' + key;

                    fetch(urlToFetchDistance)
                            .then(res => {
                    return res.json()
                    })
                    .then(res => {
                        
                              var distanceString = res.rows[0].elements[0].distance.text;
                              var distanceNum = res.rows[0].elements[0].distance.value;
                              var durationString = res.rows[0].elements[0].duration.text;
                              var durationNum = res.rows[0].elements[0].duration.value;
                              element['duration'] = durationString
                              element['durationNum'] = durationNum
                              element['distance'] = distanceString
                              element['distanceNum'] = distanceNum
                              clinicList.push(element)
                
                     
                     })
                    .catch(error => {
                             console.log("Problem occurred");
                     });
                    //const distance = roundToTwo(getDistanceFromLatLonInKm(lat1,long1,lat2,long2))
                    
                  });

                  setClinics(clinicList)
                  setCurrentList(clinicList)
                  
              })
  
              // catch any errors
              .catch(error => {
                  //console.log(error);
              });
          setRegion({
            latitude: location['coords'].latitude,
            longitude: location['coords'].longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
          )
 

        })();
        const user = firebase.auth().currentUser
        setUser(user)
        firebase.firestore().collection('users').doc(user.uid)
        .onSnapshot(documentSnapshot => {

            setBookmarked(documentSnapshot.data().bookmarkedLocations)
        })


      }, []);
    
      let text = 'Waiting..';
      if (errorMsg) {
        text = errorMsg;
      } else if (location) {
        text = JSON.stringify(location);
        
      }

    // function Item({name, distance}) {
    //     return (
    //         <TouchableOpacity style={styles.listItem}>
    //             <Text style={styles.listName}>{name}{"\n"}</Text>
    //             <Text style={styles.listDistance}>{distance}</Text>
    //         </TouchableOpacity>
    //     )
    // };
    function fillList(){

    }
    function getClinics(){
        var sortedClinics = clinics
        sortedClinics.sort((a, b) => Number(a.durationNum) - Number(b.durationNum));
        
        setClinics(sortedClinics)
        
        
        const marks = []
        for (let index = 0; index < clinics.length; index++) {
            const element = clinics[index];
            marks.push({
                id : index,
                latitude : element['geometry'].location['lat'],
                longitude : element['geometry'].location['lng'],
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
                name : element.name,
                description : element.vicinity


            }) 
        }
        
        setMarkers(marks)
        //console.log('markers',markers)

        


        //console.log(clinics)

    }
    function goToClinic(item){
 
        const location = {
            latitude : item['geometry'].location['lat'],
            longitude : item['geometry'].location['lng'],
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }
        sheetRef.current?.snapToIndex(0);
        mapRef.current.animateToRegion(location, 3 * 1000);



    }
    function showBookmarkedLocations(){
        setShowBookmarked(!showBookmarked)
        if(!showBookmarked){
            console.log('show')
            const details = []
            bookmarked.forEach(element => {
                if(typeof(element) == "object"){
                    details.push(element)
                }
            });
            setBookmarkedDetail(details)
            setCurrentList(details)

        }
        else{
            console.log('no')
            setCurrentList(clinics)
        }
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
                onPress={() => showBookmarkedLocations()}
                style={showBookmarked ? styles.savedLocationsButtonTrue : styles.savedLocationsButton}>
                    <Text style={[styles.nearbyButtonText, {color: showBookmarked? 'white' : '#4285F4'}]}>View Saved Locations</Text>
                </TouchableOpacity>
            </View>
        </View>
    )



    function handleBookmark(item){
        var newBookmarked = [...bookmarked]
        newBookmarked.push(item.name, item)
        firebase.firestore().collection('users').doc(user.uid)
            .update({
                bookmarkedLocations : newBookmarked,
            })
    }

    function handleUnBookmark(item){
        var newBookmarked = [...bookmarked]
        var index = newBookmarked.indexOf(item.name)
        if (index > -1) {
            newBookmarked.splice(index, index + 1)
        }
        // console.log(starred)
        firebase.firestore().collection('users').doc(user.uid)
            .update({
                bookmarkedLocations: newBookmarked,
            })
    }
    

    return (
        <SafeAreaView style={styles.safeview}>
            <View style={styles.container}>
            <MapView 
                    style={styles.map}
                    customMapStyle={checkMode}
                    ref={mapRef}
                    showsUserLocation={true}
                    provider = { MapView.PROVIDER_GOOGLE }
                    showsUserLocation={true}
                    initialRegion={{
                        latitude: 53.5461,
                        longitude: -113.4938,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >

                    {markers &&
                    markers.map((marker, index) => (
                        <Marker
                        key={index}
                        coordinate={{
                            latitude: marker['latitude'],
                            longitude: marker['longitude'],
                            
                        }}
                        title={marker['name']}
                        description={marker['description']}
                        />
                    ))}
                </MapView>
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
            data={currentList}
            renderItem={({ item }) => (
                    /*
                    <View style={styles.listItem}>
                    <Icon name='map-marker' size={24} color='#4285F4'></Icon>
                        <TouchableOpacity 
                        onLongPress={() => saveItem()}
                        onPress={() => goToClinic(item)}>
                        <Text style={[styles.listName, {color: colors.text}]}>{item.name}{"\n"}{item.distance}-{item.duration}</Text>
                    </TouchableOpacity>
                    </View>*/
                    <TouchableOpacity onPress={() =>goToClinic(item)}>
                    <Card containerStyle={styles.card_item}>
                        <Card.Title  style={{ color: 'black', }}>{item.name}</Card.Title>
                        <Card.Divider></Card.Divider>
                        <View style={{ flexDirection: 'row', backgroundColor: "#E7ECF2" }}>
                            <Text style={{ flex: 0.8 }}>{item.duration} away by car      -      {item.distance}</Text>
                            
                            {bookmarked.includes(item.name) === true &&
                                <>
                                    <TouchableOpacity style={{ flex: 0.2, alignContent: 'center', alignItems: 'center', paddingTop: '5%' }} onPress={() =>handleUnBookmark(item)}>
                                        <AntDesign name="heart" size={35} color="black" />
                                        {/* <AntDesign name="staro" size={35} color="black"/> */}
                                    </TouchableOpacity>
                                </>
                            }
                            {/* unstarred tools */}
                            {bookmarked.includes(item.name) === false &&
                                <>
                                    <TouchableOpacity style={{ flex: 0.2, alignContent: 'center', alignItems: 'center', paddingTop: '5%' }} onPress={() => handleBookmark(item)}>
                                        <AntDesign name="hearto" size={35} color="black" />
                                    </TouchableOpacity>
                                </>
                            }
                            

                        </View>
                    </Card>
                </TouchableOpacity>

                    
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
        flex: 0.8,
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
        // width: Dimensions.get('window').width,
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
    savedLocationsButtonTrue: {
        backgroundColor: '#4285F4',
        borderRadius: 5,
        width: '75%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderColor: '#4285F4',
        borderWidth: 2,
    },
    
    imageDetails: {
        resizeMode: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    card_item: {
        flex: 1,
        backgroundColor: "#E7ECF2",
        borderRadius: 15,
        margin: 15,
    },

  });