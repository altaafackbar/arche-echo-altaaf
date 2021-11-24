import { View, Text, StyleSheet, Platform } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';
import LogoutDrawerItem from './LogoutDrawerItem';
import { useTheme } from '@react-navigation/native';
import themeContext from './ThemeContext'
import { DarkThemeToggle } from './DarkThemeToggle';

const CustomDrawer = (props) => {

    const { setTheme, theme } = React.useContext(themeContext);

    const { colors, isDark } = useTheme();

    // Set up calling function for both 911 and 811
    function dialNumber(number) {
        let phoneNumber = ''
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${number}`
        }
        else { phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
    }
    // Change text for toggle based on theme
    const checkMode = theme === 'Light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View>
                    <Text style={[styles.drawerHeader, { color: colors.text }]}>Child Care Aid</Text>
                    <Text style={styles.subheaderText}>Call 911 for Emergencies and 811 for Nurse Help</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.emergencyButton}
                            onPress={() => dialNumber(911)}
                        >
                            <Text style={styles.buttonText}>911</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.healthLinkButton}
                            onPress={() => dialNumber(811)}
                        >
                            <Text style={styles.healthButtonText}>811</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.horizontalLine} />

                <DrawerItemList {...props} />
                <View style={[styles.horizontalLine, { marginBottom: 10 }]} />
                <View style={styles.switchThemeContainer}>
                    <Text style={styles.switchThemeHeaderText}>{checkMode}</Text>
                    <DarkThemeToggle></DarkThemeToggle>
                </View>
            </DrawerContentScrollView>
            <LogoutDrawerItem></LogoutDrawerItem>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    drawerHeader: {
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: '600',
        marginTop: 10,
    },
    emergencyButton: {
        backgroundColor: '#79cc9b',
        borderRadius: 8,
        height: 40,
        width: 120,
        alignItems: 'center',
    },
    healthLinkButton: {
        backgroundColor: '#97c0f6',
        borderRadius: 8,
        height: 40,
        width: 120,
        alignItems: 'center',
    },

    buttonContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: '#16773e',
        margin: 10,
    },
    healthButtonText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: '#215aa6',
        margin: 10,
    },
    subheaderText: {
        fontWeight: '500',
        color: '#bcbcc1',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    horizontalLine: {
        flex: 1,
        height: 0.3,
        backgroundColor: '#dadada',
        marginBottom: 20,
    },
    logoutButtonStyle: {
        backgroundColor: '#f6b9b9',
        bottom: 0,
        width: '100%',
    },
    switchThemeContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 10,
    },
    switchThemeHeaderText: {
        fontSize: 14,
        color: '#bcbcc1',
        marginRight: 38,
    }
})