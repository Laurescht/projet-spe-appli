import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import { getDirections } from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';

const MapScreen = ({ navigation }) => {
  const search = () => {
    navigation.navigate('Search');
  };

  const route = useRoute();
  const { markers } = route.params;

  const [directions, setDirections] = useState([]);
  const [mapRegion, setMapRegion] = useState(null);

  useEffect(() => {
    console.log("Markers:", markers);
    if (markers.length >= 2) {
      getDirections(markers[0], markers[1]).then((directionsResult) => {
        setDirections(directionsResult);
      });
  
      // Utilisez les coordonnées des marqueurs pour définir la région
      const markerRegion = {
        latitude: markers[0].latitude,
        longitude: markers[0].longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
  
      setMapRegion(markerRegion);
    } else if (markers.length === 1) {
      // Si un seul marqueur est présent, utilisez ses coordonnées pour définir la région
      const singleMarkerRegion = {
        latitude: markers[0].latitude,
        longitude: markers[0].longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
  
      setMapRegion(singleMarkerRegion);
    } else {
      // Si aucun marqueur n'est présent, utilisez la région par défaut (Paris)
      const defaultRegion = {
        latitude: 48.8566,
        longitude: 2.3522,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
  
      setMapRegion(defaultRegion);
    }
  }, [markers]);
  
  

  return (
    <View style={styles.container}>
      {mapRegion && (
        <MapView
          style={styles.map}
          provider={MapView.PROVIDER_GOOGLE}
          region={mapRegion}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.title}
              description={marker.description}
            />
          ))}
          {directions && (
            <Polyline
              coordinates={directions}
              strokeWidth={4}
              strokeColor="#219EBC"
            />
          )}
        </MapView>
      )}
      {!directions && (
        <Text style={styles.loadingText}>Chargement des directions...</Text>
      )}
      <TouchableOpacity style={styles.Button} onPress={search}>
        <Text style={styles.ButtonText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
      };  

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
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

export default MapScreen;
