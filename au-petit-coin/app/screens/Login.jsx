import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { auth } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const Login = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const navigation = useNavigation();  // Initialisez le hook useNavigation ici

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      console.log({email});
      alert('Bienvenue, ' + email + ' !');
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
    setAuthMode((prevAuthMode) => (prevAuthMode === 'login' ? 'signup' : 'login'));
    console.log(authMode);
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
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

      {loading ? (
        <ActivityIndicator size="large" color='#0000FF' />
      ) : (
        <>
            <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={signIn}>
              <Text style={styles.buttonText}>Connexion</Text>
            </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.switchButton} onPress={() => navigation.navigate('Inscription')}>
        <Text style={styles.switchButtonText}>
          Pas encore inscrit ? S'inscrire
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  // container: {
  //   marginHorizontal: 20,
  //   // flex: 1,
  //   justifyContent: 'center',
  // },
  // input: {
  //   marginTop: 10,
  //   marginVertical: 4,
  //   height: 50,
  //   borderRadius: 4,
  //   padding: 10,
  //   backgroundColor: '#FFF',
  // },
  // loginButton: {
  //   backgroundColor: '#ffffff',
  //   borderRadius: 4,
  //   width: 150,
  //   height: 50,
  //   marginTop: 10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // registerButton: {
  //   backgroundColor: '#ffffff',
  //   borderRadius: 4,
  //   width: 150,
  //   height: 50,
  //   marginTop: 10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // switchButton: {
  //   margin: 10,
  //   alignItems: 'center',
  // },
  // switchButtonText: {
  //   color: '#ffffff',
  //   fontSize: 16,
  // },
  // button: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // buttonText: {
  //   color: "#FFB703",
  //   fontWeight: 'bold',
  // },

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