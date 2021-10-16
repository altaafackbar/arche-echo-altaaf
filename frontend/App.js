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


const Stack = createNativeStackNavigator()

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
          headerBackTitleVisible: false,
          headerLeftContainerStyle: {
          paddingLeft: 20,
          }

        }}
      >

        {/* Setting up all the screens in the stack navigator */}
        <Stack.Screen options={{headerShown: false }} name="Landing" component={LandingV2} />
        <Stack.Screen options={{headerTitle: '', headerShadowVisible: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerTitle: '', headerShadowVisible: false}} name="SignUp" component={SignUp} />
        <Stack.Screen options={{headerTitle: '', headerShadowVisible: false}} name="Onboarding" component={Onboard} />
        <Stack.Screen options={{headerTitle: '', headerShadowVisible: false}} name="MainMenu" component={MainMenu} />
        <Stack.Screen options={{headerTitle: '', headerShadowVisible: false}} name="Find A Clinic" component={ClinicMap} />
        <Stack.Screen options={{headerTitle: '', headerShadowVisible: false}} name="Disclaimer" component={Disclaimer}/>
      </Stack.Navigator>
    </NavigationContainer>

  )

}