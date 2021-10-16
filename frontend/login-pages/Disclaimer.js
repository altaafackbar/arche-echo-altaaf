import React, {useState} from 'react';
import { Text, View, Button, StyleSheet, Image, SafeAreaView, Pressable, CheckBox, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';
import MainPhoto from '../assets/images/landing-image.png'


export default function Disclaimer ()
{
    const [isSelected, setSelection] = useState(false);
    const [selectedValue, setSelectedValue] = useState("english");
    const navigation = useNavigation();

    function navigateToMainMenu () {
      navigation.navigate('MainMenu')
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.boldText}>DISCLAIMER</Text>
          <View style={styles.disclaimerBox}>
            
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</Text>
            </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                style={styles.checkbox}
            />
        <Text style={styles.label}>I agree to the terms and conditions</Text>
        
      </View>

          
        <Text style={styles.boldText}>CHOOSE LANGUAGE</Text>
        <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 10 }}>
        <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="English" value="english" />
        <Picker.Item label="French" value="french" />
      </Picker>
      </View>
        <Text style={styles.subTitle}>You can change this anytime in the settings</Text>

      <View style={styles.buttonContainer}>
        <Pressable
        style={styles.button} 
        onPress={()=>navigateToMainMenu()}>
        <Text style={styles.buttonText}>Continue</Text>
        </Pressable>
    </View>

          
        </SafeAreaView>

      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      titles: {
        marginTop: '10%',
        width: '100%',
        textAlign: 'center'
    },
      header: {
        backgroundColor: 'pink',
        padding: 20,
        borderRadius: 10
      },
      headerTitle: {
        fontSize: 24,
        color: '#1f1f1f',
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 10,
        color: '#919191',
        textAlign: 'center',
        padding: 10,
    },
      body: {
        backgroundColor: '#8c7eab',
        padding: 30,
      },
      boldText: {

        fontSize: 20,
        color: 'black',
        padding: 10,

      },
      disclaimerBox: {
        margin: 20,
        backgroundColor: '#e4d9fa',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      languageBox: {
        margin: 30,
        backgroundColor: '#e4d9fa',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
      },
      label: {
        fontSize: 15,
        color: 'black',
        paddingTop: 3,
      },
      buttonContainer: {
        width: '100%',
        paddingBottom: 120,
        justifyContent: 'center',
        alignItems: 'center',
        
      },
      button: {
          backgroundColor: '#8A76B6',
          borderRadius: 50,
          width: 100,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
      }
    });