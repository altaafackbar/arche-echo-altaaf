import React from "react";
import { useState, useEffect, useRef  } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, Pressable, TouchableOpacity, FlatList } from "react-native";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
// import { SafeAreaView } from "react-native-safe-area-context";

export default function ClinicMap() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [clinics, setClinics] = useState([]);
    const mapRef = useRef(null);
    const [distances, setDistances] = useState([])
    const [markers, setMarkers] = useState([]);
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
          const radius = 10000;
          const key = 'AIzaSyBx8_um411OKC9LMqN49FFh835HXO0k3L4'
          const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radius + '&type=' + type + '&key=' + key;
          const clinicList = null
          
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
                    
                    const distance = roundToTwo(getDistanceFromLatLonInKm(lat1,long1,lat2,long2))
                    element['distance'] = distance
                  });
                  
                  setClinics(res['results'])
                  
              })
  
              // catch any errors
              .catch(error => {
                  //console.log(error);
              });

            clinics.forEach(element => {
                const distanceList = []
                const lat1 = element['geometry']['location'].lat
                const long1 = element['geometry']['location'].lng
                const lat2 = region['latitude']
                const long2 = region['longitude']
                
                const distance = roundToTwo(getDistanceFromLatLonInKm(lat1,long1,lat2,long2))
                distanceList.push(distance)
                setDistances(distanceList)

            });
          setRegion({
            latitude: location['coords'].latitude,
            longitude: location['coords'].longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
          )
 

        })();

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
    function roundToTwo(num) {    
        return +(Math.round(num + "e+2")  + "e-2");
    }
    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }

    function getClinics(){

        
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
        console.log(item)
        const location = {
            latitude : item['geometry'].location['lat'],
            longitude : item['geometry'].location['lng'],
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        }
        mapRef.current.animateToRegion(location, 3 * 1000);


    }
    return (
        <SafeAreaView style={styles.safeview}>
            <View style={styles.container}>
                <MapView 
                    style={styles.map}
                    ref={mapRef}
                    provider = { MapView.PROVIDER_GOOGLE }
                    showsUserLocation={true}
                    initialRegion={{
                        latitude: 53.5461,
                        longitude: -113.4938,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    /*
                    {
                        ...
                        markers.forEach(element => {
                            console.log(element)
                            (<Marker>
                                coordinate={{
                                    latitude: element['latitude'],
                                    longitude: element['longitude'],
                                }}
                            </Marker>)
                            
                        })}*/
   

                >
                    {
                        
                    }
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
            <View style={{alignItems: 'center',}}>
                <TouchableOpacity
                onPress={() => getClinics()}
                style={{backgroundColor: '#b2cded', borderRadius: 10, height: 30,width: '50%',alignItems: 'center',}}>
                    <Text>Get Nearby Hospitals</Text>
                </TouchableOpacity>
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
                    data={clinics}
                    renderItem={({ item }) => (
                    
                        <View style={{ padding: 5 }}>
                        <TouchableOpacity 
                        onPress={() => {goToClinic(item)}}
                        style={
                            { flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#E7ECF2", borderRadius: 10, height: 60 }
                        }>
                            <Text style={{ alignItems: 'flex-start', paddingLeft: 30}}>
                                {item.name}
                            </Text>
                            <Text style={{ fontSize : 12, color : 'grey'}}>
                                {item.distance} km 
                            </Text>
                            <TouchableOpacity style={{ backgroundColor: 'transparent', paddingRight: 20 }}
                                
                                
                            >
                            </TouchableOpacity>
                        </TouchableOpacity>

                    </View>
                    )
                        
                    }
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
