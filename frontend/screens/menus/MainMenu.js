import React from 'react';
import { Text, Button, Pressable, StyleSheet, TouchableOpacity, View, Touchable, SafeAreaView } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


export default function MainMenu ()
{
    const navigation = useNavigation();

    function naviagteToClinicMap() {
        navigation.navigate('Find A Clinic')
    }
    function naviagteToSymptomChecker() {
        navigation.navigate('SymptomChecker')
    }
    function navigateToToolsAndResources() {
        navigation.navigate('ToolsAndResources')
    }

    function navigateToSettings() {
        navigation.navigate('SettingsScreen')
    }

    return(
        <SafeAreaView style={styles.container}>

            <View style={styles.containerRow1}>
                <Pressable 
                    style={styles.button}
                    onPress={() => navigateToToolsAndResources()}>
                    <Text style={styles.text}>Tools and Resources</Text>
                </Pressable>
                <Pressable 
                onPress={() => naviagteToSymptomChecker()}
                style={styles.button}>
                    <Text style={styles.text}>Symptom Checker</Text>
                </Pressable>
            </View>

            <View style={styles.containerRow2}>
                <Pressable 
                    style={styles.button}
                    onPress={() => naviagteToClinicMap()}>
                    <Text style={styles.text}>Find a Clinic Map</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>Starred Resources</Text>
                </Pressable>
            </View>

            <View style={styles.containerRow3}>
                <Pressable style={styles.button}>
                    <Text style={styles.text}>Saved Locations</Text>
                </Pressable>
                <Pressable 
                    style={styles.button}
                    onPress={() => navigateToSettings()}
                    >
                    <Text style={styles.text}>Settings Menu</Text>
                </Pressable>
            </View>
 
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
     flexDirection: 'column',
     justifyContent: 'space-evenly',
    },
    containerRow1:{
        flex: 1,
        marginBottom: '-50%',
        paddingTop: '20%',
        paddingRight: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
    }, 
    containerRow2:{
        flex: 1,
        marginBottom: '-50%',
        paddingRight: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    containerRow3:{
        flex: 1,
        marginBottom: '-35%',
        paddingRight: '5%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
     alignItems: 'center',
     justifyContent: 'center',
     width: "45%",
     height: "45%",
     marginLeft: "5%",
     borderRadius: 15,
     backgroundColor: '#8A76B6',
    },
    text: {
        justifyContent: 'center',
        fontSize: 15,
        lineHeight: 25,
        fontWeight: 'bold',
        letterSpacing: 0.25, 
        color: 'white',
    }
  });