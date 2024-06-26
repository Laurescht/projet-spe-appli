import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import { getDirections } from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs } from '@firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';
import Btn from '../components/Btn';

const MapScreen = ({ navigation }) => {
  const search = () => {
    navigation.navigate('Search');
  };

  const route = useRoute();
  const { markers } = route.params;

  const [directions, setDirections] = useState([]);
  const [mapRegion, setMapRegion] = useState(null);
  const [toiletData, setToiletData] = useState([]);
  const [toiletCount, setToiletCount] = useState(0);

  useEffect(() => {
    if (markers.length >= 2) {
      getDirections(markers[0], markers[1]).then((directionsResult) => {
        setDirections(directionsResult);
      });
  
      const markerRegion = {
        latitude: markers[0].latitude,
        longitude: markers[0].longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
  
      setMapRegion(markerRegion);
    } else if (markers.length === 1) {
      const singleMarkerRegion = {
        latitude: markers[0].latitude,
        longitude: markers[0].longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
  
      setMapRegion(singleMarkerRegion);
    } else {
      const defaultRegion = {
        latitude: 48.8566,
        longitude: 2.3522,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
  
      setMapRegion(defaultRegion);
    }
  }, [markers]);
  
  useEffect(() => {
    const fetchToiletData = async () => {
      try {
        const db = getFirestore();
        const snapshot = await getDocs(collection(db, 'toilettes'));
        const data = snapshot.docs.map((doc) => doc.data());
        setToiletData(data);
      } catch (error) {
        
        throw error;
      }
    };
  
    fetchToiletData();
  }, []);

  return (
    <View style={styles.container}>
      {mapRegion && (
        <MapView
          style={styles.map}
          provider={MapView.PROVIDER_GOOGLE}
          region={mapRegion}
        >
          {toiletData.map(toilet => (
            <Marker
              key={toilet.id}
              coordinate={{
                latitude: toilet.latitude,
                longitude: toilet.longitude,
              }}
              title={toilet.name}
              description={toilet.description}
              pinColor="#219EBC"
            />
          ))}

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
      <TouchableOpacity style={styles.retourIconContainer} onPress={search}>
        <FontAwesome name="arrow-left" size={25} color="#219ebc" marginTop={15}/>
      </TouchableOpacity>
      <Btn btnAction={{ routeName: "ListToilet", additionalProps: { toiletData: toiletData }}} btnText="Voir en liste" btnStyle={{ position: 'absolute', top: 70, marginLeft: 90 }}/>
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
  retourIconContainer: {
    position: 'absolute',
    top: 30,
    left: 30,
  },
});

export default MapScreen;