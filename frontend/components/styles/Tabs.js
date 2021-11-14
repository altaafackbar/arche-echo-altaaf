import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainMenu from '../../screens/menus/MainMenu';
import ToolsAndResources from '../../screens/tools_and_resources_screen/ToolsAndResources';
import ClinicMap from '../../screens/clinic_map_screen/ClinicMap';
import SettingsScreen from '../../screens/settings_screen/SettingsScreen';
import StarredResources from '../../screens/starred_resources-screen/StarredResources';

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={MainMenu} />
            <Tab.Screen name="Tools and Resources" component={ToolsAndResources} />
            <Tab.Screen name="Find A Clinic Map" component={ClinicMap} />
            <Tab.Screen name="Starred Resources" component={StarredResources} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}

export default Tabs


// screenOptions={{
//     showLabel: false,
//     style: {
//         elevation: 0,
//         backgroundColor: '#000',
//     }
//     }}