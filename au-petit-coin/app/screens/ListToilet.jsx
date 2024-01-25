import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList, StatusBar } from 'react-native';

const ListToilet = ({route, navigation: {goBack} }) => {

    const {toiletData}=route.params;
    const renderToiletItem = ({ item }) => (
        <View>
            <Text style={styles.cardList}>{item.name}</Text>
        </View>
    );

    return (
      <View style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        justifyContent: "center",
      }}>
        <TouchableOpacity style={styles.listeBtn} onPress={() => goBack()}>
            <Text style={styles.ButtonList}>Voir sur la carte</Text>
          </TouchableOpacity>
            <View>
                <FlatList
                    data={toiletData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderToiletItem}
                />
            </View>
      </View>
    )
}

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
      marginLeft: -150 / 2,  
    },
    ButtonList: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      width: 130,
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