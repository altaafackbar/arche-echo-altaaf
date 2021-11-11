import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ScrollView, Pressable, TouchableOpacity, FlatList } from "react-native";
import { GoogleMap, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';

import CurrentLocation from './LocationMap';

export class MapContainer extends Component {

    // map state
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        currentLocation: {
            lat: 53.5461,
            lng: -113.4938,
        },
        clinicsResult: []
    };

    // event handlers
    onMarkerClick = (props, marker, e) => 
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    // get list of clinics near the user's current location
    onMapLoad = map => {
        // retrieve current position
        navigator.geolocation.getCurrentPosition(pos => {
            const coords = pos.coords;
            this.setState({
                currentLocation: {
                    lat: coords.latitude,
                    lng: coords.longitude
                }
            });
        });

        // request details of health related services nearby
        const latitude = state.latitude;
        const longitude = state.longitude;
        const type = 'health';
        const radius = 50000;

        
        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radius + '&type=' + type + '&key=' + 'AIzaSyB7IherL6RNS-XYn87NWahcAFNA-D8ALcM';

        fetch(url)
            .then(res => {
                return res.json()
            })
            .then(res => {
                // for each service returned retrieve its details, put details in clinics list
                this.setState({
                    clinicsResult: res
                })
            })

            // catch any errors
            .catch(error => {
                console.log(error);
            });

    };

    render() {

        //show nearby clinics and add to list
        console.log(this.state.clinicsResult.res)

        return(
            <SafeAreaView style={styles.safeview}>
                {/* map */}
                <View style={styles.container}>
                    <CurrentLocation
                        centerAroundCurrentLocation
                        map = {this.map}
                        google={this.props.google}>
                            <Marker
                                onClick={this.onMarkerClick}
                                name={...state.selectedPlace.name}/>
                            <InfoWindow
                                marker={this.state.activeMarker}
                                visible={this.state.showingInfoWindow}
                                onClose={this.onClose}>
                                <div>
                                    <h4{...state.selectedPlace.name}></h4>
                                </div>
                            </InfoWindow>
                    </CurrentLocation>
                </View>

                {/* buttons to switch between saved locations and proximity search*/}
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

            {/* list of clinics */}
            <View style={styles.flatlistContainer}>
                <FlatList
                    data={this.state.clinicsResult.res}
                    keyExtractor = { (item) => item.place_id }
                    renderItem={({ item }) => 
                    (<Text style={styles.listName}>{item.name}{"\n"}{item.distance}</Text>)}
                >
                </FlatList>

            </View>
            </SafeAreaView>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyB7IherL6RNS-XYn87NWahcAFNA-D8ALcM'
})(MapContainer);

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
        //position: 'absolute',
        //width: Dimensions.get('window').width,
        //height: Dimensions.get('window').height,
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