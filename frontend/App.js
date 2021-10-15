import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import Landing from './login-pages/Landing'
import Login from './login-pages/Login'
import SignUp from './login-pages/SignUp'
import Disclaimer from './login-pages/Disclaimer'

const Stack = createNativeStackNavigator()

export default function Navigator(){

  return(
    
    <NavigationContainer>
    <Stack.Navigator> 
    <Stack.Screen options={{headerShown: false}} name="Landing" component={Landing} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="Disclaimer" component={Disclaimer} />
    </Stack.Navigator>
    </NavigationContainer>

  )

}

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fafafa',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
