import { StyleSheet, View, Image, Text, Platform, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from '@react-navigation/native';
import { styles } from '../Styles/HomeStyles'

const Home = () => {

    const navigation = useNavigation();

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
          <Image
            source={require("../../assets/Logo-Poopy.png")}
            style={styles.logo}
          />
          <Text style={styles.logoText}>Au p'tit coin</Text>
        </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.loginButton]}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={styles.buttonText}>Connexion</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.registerButton]}
              onPress={() => navigation.navigate('Inscription')}
            >
              <Text style={styles.buttonText}>Inscription</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
};

export default Home;

// const styles = StyleSheet.create({
//     container: {
//       alignItems: 'center',
//     },
//     logoContainer: {
//       alignItems: 'center',
//       marginBottom: 20,
//     },
//     logoText: {
//       color: '#FFB703',
//       marginTop: 10,
//       fontSize: 40,
//       fontWeight: 'bold',
//     },
//     buttonContainer: {
//       marginTop: 50,
//       flexDirection: 'row', // Aligner les boutons horizontalement
//     },
//     logo: {
//       width: 250,
//       height: 150,
//       resizeMode: 'contain',
//     },
//     loginButton: {
//       backgroundColor: '#ffffff',
//       borderRadius: 15,
//       width: 150,
//       height: 70,
//       margin: 10,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     registerButton: {
//       backgroundColor: '#ffffff',
//       borderRadius: 15,
//       width: 150,
//       height: 70,
//       margin: 10,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     switchButton: {
//       margin: 10,
//       alignItems: 'center',
//     },
//     switchButtonText: {
//       color: '#ffffff',
//       fontSize: 16,
//     },
//     button: {
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     buttonText: {
//       color: '#FFB703',
//       fontWeight: 'bold',
//     },
//   });