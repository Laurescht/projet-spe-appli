import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Fond from '../../assets/Fond.png';

const Inscription = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const navigation = useNavigation();

    const signUp = async () => {
        setLoading(true);
        try {
          const response = await createUserWithEmailAndPassword(auth, email, password);
          console.log(response);
          alert('Consultez vos mails !');
        } catch (error) {
          console.log(error);
          alert("L'inscription a échoué : " + error.message);
        } finally {
          setLoading(false);
        }
      };

  return (
    <View style={{
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor: "#219EBC",
    }}>
      <Image source={Fond} style={styles.backgroundImage} resizeMode="cover" />

      <View style={styles.overlayContainer}>

      <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)} />
      <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)} />
        <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={signUp}>
                <Text style={styles.buttonText}>Inscription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.switchButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.switchButtonText}>
          Déjà inscrit ? Se connecter
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

export default Inscription;

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      // flex: 1,
      justifyContent: 'center',
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      width: '100%',
      zIndex: -1,
    },
    input: {
      marginTop: 10,
      marginVertical: 4,
      height: 50,
      borderRadius: 4,
      padding: 10,
      backgroundColor: '#C4C4C4',
      width: 300,
      color: '#000000',
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: "#FFFFFF",
      fontWeight: 'bold',
    },
  
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
      flexDirection: 'row',
    },
    logo: {
      width: 250,
      height: 150,
      resizeMode: 'contain',
    },
    registerButton: {
      backgroundColor: '#219EBC',
      borderRadius: 50,
      width: 250,
      height: 50,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    switchButton: {
      margin: 10,
      alignItems: 'center',
    },
    switchButtonText: {
      color: '#000000',
      fontSize: 16,

    overlayContainer: {
      position: 'absolute',
      bottom: 0,
      zIndex: 1,
    },
    },
  });