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
