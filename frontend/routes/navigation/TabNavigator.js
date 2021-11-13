import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, useColorScheme } from 'react-native';
import ClinicMap from '../../screens/clinic_map_screen/ClinicMap';
import { useState } from 'react';
import SymptomChecker from '../../screens/symptom_checker-screen/SymptomChecker';
import RelatedCauses from '../../screens/symptom_checker-screen/RelatedCauses';
import ToolsAndResources from '../../screens/tools_and_resources_screen/ToolsAndResources';
import SavedLocations from '../../screens/saved_locations_screen/SavedLocations';
import StarredResources from '../../screens/starred_resources-screen/StarredResources';
import AboutUs from '../../screens/settings_screen/AboutUs';
import ContactUs from '../../screens/settings_screen/ContactUs';
import MainMenuV2 from '../../screens/menus/MainMenu-V2';
import SettingsScreen from '../../screens/settings_screen/SettingsScreen';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '@react-navigation/native';
import themeContext from '../../components/styles/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as IconlyPack from 'react-native-iconly';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { MaterialIcons } from '@expo/vector-icons';
import { firebase } from '../../Firebase';

const Tab = createBottomTabNavigator()

export default function TabNavigator(props) {

    const { setTheme, theme } = React.useContext(themeContext);
  
    const { children } = props;
  
    const { colors, isDark } = useTheme();
  
    const primary = '#8A76B6'
    const gray = '#d1d1d6'
  
    const navigation = useNavigation()
  
    function openDrawer() {
      navigation.openDrawer()
    }
  
    let hamburgerIcon;
  
    if (theme === 'Light') {
      hamburgerIcon = '#1f1f1f'
    }
    else {
      hamburgerIcon = '#fff'
    }
  
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarLabelStyle: { textAlign: 'center', fontWeight: '600', overflow: 'visible' },
          tabBarActiveTintColor: primary,
          tabBarInactiveTintColor: gray,
          headerTitleContainerStyle: {
            paddingRight: 20
          },
          headerLeftContainerStyle: {
            paddingLeft: 20
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => openDrawer()}
              style={{ backgroundColor: 'transparent' }}
            >
              <Icon name='menu' size={24} color={hamburgerIcon}></Icon>
            </TouchableOpacity>),
        }}
      >
        <Tab.Screen name="Home" component={MainMenuV2} options={{
          tabBarIcon: ({ focused }) => (
            <IconlyPack.Home set='bold' primaryColor={focused ? '#8A76B6' : '#d1d1d6'} />
          ), headerTitle: 'ARCHE | ECHO Home', headerShadowVisible: false, headerTitleAlign: 'center',
        }} />
  
  
        <Tab.Screen name="Tools And Resources" component={ToolsAndResources} options={{
          tabBarIcon: ({ focused }) => (
            <IconlyPack.Document set='bold' primaryColor={focused ? '#8A76B6' : '#d1d1d6'} />
          ), headerTitle: 'Tools and Resources', headerShadowVisible: false, headerTitleAlign: 'center'
        }} />
  
  
        <Tab.Screen name="Symptom Checker" component={SymptomChecker} options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons name={'sick'} size={24} color={focused ? primary : gray}></MaterialIcons>
          ), headerTitle: 'Symptom Checker', headerShadowVisible: false, headerTitleAlign: 'center'
        }} />
  
        <Tab.Screen options={{
          tabBarIcon: ({ focused }) => (
            <IconlyPack.Location set='bold' primaryColor={focused ? '#8A76B6' : '#d1d1d6'} />
          ), headerTitle: 'Find A Clinic Map', headerShadowVisible: false, headerTitleAlign: 'center', headerTransparent: true, headerTitleStyle: { color: '#1f1f1f' },
        }} name="Find A Clinic" component={ClinicMap} />
  
        <Tab.Screen name="Settings" component={SettingsScreen} options={{
          tabBarIcon: ({ focused }) => (
            <IconlyPack.Setting set='bold' primaryColor={focused ? '#8A76B6' : '#d1d1d6'} />
          ), headerTitle: 'Settings', headerShadowVisible: false, headerTitleAlign: 'center'
        }} />
  
        <Tab.Screen options={{ headerTitle: 'Starred Resources', headerShadowVisible: false, headerTitleAlign: 'center', tabBarButton: () => null, tabBarVisible: false }} name="StarredResources" component={StarredResources} />
        <Tab.Screen options={{ headerTitle: 'Saved Locations', headerShadowVisible: false, headerTitleAlign: 'center', tabBarButton: () => null, tabBarVisible: false }} name="SavedLocations" component={SavedLocations} />
        <Tab.Screen options={{ headerTitle: 'About Us', headerShadowVisible: false, headerTitleAlign: 'center', tabBarButton: () => null, tabBarVisible: false }} name="AboutUs" component={AboutUs} />
        <Tab.Screen options={{ headerTitle: 'Contact Us', headerShadowVisible: false, headerTitleAlign: 'center', tabBarButton: () => null, tabBarVisible: false }} name="ContactUs" component={ContactUs} />
      </Tab.Navigator>
    )
  
  }