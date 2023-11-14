import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Platform, StatusBar } from 'react-native';

export default function App() {
  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: "#219EBC",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('./assets/Logo-Poopy.png')} style={styles.logo} />
          <Text style={styles.logoText}>Au p'tit coin</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.loginButton]}>
            <Text style={styles.buttonText}>Connexion</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.registerButton]}>
            <Text style={styles.buttonText}>Inscription</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
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
    margin: 10, // Espace entre les boutons
  },
  registerButton: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    width: 150,
    height: 70,
    margin: 10, // Espace entre les boutons
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "#FFB703",
    fontWeight: 'bold',
  },
});
