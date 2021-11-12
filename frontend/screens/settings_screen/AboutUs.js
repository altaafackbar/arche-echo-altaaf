import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '../../components/styles/ThemeProvider';

export default function AboutUs(props) {

    const {children} = props;

    const {colors, isDark} = useTheme();

    return (
        <View>
            <Text></Text>
        </View>
    )
}
