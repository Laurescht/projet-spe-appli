import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, Platform, StatusBar, TouchableOpacity } from 'react-native';
import Login from './app/screens/Login';

const Stack = createStackNavigator();

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleShowRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const toggleAuthMode = () => {
    // Inversez le mode entre 'login' et 'signup'
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home">
          {() => (
            <View
              style={{
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                backgroundColor: '#219EBC',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View style={styles.container}>
                <View style={styles.logoContainer}>
                  <Image source={require('./assets/Logo-Poopy.png')} style={styles.logo} />
                  <Text style={styles.logoText}>Au p'tit coin</Text>
                </View>

                {!showLogin && !showRegister && (
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={handleShowLogin}>
                      <Text style={styles.buttonText}>Connexion</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={handleShowRegister}>
                      <Text style={styles.buttonText}>Inscription</Text>
                    </TouchableOpacity>
                  </View>
                )}

                  {showLogin && <Login mode={authMode} toggleAuthMode={toggleAuthMode} />}
                  {showRegister && <Register toggleAuthMode={toggleAuthMode} />}
              </View>
            </View>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    color: '#FFB703',
    marginTop: 10,
    fontSize: 40,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 50,
    flexDirection: 'row', // Aligner les boutons horizontalement
  },
  logo: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
  },
  loginButton: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    width: 150,
    height: 70,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    width: 150,
    height: 70,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchButton: {
    margin: 10,
    alignItems: 'center',
  },
  switchButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFB703',
    fontWeight: 'bold',
  },
});
