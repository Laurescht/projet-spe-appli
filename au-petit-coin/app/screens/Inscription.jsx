import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

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
        backgroundColor: "#219EBC",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
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
  )
}

export default Inscription;

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      // flex: 1,
      justifyContent: 'center',
    },
    input: {
      marginTop: 10,
      marginVertical: 4,
      height: 50,
      borderRadius: 4,
      padding: 10,
      backgroundColor: '#FFF',
    },
    loginButton: {
      backgroundColor: '#ffffff',
      borderRadius: 4,
      width: 150,
      height: 50,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    registerButton: {
      backgroundColor: '#ffffff',
      borderRadius: 4,
      width: 150,
      height: 50,
      marginTop: 10,
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
      color: "#FFB703",
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