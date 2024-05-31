import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ImageBackground,
  ScrollView,
  Image,
  Platform,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import Btn from "../components/Btn";
import { useUser } from "../../UserContext";

const ListToilet = ({ route, navigation: { goBack, navigate } }) => {
  const { user } = useUser();
  const { toiletData } = route.params;
  const [toiletCount, setToiletCount] = useState(0);
  const search = () => {
    navigate('Search');
  };
  const [filters, setFilters] = useState({
    babyZone: false,
    disabledAccess: false,
    squatToilets: false,
    free: false,
  });

  // const handleToiletPress = (toilet) => {
  //   navigation.navigate('ToiletDetails', { toilet }); // Navigate to ToiletDetails page with toilet data
  // };

  const [modalVisible, setModalVisible] = useState(false);

  const [babyZoneChecked, setBabyZoneChecked] = useState(false);
  const [squatToiletsChecked, setSquatToiletsChecked] = useState(false);
  const [disabledAccessChecked, setDisabledAccessChecked] = useState(false);
  const [freeChecked, setFreeChecked] = useState(false);

  const handleBabyZoneToggle = () => {
    setBabyZoneChecked(!babyZoneChecked);
  };

  const handleSquatToiletsToggle = () => {
    setSquatToiletsChecked(!squatToiletsChecked);
  };

  const handleDisabledAccessToggle = () => {
    setDisabledAccessChecked(!disabledAccessChecked);
  };

  const handleFreeToggle = () => {
    setFreeChecked(!freeChecked);
  };

  const filtersAreActive = Object.values(filters).some((value) => value);

  const handleFilterToggle = (filterKey) => {
    setFilters({ ...filters, [filterKey]: !filters[filterKey] });
  };

  const filteredToiletData = filtersAreActive
    ? toiletData.filter((toilet) =>
        Object.entries(filters).every(
          ([key, value]) => value === false || toilet[key] === value
        )
      )
    : toiletData;

  useEffect(() => {
    let newToiletCount = Object.values(filteredToiletData).length;
    setToiletCount(newToiletCount);
  }, [filteredToiletData]);

  const getFilterIconName = (filterKey) => {
    switch (filterKey) {
      case "babyZone":
        return require("../../assets/zone-bebe.png");
      case "squatToilets":
        return require("../../assets/toilettes-turque.png");
      case "disabledAccess":
        return require("../../assets/handicape.png");
      case "free":
        return require("../../assets/gratuit.png");
      // Ajoutez d'autres cas selon vos filtres
      default:
        return null; // Image générique ou une image par défaut
    }
  };


  const renderToiletItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigate("ToiletDetails", { toilet: item })}
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
              width: "100%",
              height: 93,
              justifyContent: "space-between",
              alignItems: "flex-start",
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <FontAwesome name="map-marker" size={16} color="#219ebc" />
              <Text
                style={{
                  color: "#000000",
                  fontSize: 12,
                  marginLeft: 5,
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </Text>
            </View>

            <View>
              <Text style={{ color: "#000000", fontSize: 12 }}>
                {item.adress}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesome
                  key={star}
                  name={star <= item.rating ? "star" : "star-o"}
                  size={12}
                  color="#FFD700"
                />
              ))}
              <Text style={{ color: "#FFD700", marginLeft: 5, fontSize: 12 }}>
                {item.rating.toFixed(1)}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View
        style={{
          backgroundColor: "#219EBC",
          padding: 10,
          borderRadius: 10,
          marginBottom: 25,
          height: 160,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TouchableOpacity style={styles.retourIconContainer} onPress={search}>
          <FontAwesome name="arrow-left" size={25} color="#fff" marginTop={15}/>
          </TouchableOpacity>
        <Btn
          btnAction={goBack}
          btnText="Voir sur la carte"
          btnStyle={{ backgroundColor: "#ffb703", top: 10 }}
        />

        <Text
          style={{
            color: "#FFFFFF",
            fontWeight: "bold",
            marginTop: 15,
            marginBottom: 10,
            fontSize: 20,
          }}
        >
          Sanitaires à proximité :
        </Text>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginLeft: 25,
          marginRight: 25,
          marginBottom: 25,
        }}
      >
        <View>
          <Text
            style={{
              color: "#000000",
              fontSize: 18,
              fontWeight: "bold",
            }}
          >
            Sanitaires trouvés : {toiletCount}
          </Text>
        </View>
        {/* Bouton pour ouvrir la modale */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <FontAwesome5 name="filter" size={24} color="#000" light />
        </TouchableOpacity>
      </View>

      {/* Modale des filtres */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Contenu de la modale des filtres */}
            <View>
              <Text
                style={{
                  color: "#000000",
                  fontSize: 15,
                  fontWeight: "bold",
                  marginLeft: 10,
                }}
              >
                Filtres :
              </Text>
              <TouchableOpacity
                onPress={() => {
                  handleBabyZoneToggle();
                  handleFilterToggle("babyZone");
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  marginBottom: 20,
                  marginTop: 20,
                }}
              >
                <FontAwesome5
                  name={babyZoneChecked ? "check-square" : "square"}
                  size={24}
                  color="#219EBC"
                />
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderWidth: 2,
                    borderColor: "#219EBC",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/zone-bebe.png")}
                    style={{ width: 35, height: 35 }}
                  />
                </View>
                <Text>Zone pour bébés</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleSquatToiletsToggle();
                  handleFilterToggle("squatToilets");
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <FontAwesome5
                  name={squatToiletsChecked ? "check-square" : "square"}
                  size={24}
                  color="#219EBC"
                />
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderWidth: 2,
                    borderColor: "#219EBC",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/toilettes-turque.png")}
                    style={{ width: 35, height: 35 }}
                  />
                </View>
                <Text>Toilettes Turque</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleDisabledAccessToggle();
                  handleFilterToggle("disabledAccess");
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <FontAwesome5
                  name={disabledAccessChecked ? "check-square" : "square"}
                  size={24}
                  color="#219EBC"
                />
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderWidth: 2,
                    borderColor: "#219EBC",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/handicape.png")}
                    style={{ width: 35, height: 35 }}
                  />
                </View>
                <Text>Accès handicapé</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleFreeToggle();
                  handleFilterToggle("free");
                }}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <FontAwesome5
                  name={freeChecked ? "check-square" : "square"}
                  size={24}
                  color="#219EBC"
                />
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderWidth: 2,
                    borderColor: "#219EBC",
                    borderRadius: 5,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/gratuit.png")}
                    style={{ width: 35, height: 35 }}
                  />
                </View>
                <Text>Gratuit</Text>
              </TouchableOpacity>
            </View>
            <Btn
              btnAction={() => setModalVisible(!modalVisible)}
              btnText="Enregistrer ma sélection"
              btnStyle={{ backgroundColor: "#219EBC" }}
            />
          </View>
        </View>
      </Modal>
        <View style={{flex: 1}}>
          <FlatList
            data={filteredToiletData}
            keyExtractor={(item) => item.name}
            renderItem={renderToiletItem}
          />
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
    position: "absolute",
    top: 30,
    left: 30,
  },
  cardList: {
    backgroundColor: "red",
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 10,
  },
});

export default ListToilet;
