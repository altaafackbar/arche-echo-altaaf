import * as React from 'react';
import {Switch} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import { useContext } from 'react';
import themeContext from './ThemeContext';

export const DarkThemeToggle = () => {


    const {colors, isDark} = useTheme()

    const [isDarkTheme, setIsDarkTheme] = React.useState(false)


    const toggleSwitch = () => {
        setIsDarkTheme(!isDarkTheme)
        console.log(isDarkTheme)
    }
    
    const { setTheme, theme } = React.useContext(themeContext);
    // const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme

    return (
        <Switch 
        value={theme === 'Dark'}
        trackColor={{true: '#007bff'}} 
        onValueChange={() => setTheme(theme === 'Light' ? 'Dark' : 'Light')}/>
    )

}