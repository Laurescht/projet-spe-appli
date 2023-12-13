import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, Platform, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Fond from '../../assets/Fond.png';
import { styles } from '../Styles/Connexion-InscriptionStyles'

const Inscription = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const navigation = useNavigation();

  const auth = getAuth();

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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.topContainer}>
          <Image source={Fond} style={styles.backgroundImage} resizeMode="cover" />
          <View style={styles.logoContainer}>
            <Image source={require("../../assets/Logo-Poopy.png")} style={styles.logo} />
            <Text style={styles.logoText}>Au p'tit coin</Text>
          </View>
        </View>
  
        <View style={styles.bottomContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>
              <Text style={styles.yellowText}>Je</Text>{'\n'}m'inscris !
            </Text>
          </View>
          <TextInput
            value={email}
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#000000"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            secureTextEntry={true}
            value={password}
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#000000"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={signUp}>
            <Text style={styles.buttonText}>Inscription</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.switchButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.switchButtonText}>Déjà inscrit ? Se connecter</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};  

export default Inscription;