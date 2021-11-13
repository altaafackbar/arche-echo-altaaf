import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from '../login-pages/Landing'
import Login from '../login-pages/Login'
import SignUp from '../login-pages/SignUp'
import Disclaimer from '../login-pages/Disclaimer'
import MainMenu from '../screens/menus/MainMenu';
import ClinicMap from '../screens/clinic_map_screen/ClinicMap';
import SymptomChecker from '../screens/symptom_checker-screen/SymptomChecker';
import ToolsAndResources from '../screens/tools_and_resources_screen/ToolsAndResources';
import SettingsScreen from '../screens/settings_screen/SettingsScreen';
import LandingV2 from '../login-pages/Landing-V2';
import ToolDetails from '../screens/tools_and_resources_screen/ToolDetail';
import EditToolsAdmin from '../screens/admin_screens/EditToolsAdmin';
import UpdateToolsAdmin from '../screens/admin_screens/UpdateToolsAdmin';


const screens = {
    Landing: {
        screen: Landing
    },
    LandingV2: {
        screen: LandingV2
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
    SymptomChecker: {
        screen: SymptomChecker
    },
    ToolsAndResources: {
        screen: ToolsAndResources
    },
    Settings: {
        screen: SettingsScreen
    },
    ToolDetails: {
        screen: ToolDetails
    },
    EditToolsAdmin: {
        screen: EditToolsAdmin
    },
    UpdateToolsAdmin: {
        screen: UpdateToolsAdmin
    },
}
const HomeStack = createNativeStackNavigator(screens);

export default NavigationContainer(HomeStack)