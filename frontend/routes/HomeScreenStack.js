import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from '../login-pages/Landing'
import Login from '../login-pages/Login'
import SignUp from '../login-pages/SignUp'
import Disclaimer from '../login-pages/Disclaimer'
import MainMenu from '../screens/menus/MainMenu';
import ClinicMap from '../screens/clinic_map_screen/ClinicMap';

const screens = {
    Landing: {
        screen: Landing
    },
    Login: {
        screen: Login
    },
    SignUp: {
        screen: SignUp
    },
    Disclaimer: {
        screen: Disclaimer
    },
    MainMenu: {
        screen: MainMenu
    },
    ClinicMap: {
        screen: ClinicMap
    },
}
const HomeStack = createNativeStackNavigator(screens);

export default NavigationContainer(HomeStack)