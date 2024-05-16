import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import Login from "./app/screens/Login";
import Home from "./app/screens/Home";
import Inscription from "./app/screens/Inscription";
import Profil from "./app/screens/Profil";
import Search from "./app/screens/Search";
import MapScreen from "./app/screens/MapScreen";
import ListToilet from "./app/screens/ListToilet";
import ToiletDetails from "./app/screens/ToiletDetails";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {user ? (
          <>
            <Stack.Screen
              name="Search"
              component={Search}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MapScreen"
              component={MapScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profil"
              component={Profil}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ListToilet"
              component={ListToilet}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ToiletDetails"
              component={ToiletDetails}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Inscription"
              component={Inscription}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
