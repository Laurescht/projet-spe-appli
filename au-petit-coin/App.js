import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Platform, StatusBar, TouchableOpacity } from 'react-native';
import Login from './app/screens/Login'; // Make sure to provide the correct path to your Login component
import Home from './app/screens/Home';
import Inscription from './app/screens/Inscription';



const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Inscription" component={Inscription} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

