import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native'; // Importez useNavigation depuis React Navigation

const Login = ({ mode, toggleAuthMode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const navigation = useNavigation();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert("La connexion a échoué : " + error.message);
    } finally {
      setLoading(false);
    }
  };

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

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)} />
      <TextInput secureTextEntry={true} value={password} style={styles.input} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)} />

      {loading ? (
        <ActivityIndicator size="large" color='#0000FF' />
      ) : (
        <>
          {mode === 'login' ? (
            <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={signIn}>
              <Text style={styles.buttonText}>Connexion</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={signUp}>
              <Text style={styles.buttonText}>Inscription</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      <TouchableOpacity style={styles.switchButton} onPress={toggleAuthMode}>
        <Text style={styles.switchButtonText}>
          {mode === 'login' ? "Pas encore inscrit ? S'inscrire" : 'Déjà inscrit ? Se connecter'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

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
});

export default Login;