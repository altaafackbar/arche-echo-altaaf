import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, useColorScheme } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import CustomDrawer from '../../components/styles/CustomDrawer';
import { firebase } from '../../Firebase';
import themeContext from '../../components/styles/ThemeContext';
import { useTheme } from '@react-navigation/native';
import swipeContext from '../../components/styles/SwipeContext';
import Navigator from './StackNavigator';
import TabNavigator from './TabNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';

const Drawer = createDrawerNavigator()

export default function DrawerNav() {

    const [theme, setTheme] = React.useState('Light');
    const themeData = { theme, setTheme };
  
    const { colors, isDark } = useTheme();

    const swipe = React.useState(1)
  
    const CustomDefaultTheme = {
      dark: false,
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: '#fff',
        text: '#1f1f1f',
      }
    }
  
    const CustomDarkTheme = {
      dark: true,
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        text: '#fff',
      }
    }
  
  
    return (
      <themeContext.Provider value={themeData}>
        <NavigationContainer theme={theme == 'Light' ? CustomDefaultTheme : CustomDarkTheme}>
          <Drawer.Navigator
            screenOptions={{
              headerShown: false,
              swipeEdgeWidth: 0,
              drawerActiveBackgroundColor: '#e8e4f0',
              drawerActiveTintColor: '#8a76b6',
              drawerInactiveBackgroundColor: 'transparent',
              drawerInactiveTintColor: '#bcbcc1',
  
            }}
  
            drawerContent={props => <CustomDrawer {...props} />}
          >
            <Drawer.Screen name="Home" component={Navigator} initialParams={{ screen: 'Home' }}  />
            <Drawer.Screen name="Symptom Checker" component={TabNavigator} initialParams={{ screen: 'Symptom Checker' }} />
            <Drawer.Screen name="Find A Clinic Map" component={TabNavigator} initialParams={{ screen: 'Find A Clinic' }} />
            <Drawer.Screen name="About Us" component={TabNavigator} initialParams={{ screen: 'AboutUs' }} />
            <Drawer.Screen name="Contact Us" component={TabNavigator} initialParams={{ screen: 'ContactUs' }} />
          </Drawer.Navigator>
        </NavigationContainer>
      </themeContext.Provider>
  
    )
  
  }


//   options={{drawerLabel: () => null, title: null, drawerIcon: () => null, drawerItemStyle: {height: 0}}}