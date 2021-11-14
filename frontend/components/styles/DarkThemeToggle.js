import * as React from 'react';
import {Switch} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import { useContext } from 'react';
import themeContext from './ThemeContext';

// This file is for toggling dark mode throughout the entire app.
// This is a simple switch for toggling dark mode.

export const DarkThemeToggle = () => {

    // Gets the colors from the React Navigation Theme 
    const {colors, isDark} = useTheme()

    // Initializing a toggle to switch the state for Dark Mode
    const [isDarkTheme, setIsDarkTheme] = React.useState(false)


    const toggleSwitch = () => {
        setIsDarkTheme(!isDarkTheme)
        console.log(isDarkTheme)
    }
    
    // Uses a context to get the theme as a universal variable.
    const { setTheme, theme } = React.useContext(themeContext);

    return (
        <Switch 
        value={theme === 'Dark'}
        trackColor={{true: '#007bff'}} 
        onValueChange={() => setTheme(theme === 'Light' ? 'Dark' : 'Light')}/>
    )

}