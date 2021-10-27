import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Landing from './login-pages/Landing'
import LandingV2 from './login-pages/Landing-V2';
import Login from './login-pages/Login'
import SignUp from './login-pages/SignUp'
import Onboard from './screens/onboarding-screens/Onboarding'
import Disclaimer from './login-pages/Disclaimer';
import MainMenu from './screens/menus/MainMenu';
import DisclaimerModal from './screens/modals/disclaimer-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ClinicMap from './screens/clinic_map_screen/ClinicMap';
import SymptomChecker from './screens/symptom_checker-screen/SymptomChecker';
import RelatedCauses from './screens/symptom_checker-screen/RelatedCauses';
import ToolsAndResources from './screens/tools_and_resources_screen/ToolsAndResources';


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
        <Stack.Screen options={{ headerShown: false }} name="Landing" component={LandingV2} />
        <Stack.Screen 
        options={{
          headerTitle: '', 
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity
            onPress={() => navigateToDisclaimer()}
            style={{backgroundColor: 'transparent'}}
            >
              <Text style={{color: '#1f1f1f', fontSize: 16}}>Continue As Guest</Text>
            </TouchableOpacity>
          )}} 
        name="Login" 
        component={Login} />
        
        <Stack.Screen 
        options={{
          headerTitle: '', 
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity
            onPress={() => navigateToDisclaimer()}
            style={{backgroundColor: 'transparent'}}
            >
              <Text style={{color: '#1f1f1f', fontSize: 16}}>Continue As Guest</Text>
            </TouchableOpacity>
          )}} 
        name="SignUp" 
        component={SignUp} />

        <Stack.Screen 
        options={{
          headerTitle: '',
          presentation: 'fullScreenModal', 
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
            onPress={() => goBack()}
            style={{backgroundColor: 'transparent'}}
            >
              <Icon name='close' size={24} color='#1f1f1f'></Icon>
            </TouchableOpacity>
          )}} 
        name="DisclaimerModal" 
        component={DisclaimerModal} />
        
        
        <Stack.Screen options={{headerTitle: '', headerShadowVisible: false}} name="Onboarding" component={Onboard} />
        <Stack.Screen options={{headerTitle: '', headerShadowVisible: false}} name="MainMenu" component={MainMenu} />
        <Stack.Screen options={{headerTitle: '', headerShadowVisible: false}} name="Find A Clinic" component={ClinicMap} />
        <Stack.Screen options={{headerTitle: '', headerShadowVisible: false}} name="SymptomChecker" component={SymptomChecker}/>
        <Stack.Screen options={{headerTitle: '', headerShadowVisible: false}} name="RelatedCauses" component={RelatedCauses}/>
        <Stack.Screen options={{headerTitle: 'Tools And Resources', headerShadowVisible: false}} name="ToolsAndResources" component={ToolsAndResources}/>
        {/* <Stack.Screen name="SymptomChecker" component={SymptomChecker} /> */}
      </Stack.Navigator>
    </NavigationContainer>

  )

}