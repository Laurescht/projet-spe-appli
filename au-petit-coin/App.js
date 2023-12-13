import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Platform, StatusBar, TouchableOpacity } from 'react-native';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import Inscription from './app/screens/Inscription';
import Profil from './app/screens/Profil';
import Search from './app/screens/Search';
import MapScreen from './app/screens/MapScreen';



const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" >
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name="Inscription" component={Inscription} options={{ headerShown: false }}/>
        <Stack.Screen name="Search" component={Search} options={{ headerShown: false }}/>
        <Stack.Screen name="MapScreen" component={MapScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Profil" component={Profil} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

