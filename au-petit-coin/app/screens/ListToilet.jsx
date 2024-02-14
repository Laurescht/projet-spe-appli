import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList, StatusBar, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';



const ListToilet = ({route, navigation: {goBack} }) => {

    const search = () => {
      // navigation.navigate('Search');
    };

    const {toiletData}=route.params;
    const renderToiletItem = ({ item }) => (
      <TouchableOpacity
        style={{
          alignItems: "center",
        }}
      >
        <View
          key={item.id}
          style={{
            overflow: "hidden",
            width: 344,
            height: 243,
            marginBottom: 30,
          }}
        >
          <ImageBackground
            source={{ uri: item.image }}
            imageStyle={{ borderRadius: 10 }}
            style={{
              resizeMode: "cover",
              overflow: "hidden",
              flex: 1,
              width: "100%",
              height: "100%",
            }}
          >
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                backgroundColor: "#FFFF",
                width: '100%',
                height: 93,
                justifyContent: "space-between", // Utilisez 'space-between' pour répartir les éléments verticalement
                alignItems: 'flex-start',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                padding: 10,
              }}
            >
              {/* Conteneur pour le nom et l'icône de pin */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <FontAwesome name="map-marker" size={16} color="#219ebc" />
                <Text style={{ color: '#000000', fontSize: 12, marginLeft: 5, textTransform: 'uppercase', fontWeight: 'bold' }}>
                  {item.name}
                </Text>
              </View>
    
              {/* Conteneur pour l'adresse */}
              <View>
                <Text style={{ color: "#000000", fontSize: 12 }}>
                  {item.adress}
                </Text>
              </View>
    
              {/* Conteneur pour les étoiles et le filtre */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesome
                    key={star}
                    name={star <= item.rating ? 'star' : 'star-o'}
                    size={12}
                    color="#FFD700"
                  />
                ))}
                <Text style={{ color: '#FFD700', marginLeft: 5, fontSize: 12 }}>
                  {item.rating.toFixed(1)}
                </Text>
                <Text style={{ color: '#000000', marginLeft: 10, fontSize: 12 }}>Filtre</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
    
    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
        {/* Conteneur du bouton et du titre */}
        <View style={{ backgroundColor: '#219EBC', padding: 10, borderRadius: 10, marginBottom: 25, height: 160, alignItems: 'center', justifyContent: 'flex-end', }}>
        <TouchableOpacity style={styles.retourIconContainer} onPress={search}>
          <FontAwesome name="arrow-left" size={25} color="#ffffff" marginTop={15}/>
          </TouchableOpacity>
          {/* Bouton */}
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', width: 150, backgroundColor: '#ffb703', padding: 10, borderRadius: 20, }}>Voir sur la carte</Text>
          </TouchableOpacity>
    
          {/* Titre */}
          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', marginTop: 15, marginBottom : 10, fontSize: 20, }}>Sanitaires à proximité :</Text>
        </View>
    
        {/* Reste de votre contenu */}
        <View>
          <FlatList
            data={toiletData}
            keyExtractor={(item) => item.id}
            renderItem={renderToiletItem}
          />
        </View>
      </View>
    );    
}

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
    cardList:{
        backgroundColor: 'red',
        color: '#fff',
    },
  });

export default ListToilet