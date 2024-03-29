import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList, StatusBar, ImageBackground, ScrollView, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';



const ListToilet = ({route, navigation: {goBack} }) => {

    const search = () => {
      // navigation.navigate('Search');
    };
    const {toiletData} = route.params;
    const [toiletCount, setToiletCount] = useState(0);
    const [filters, setFilters] = useState({
          babyZone: false,
          sinkAccess: false,
          squatToilets: false,
          free: false,
        });

        const filtersAreActive = Object.values(filters).some(value => value);
        
        const handleFilterToggle = (filterKey) => {
          setFilters({ ...filters, [filterKey]: !filters[filterKey] });
        };

    const filteredToiletData = filtersAreActive
    ? toiletData.filter(toilet =>
        Object.entries(filters).every(([key, value]) => value === false || toilet[key] === value)
      )
    : toiletData;

    useEffect(() => {
      let newToiletCount = Object.values(filteredToiletData).length;
      setToiletCount(newToiletCount);
    }, [filteredToiletData])
    
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
            flex: 1,
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
                justifyContent: "space-between",
                alignItems: 'flex-start',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                padding: 10,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <FontAwesome name="map-marker" size={16} color="#219ebc" />
                <Text style={{ color: '#000000', fontSize: 12, marginLeft: 5, textTransform: 'uppercase', fontWeight: 'bold' }}>
                  {item.name}
                </Text>
              </View>
    
              <View>
                <Text style={{ color: "#000000", fontSize: 12 }}>
                  {item.adress}
                </Text>
              </View>
    
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
        <View style={{ backgroundColor: '#219EBC', padding: 10, borderRadius: 10, marginBottom: 25, height: 160, alignItems: 'center', justifyContent: 'flex-end', }}>
        <TouchableOpacity style={styles.retourIconContainer} onPress={search}>
          <FontAwesome name="arrow-left" size={25} color="#ffffff" marginTop={15}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ color: '#FFFFFF', fontWeight: 'bold', width: 150, backgroundColor: '#ffb703', padding: 10, borderRadius: 20, }}>Voir sur la carte</Text>
          </TouchableOpacity>

          <Text style={{ color: '#FFFFFF', fontWeight: 'bold', marginTop: 15, marginBottom : 10, fontSize: 20, }}>Sanitaires à proximité :</Text>
          
        </View>

        <Text style={{ color: '#000000', fontSize: 18, fontWeight: 'bold', marginLeft: 10 }}>
        Sanitaires trouvés : {toiletCount}
        </Text>

        <View>
            <TouchableOpacity>
            <Text onPress={() => handleFilterToggle('babyZone')}> Zone pour bébés </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text onPress={() => handleFilterToggle('squatToilets')}> Toilettes turque </Text>
          </TouchableOpacity> 
          <TouchableOpacity>
            <Text onPress={() => handleFilterToggle('disabledAccess')}> Accès handicapé </Text>
          </TouchableOpacity> 
          <TouchableOpacity>
            <Text onPress={() => handleFilterToggle('free')}> Gratuit </Text>
          </TouchableOpacity> 
        </View>
    
        <ScrollView>
          

      {/* Afficher les résultats filtrés */}
      <FlatList
        data= {filteredToiletData}
        keyExtractor={(item) => item.name}
        renderItem={renderToiletItem}
      />
        </ScrollView>
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