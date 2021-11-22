import 'react-native-gesture-handler';
import React, { useState } from 'react';
import DrawerNav from './routes/navigation/DrawerNavigator';
import { StatusBar } from 'expo-status-bar';

//This is the main App.js file. This is where the all the screen get passed through to the user.

export default function App (){

  return (

    <DrawerNav />

  )

}