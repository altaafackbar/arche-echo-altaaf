import 'react-native-gesture-handler';
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
import SettingsScreen from './screens/settings_screen/SettingsScreen';
import MainMenuV2 from './screens/menus/MainMenu-V2';
import SavedLocations from './screens/saved_locations_screen/SavedLocations';
import StarredResources from './screens/starred_resources-screen/StarredResources';
import Tabs from './components/styles/Tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as IconlyPack from 'react-native-iconly';
import { MaterialIcons } from '@expo/vector-icons';


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
          headerTitleStyle: {color: 'transparent'},
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
        
        
        <Stack.Screen options={{headerTitle: '', headerShadowVisible: false, headerBackVisible: false}} name="Onboarding" component={Onboard} />
        <Stack.Screen options={{headerShown: false, headerShadowVisible: false, headerBackVisible: false}} name="MainMenu" component={App} />
        {/* <Stack.Screen options={{headerTitle: '', headerShadowVisible: false}} name="Find A Clinic" component={ClinicMap} />
        <Stack.Screen options={{headerTitle: '', headerShadowVisible: false}} name="SymptomChecker" component={SymptomChecker}/>
        <Stack.Screen options={{headerTitle: '', headerShadowVisible: false}} name="RelatedCauses" component={RelatedCauses}/>
        <Stack.Screen options={{headerTitle: 'Tools And Resources', headerShadowVisible: false}} name="ToolsAndResources" component={ToolsAndResources}/>
        <Stack.Screen options={{headerTitle: 'Settings', headerShadowVisible: false}} name="SettingsScreen" component={SettingsScreen}/> */}
        <Stack.Screen options={{headerTitle: 'Starred Resources', headerShadowVisible: false}} name="StarredResources" component={StarredResources}/>
        <Stack.Screen options={{headerTitle: 'SavedLocations', headerShadowVisible: false}} name="SavedLocations" component={SavedLocations}/>
        {/* <Stack.Screen name="SymptomChecker" component={SymptomChecker} /> */}
      </Stack.Navigator>
      
    </NavigationContainer>

  )

}

const Tab = createBottomTabNavigator()

function App(){

  const primary = '#8A76B6'
  const gray = '#d1d1d6'

  return (
    <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      tabBarLabelStyle: {textAlign: 'center', fontWeight: '600', overflow: 'visible'},
      tabBarActiveTintColor: primary,
      tabBarInactiveTintColor: gray,
    }}
    >
        <Tab.Screen name="Home" component={MainMenuV2} options={{
          tabBarIcon: ({focused}) => (
            <IconlyPack.Home set='bold' primaryColor={focused ? '#8A76B6' : '#d1d1d6'} />
          ), headerTitle: 'ARCHE | ECHO Home', headerShadowVisible: false, headerTitleAlign: 'center'}} />

          
        <Tab.Screen name="Tools And Resources" component={ToolsAndResources} options={{tabBarIcon: ({focused}) => (
          <IconlyPack.Document set='bold' primaryColor={focused ? '#8A76B6' : '#d1d1d6'} />
        ), headerTitle: 'Tools and Resources', headerShadowVisible: false, headerTitleAlign: 'center'}}/>


        <Tab.Screen name="Symptom Checker" component={SymptomChecker} options={{tabBarIcon: ({focused}) => (
          <MaterialIcons name={'sick'} size={24} color={focused ? primary : gray}></MaterialIcons>
        ), headerTitle: 'Symptom Checker', headerShadowVisible: false, headerTitleAlign: 'center'}} />

        <Tab.Screen options={{tabBarIcon: ({focused}) => (
          <IconlyPack.Location set='bold' primaryColor={focused ? '#8A76B6' : '#d1d1d6'} />
        ), headerTitle: 'Find A Clinic Map', headerShadowVisible: false, headerTitleAlign: 'center', headerTransparent: true}} name="Find A Clinic" component={ClinicMap} />
        {/* <Tab.Screen options={{headerTitle: 'Starred Resources', headerShadowVisible: false, headerTitleAlign: 'center'}} name="StarredResources" component={StarredResources} />
        <Tab.Screen options={{headerTitle: 'Saved Locations', headerShadowVisible: false}} name="SavedLocations" component={SavedLocations}/> */}
        <Tab.Screen name="Settings" component={SettingsScreen} options={{tabBarIcon: ({focused}) => (
          <IconlyPack.Setting set='bold' primaryColor={focused ? '#8A76B6' : '#d1d1d6'} />
        ), headerTitle: 'Settings', headerShadowVisible: false, headerTitleAlign: 'center'}} />
    </Tab.Navigator>
)
  
}
