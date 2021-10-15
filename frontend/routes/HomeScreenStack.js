import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from '../login-pages/Landing'
import Login from '../login-pages/Login'
import SignUp from '../login-pages/SignUp'
<<<<<<< HEAD
import Disclaimer from '../login-pages/Disclaimer'
=======
>>>>>>> jason

const screens = {
    Landing: {
        screen: Landing
    },
    Login: {
        screen: Login
    },
    SignUp: {
        screen: SignUp
<<<<<<< HEAD
    },
    Disclaimer: {
        screen: Disclaimer
=======
>>>>>>> jason
    }
}
const HomeStack = createNativeStackNavigator(screens);

export default NavigationContainer(HomeStack)