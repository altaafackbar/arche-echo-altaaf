import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { firebase } from '../../Firebase';
import LandingV2 from '../../login-pages/Landing-V2';
import Login from '../../login-pages/Login';
import SignUp from '../../login-pages/SignUp';
import Onboard from '../../screens/onboarding-screens/Onboarding'
import DisclaimerModal from '../../screens/modals/disclaimer-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import EditToolsAdmin from '../../screens/admin_screens/EditToolsAdmin';
import AddToolModal from '../../screens/modals/AddToolModal';
import UpdateVideo from '../../screens/modals/UpdateVideo';
import UpdateInfoGraphic from '../../screens/modals/UpdateInfoGraphic';
import UpdateEBook from '../../screens/modals/UpdateEBook';
import EditEBook from '../../screens/modals/EditEBook'
import ForgotPassword from '../../screens/modals/ForgotPasswordModal';
import ToolDetail from '../../screens/tools_and_resources_screen/ToolDetail';
import ClinicMap from '../../screens/clinic_map_screen/ClinicMap';
import SymptomChecker from '../../screens/symptom_checker-screen/SymptomChecker';
import RelatedCauses from '../../screens/symptom_checker-screen/RelatedCauses';
import ToolsAndResources from '../../screens/tools_and_resources_screen/ToolsAndResources';
import SavedLocations from '../../screens/saved_locations_screen/SavedLocations';
import StarredResources from '../../screens/starred_resources-screen/StarredResources';
import { StatusBar } from 'expo-status-bar';
import TabNavigator from './TabNavigator';
import swipeContext from '../../components/styles/SwipeContext';


const Stack = createNativeStackNavigator();

// Creating the navigation function
export default function Navigator() {

    const handleAnonymousSignIn = () => {
      firebase.auth()
        .signInAnonymously()
        .then((userCredentials) => {
          const user = userCredentials.user
          user.updateProfile({
            displayName: 'Guest',
          })
          console.log('User signed in anonymously');
          const db = firebase.firestore()
          db
            .collection("users")
            .doc(user.uid)
            .set({
              email: 'AnonymousEmail',
              firstName: 'Guest',
              lastName: 'Anonymous',
              disclaimer: false,
              admin: false,
              starTools: ['empty'],
            })
            .then(() => {
              console.log('User created');
            })
            .catch((error) => {
              console.error('Error writing document: ', error);
            });
        })
        .catch(error => {
          if (error.code === 'auth/operation-not-allowed') {
            console.log('Enable anonymous in your firebase console.');
          }
  
          console.error(error);
        })
    };
  
    return (
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
        <Stack.Screen options={{ headerShown: false, }} name="Landing" component={LandingV2} />
        <Stack.Screen
          options={{
            headerTitle: '',
            headerShadowVisible: false,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => handleAnonymousSignIn()}
                style={{ backgroundColor: 'transparent' }}
              >
                <Text style={{ color: '#1f1f1f', fontSize: 16 }}>Continue As Guest</Text>
              </TouchableOpacity>
            )
          }}
          name="Login"
          component={Login} />
  
        <Stack.Screen
          options={{
            headerTitle: '',
            headerShadowVisible: false,
            headerRight: () => (
              <TouchableOpacity
                onPress={() => handleAnonymousSignIn()}
                style={{ backgroundColor: 'transparent' }}
              >
                <Text style={{ color: '#1f1f1f', fontSize: 16 }}>Continue As Guest</Text>
              </TouchableOpacity>
            )
          }}
          name="SignUp"
          component={SignUp} />
  
        <Stack.Screen
          options={{
            headerTitle: '',
            headerTitleStyle: { color: 'transparent' },
            presentation: 'fullScreenModal',
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => goBack()}
                style={{ backgroundColor: 'transparent' }}
              >
                <Icon name='close' size={24} color='#1f1f1f'></Icon>
              </TouchableOpacity>
            )
          }}
          name="DisclaimerModal"
          component={DisclaimerModal} />
  
        <Stack.Screen
          options={{
            headerTitle: '',
            headerTitleStyle: { color: 'transparent' },
            presentation: 'fullScreenModal',
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => goBack()}
                style={{ backgroundColor: 'transparent' }}
              >
                <Icon name='close' size={24} color='#1f1f1f'></Icon>
              </TouchableOpacity>
            )
          }}
          name="ForgotPassword"
          component={ForgotPassword} />
  
  
        <Stack.Screen
          options={{
            headerTitle: '',
            headerTitleStyle: { color: 'transparent' },
            presentation: 'fullScreenModal',
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => goBack()}
                style={{ backgroundColor: 'transparent' }}
              >
                <Icon name='close' size={24} color='#1f1f1f'></Icon>
              </TouchableOpacity>
            )
          }}
          name='AddToolModal'
          component={AddToolModal}
        />
  
        <Stack.Screen
          options={{
            headerTitle: '',
            headerTitleStyle: { color: 'transparent' },
            presentation: 'fullScreenModal',
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => goBack()}
                style={{ backgroundColor: 'transparent' }}
              >
                <Icon name='close' size={24} color='#1f1f1f'></Icon>
              </TouchableOpacity>
            )
          }}
          name='UpdateVideo'
          component={UpdateVideo}
        />
  
        <Stack.Screen
          options={{
            headerTitle: '',
            headerTitleStyle: { color: 'transparent' },
            presentation: 'fullScreenModal',
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => goBack()}
                style={{ backgroundColor: 'transparent' }}
              >
                <Icon name='close' size={24} color='#1f1f1f'></Icon>
              </TouchableOpacity>
            )
          }}
          name='UpdateInfoGraphic'
          component={UpdateInfoGraphic}
        />
  
        <Stack.Screen
          options={{
            headerTitle: '',
            headerTitleStyle: { color: 'transparent' },
            presentation: 'fullScreenModal',
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => goBack()}
                style={{ backgroundColor: 'transparent' }}
              >
                <Icon name='close' size={24} color='#1f1f1f'></Icon>
              </TouchableOpacity>
            )
          }}
          name='UpdateEBook'
          component={UpdateEBook}
        />
  
        <Stack.Screen
          options={{
            headerTitle: '',
            headerTitleStyle: { color: 'transparent' },
            presentation: 'fullScreenModal',
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => goBack()}
                style={{ backgroundColor: 'transparent' }}
              >
                <Icon name='close' size={24} color='#1f1f1f'></Icon>
              </TouchableOpacity>
            )
          }}
          name='EditEBook'
          component={EditEBook}
        />
  
        <Stack.Screen options={{ headerTitle: '', headerShadowVisible: false, headerBackVisible: false, }} name="Onboarding" component={Onboard} />
        <Stack.Screen options={{ headerShown: false, headerShadowVisible: false, headerBackVisible: false }} name="MainMenu" component={TabNavigator} />
        {/* <Stack.Screen options={{headerTitle: '', headerShadowVisible: false}} name="Find A Clinic" component={ClinicMap} />
          <Stack.Screen options={{headerTitle: '', headerShadowVisible: false}} name="SymptomChecker" component={SymptomChecker}/>
          <Stack.Screen options={{headerTitle: 'Tools And Resources', headerShadowVisible: false}} name="ToolsAndResources" component={ToolsAndResources}/>
          <Stack.Screen options={{headerTitle: 'Settings', headerShadowVisible: false}} name="SettingsScreen" component={SettingsScreen}/> */}
        <Stack.Screen options={{ headerTitle: 'Starred Resources', headerShadowVisible: false }} name="StarredResources" component={StarredResources} />
        <Stack.Screen options={{ headerTitle: '', headerShadowVisible: false }} name="RelatedCauses" component={RelatedCauses} />
        <Stack.Screen options={{ headerTitle: 'SavedLocations', headerShadowVisible: false }} name="SavedLocations" component={SavedLocations} />
        <Stack.Screen options={{ headerTitle: '', headerShadowVisible: false }} name="ToolDetails" component={ToolDetail} />
        <Stack.Screen options={{ headerTitle: 'Admin Screen', headerShadowVisible: false }} name="EditToolsAdmin" component={EditToolsAdmin} />
        {/* <Stack.Screen options={{headerTitle: 'Starred Resources', headerShadowVisible: false}} name="StarredResources" component={StarredResources}/>
          <Stack.Screen options={{headerTitle: 'SavedLocations', headerShadowVisible: false}} name="SavedLocations" component={SavedLocations}/> */}
        {/* <Stack.Screen name="SymptomChecker" component={SymptomChecker} /> */}
      </Stack.Navigator >
  
    )
  
  }
