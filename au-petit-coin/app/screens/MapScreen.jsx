import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import { getDirections } from 'react-native-maps-directions';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs } from '@firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ListToilet from './ListToilet';


const MapScreen = ({ navigation }) => {
  const search = () => {
    navigation.navigate('Search');
  };

  const route = useRoute();
  const { markers } = route.params;

  const [directions, setDirections] = useState([]);
  const [mapRegion, setMapRegion] = useState(null);
  const [toiletData, setToiletData] = useState([]);

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
  
    useEffect(() => {
      // Récupérer les données depuis Firebase
      const fetchToiletData = async () => {
        try{
          const db = getFirestore();
        // const toiletCollection = db.collection('toilettes');

        const snapshot = await getDocs(collection(db, 'toilettes'));
        const data = snapshot.docs.map((doc) => doc.data());
  
        // const toilets = snapshot.docs.map(doc => ({
        //   id: doc.id,
        //   ...doc.data(),
        // }));
  
        setToiletData(data);
        console.log(snapshot);
        } catch(error){
          console.error('Erreur: ', error);
          throw error;
        }
        
      };
  
      fetchToiletData();
    }, []);

    const retour = () => {
      console.log('retour');
    };
  
  

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
            <Icon name={"arrowleft"} size={30} color="#219EBC" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listeBtn} onPress={() => navigation.navigate('ListToilet', {toiletData: toiletData})}>
            <Text style={styles.ButtonList}>Voir en liste</Text>
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
  listeBtn: {
    backgroundColor: '#219EBC',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 70,
    left: '50%',
    display: 'flex',
    marginLeft: -120 / 2,
  },
  ButtonList: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    width: 100,
  },
  retourIconContainer: {
    position: 'absolute',
    top: 30,
    left: 30,
  },
});

export default MapScreen;
