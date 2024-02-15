import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ImageBackground,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ListToilet = ({ route, navigation: { goBack } }) => {
  console.log('ListToilet re-rendered');
  const search = () => {
    // navigation.navigate('Search');
  };

  const { toiletData } = route.params;

  const [filters, setFilters] = useState({
    babyZone: false,
    cleanliness: false,
    sinkAccess: false,
    disabledAccess: false,
    free: false,
  });

  const toggleFilter = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: !prevFilters[filter],
    }));
    console.log('Updated Filters:', filters);
  };

  const renderToiletItem = ({ item }) => {
    // Vérifier les filtres
    console.log('Filters:', filters);
    console.log('Toilet Data:', item);
    if (
      (filters.babyZone && !item.babyZone) ||
      (filters.cleanliness && !item.cleanliness) ||
      (filters.sinkAccess && !item.sinkAccess) ||
      (filters.disabledAccess && !item.disabledAccess) ||
      (filters.free && item.free)
    ) {
      console.log('Filtered out toilet:', item);
      // Ne pas afficher si les filtres ne correspondent pas
      return (
        <Text style={{ color: 'red' }}>
          Aucune toilette ne correspond aux filtres sélectionnés.
        </Text>
      );
    }

    return (
      <TouchableOpacity style={{ alignItems: 'center' }}>
        {/* Le reste de votre code pour afficher l'élément */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
      <View
        style={{
          backgroundColor: '#219EBC',
          padding: 10,
          borderRadius: 10,
          marginBottom: 25,
          height: 200,
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <TouchableOpacity style={styles.retourIconContainer} onPress={search}>
          <FontAwesome name="arrow-left" size={25} color="#ffffff" marginTop={15} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goBack()}>
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', width: 150, backgroundColor: '#ffb703', padding: 10, borderRadius: 20 }}>Voir sur la carte</Text>
        </TouchableOpacity>

        <Text style={{ color: '#FFFFFF', fontWeight: 'bold', marginTop: 15, marginBottom: 10, fontSize: 20 }}>Sanitaires à proximité :</Text>

        {/* Boutons de filtre */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
          <TouchableOpacity onPress={() => toggleFilter('babyZone')}>
            <Text>Bébé</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFilter('cleanliness')}>
            <Text>Propreté</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFilter('sinkAccess')}>
            <Text>Lavabo</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFilter('disabledAccess')}>
            <Text>Accès handicapé</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFilter('free')}>
            <Text>Gratuit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <FlatList data={toiletData} keyExtractor={(item) => item.id} renderItem={renderToiletItem} />
      </View>
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
  cardList: {
    backgroundColor: 'red',
    color: '#fff',
  },
});

export default ListToilet;
