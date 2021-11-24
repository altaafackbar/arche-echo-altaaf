import React from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../../components/styles/CustomDrawer';
import themeContext from '../../components/styles/ThemeContext';
import Navigator from './StackNavigator';
import TabNavigator from './TabNavigator';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'react-native';

const Drawer = createDrawerNavigator()

export default function DrawerNav() {

  const [theme, setTheme] = React.useState('Light');
  const themeData = { theme, setTheme };

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
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={theme == 'Light' ? 'dark-content' : 'light-content'} />
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
            <Drawer.Screen name="Home" component={Navigator} initialParams={{ screen: 'Home' }} />
            <Drawer.Screen name="Symptom Checker" component={TabNavigator} initialParams={{ screen: 'Symptom Checker' }} />
            <Drawer.Screen name="Find A Clinic Map" component={TabNavigator} initialParams={{ screen: 'Find A Clinic' }} />
            <Drawer.Screen name="About Us" component={TabNavigator} initialParams={{ screen: 'AboutUs' }} />
            <Drawer.Screen name="Contact Us" component={TabNavigator} initialParams={{ screen: 'ContactUs' }} />
          </Drawer.Navigator>
        </NavigationContainer>
      </themeContext.Provider>
    </View>


  )

}