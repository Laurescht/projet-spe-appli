import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar, Platform, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Fond from '../../assets/Fond.png';
import { styles } from '../Styles/Connexion-InscriptionStyles'
import Btn from '../components/Btn'
import Icon from "react-native-vector-icons/FontAwesome5";
import { useUser } from '../../UserContext';
import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from '../../FirebaseConfig';

const Inscription = () => {
  const {updateUser} = useUser();
  const [email, setEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleChangeLanguage = () => {};

  const auth = getAuth();

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const userID = response.user.uid;

      const usersCollection = collection(firestore, "users");
      await setDoc(doc(usersCollection, userID), {
        uid: userID,
        pseudo: pseudo,
        email: email,
      });

      updateUser({
        uid: userID,
        pseudo: pseudo,
        email: email,
      });
    } catch (error) {
      alert("L'inscription a échoué : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if(loading) {
    return (
      <Text>Chargement ...</Text>
    )
  }

  return (
    <SafeAreaView style={{
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      flex: 1,
      justifyContent: "center",
    }}>
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
          <TouchableOpacity
            style={styles.languageIconContainer}
            onPress={handleChangeLanguage}
          >
            <Icon name={"globe"} size={30} color="#fff" />
          </TouchableOpacity>
        </View>
  
        <View style={styles.bottomContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>
              <Text style={styles.yellowText}>Je</Text>{'\n'}m'inscris !
            </Text>
          </View>
          <TextInput
            value={pseudo}
            style={styles.input}
            placeholder="Pseudo"
            placeholderTextColor="#000000"
            autoCapitalize="none"
            onChangeText={(text) => setPseudo(text)}
          />
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
          <Btn btnAction={signUp} btnText="Inscription"/>
          <TouchableOpacity style={styles.switchButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.switchButtonText}>Déjà inscrit ? Se connecter</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};  

export default Inscription;
