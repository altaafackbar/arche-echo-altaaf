import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import Landing from './login-pages/Landing'
import LandingV2 from './login-pages/Landing-V2';
import Login from './login-pages/Login'
import SignUp from './login-pages/SignUp'
import Onboard from './screens/onboarding-screens/Onboarding'
import Disclaimer from './login-pages/Disclaimer';
import MainMenu from './screens/menus/MainMenu';
import ClinicMap from './screens/clinic_map_screen/ClinicMap';
import SymptomChecker from './screens/symptom_checker-screen/SymptomChecker';


const Stack = createNativeStackNavigator();

// Creating the navigation function
export default function Navigator() {

  return (

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {

            backgroundColor: 'transparent'
          },
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20
          }

        }}
      >
        <Stack.Screen options={{ headerShown: false }} name="Landing" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Onboarding" component={Onboard} />
        <Stack.Screen name="Disclaimer" component={Disclaimer} />
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="Find A Clinic" component={ClinicMap} />
        <Stack.Screen name="SymptomChecker" component={SymptomChecker} />
      </Stack.Navigator>
    </NavigationContainer>

  )

}