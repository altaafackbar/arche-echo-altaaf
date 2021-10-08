import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from '../login-pages/Landing'
import Login from '../login-pages/Login'
import SignUp from '../login-pages/SignUp'

const screens = {
    Landing: {
        screen: Landing
    },
    Login: {
        screen: Login
    },
    SignUp: {
        screen: SignUp
    }
}
const HomeStack = createNativeStackNavigator(screens);

export default NavigationContainer(HomeStack)