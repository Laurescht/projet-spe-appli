import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import Fond from '../../assets/Fond.png';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDebouncedCallback } from 'use-debounce';

const Search = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [markers, setMarkers] = useState([]);
    const [region, setRegion] = useState({
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    const navigation = useNavigation();
  
    const handleSeeOnMap = () => {
      console.log('Voir sur la carte');
      navigation.navigate('MapScreen', { markers, region });
    };

    const handleSearch = useDebouncedCallback(() => {
      const apiKey = 'AIzaSyCcLJm1mrqbjI_JSyVE2x9P2xc_PilTEc0';
      const geocodeEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}&key=${apiKey}`;
    
      console.log('Geocode Endpoint:', geocodeEndpoint);
    
      fetch(geocodeEndpoint)
        .then((response) => response.json())
        .then((data) => {
          console.log('Geocoding Data:', data);
          if (data.status === 'OK' && data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            console.log('Location:', location);
            const newMarkers = [
              {
                latitude: location.lat,
                longitude: location.lng,
                title: searchTerm,
                description: 'Searched Location',
              },
            ];
            setMarkers(newMarkers);
            setRegion({
              latitude: location.lat,
              longitude: location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          } else {
            console.error('Geocoding failed:', data.status);
          }
        })
        .catch((error) => {
          console.error('Error fetching geocoding data:', error);
        });
    }, 100);

  const handleChangeLanguage = () => {
    console.log('Changer la langue');
  };

  const navigateToProfile = () => {
    navigation.navigate('Profil');
  };

  useEffect(() => {
    if (markers.length > 0) {
      const newRegion = {
        latitude: markers[0].latitude,
        longitude: markers[0].longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setRegion(newRegion);
    }
  }, [markers]);


  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <Image source={Fond} style={styles.backgroundImage} resizeMode="cover" />
          <View style={styles.logoContainer}>
            <Image source={require("../../assets/Logo-Poopy.png")} style={styles.logo} />
            <Text style={styles.logoText}>Au p'tit coin</Text>
          </View>
          <TouchableOpacity style={styles.languageIconContainer} onPress={handleChangeLanguage}>
            <Icon name={"globe"} size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileIconContainer} onPress={navigateToProfile}>
            <Icon name={"user-circle"} size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>
              <Text style={styles.yellowText}>Où</Text>{'\n'}sommes nous ?
            </Text>
          </View>
          <TextInput
            value={searchTerm}
            style={styles.input}
            placeholder="Rechercher..."
            placeholderTextColor="#000000"
            autoCapitalize="none"
            onChangeText={(text) => setSearchTerm(text)}
          />
<TouchableOpacity style={[styles.button, styles.registerButton]} onPress={() => { handleSearch(); handleSeeOnMap(); }}>
  <Text style={styles.buttonText}>Voir sur la carte</Text>
</TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
      },
      safeArea: {
        flexGrow: 1,
      },
      topContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: '100%',
      },
      outlinedIcon: {
        borderWidth: 0.5,
        borderColor: '#fff',
        borderRadius: 15,
      },
      languageIconContainer: {
        position: 'absolute',
        top: 30,
        left: 30,
      },
      profileIconContainer: {
        position: 'absolute',
        top: 30,
        right: 30,
      },
      backgroundImage: {
        position: 'absolute',
        zIndex: -1,
      },
      logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
      },
      logoText: {
        color: '#FFB703',
        marginTop: 5,
        fontSize: 40,
        fontWeight: 'bold',
      },
      logo: {
        width: 250,
        height: 150,
        resizeMode: 'contain',
      },
      bottomContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingHorizontal: 30,
        zIndex: -1,
      },
      textContainer: {
        alignSelf: 'flex-start',
      },
      titleText: {
        color: '#000000',
        fontSize: 30,
        marginBottom: 20,
        textAlign: 'left',
        fontWeight: 'bold',
      },
      yellowText: {
        color: '#FFB703',
        fontWeight: 'bold',
      },
      input: {
        marginTop: 10,
        marginVertical: 4,
        height: 50,
        borderRadius: 4,
        padding: 10,
        backgroundColor: 'rgba(196, 196, 196, 0.2)',
        width: '100%',
        color: '#000000',
      },
      buttonText: {
        color: "#FFFFFF",
        fontWeight: 'bold',
      },
      registerButton: {
        backgroundColor: '#219EBC',
        borderRadius: 50,
        width: 250,
        height: 50,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        elevation: 4,
      },
      switchButton: {
        marginTop: 10,
        alignItems: 'center',
      },
      switchButtonText: {
        color: '#000000',
        fontSize: 16,
      },
  });

export default Search;
