import * as React from 'react';
import {useColorScheme} from 'react-native-appearance';
import { lightColors, darkColors } from './ColorThemes';

export const ThemeContext = React.createContext({
    isDark: false,
    colors: lightColors,
    setScheme: () => {},
});

export const ThemeProvider = (props) => {

    const colorScheme = useColorScheme()

    const [isDark, setIsDarkTheme] = React.useState(colorScheme === 'dark')

    React.useEffect(() => {
        setIsDarkTheme(colorScheme === 'dark')
    }, [colorScheme])

    const defaultTheme = {
        isDark,
        colors: isDark ? darkColors : lightColors,
        setScheme: (scheme) => setIsDarkTheme(scheme === 'dark')
    }

    return (

        <ThemeContext.Provider value={defaultTheme}>
            {props.children}
        </ThemeContext.Provider>
    )

}

export const useTheme = () => React.useContext(ThemeContext);