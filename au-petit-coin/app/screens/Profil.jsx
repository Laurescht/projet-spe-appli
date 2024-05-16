import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

const Profil = ({ route, navigation }) => {

  const handleLogout = () => {

    navigation.navigate('Home');
  };

  const search = () => {

    navigation.navigate('Search');
  };


  return (
    <View style={styles.container}>
      <View style={styles.profilContainer}>
        <Text style={styles.welcomeText}>Bienvenue !</Text>

        {/* <TouchableOpacity style={styles.Button} onPress={handleLogout}>
          <Text style={styles.ButtonText}>Déconnexion</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
        style={[styles.Button]}
        onPress={() => FIREBASE_AUTH.signOut()}
      >
        <Text style={styles.ButtonText}>Déconnexion</Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={search}>
          <Text style={styles.ButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  Button: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
  },
  ButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Profil;
