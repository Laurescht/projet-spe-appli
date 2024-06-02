import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ImageBackground,
  Image,
  Platform,
  Modal,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import Btn from "../components/Btn";
import FilterItem from "../components/FilterItem";
import ToiletItem from "../components/ToiletItem";
import { useUser } from "../../UserContext";

const ListToilet = ({ route, navigation: { goBack, navigate } }) => {
  const { user } = useUser();
  const { toiletData } = route.params;
  const [toiletCount, setToiletCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    babyZone: false,
    disabledAccess: false,
    squatToilets: false,
    free: false,
  });

  const toggleFilter = (filterKey) => {
    setFilters({ ...filters, [filterKey]: !filters[filterKey] });
  };

  const filteredToiletData = toiletData.filter((toilet) =>
    Object.entries(filters).every(
      ([key, value]) => value === false || toilet[key] === value
    )
  );

  useEffect(() => {
    setToiletCount(filteredToiletData.length);
  }, [filteredToiletData]);

  const renderToiletItem = ({ item }) => (
    <ToiletItem
      item={item}
      onPress={() => navigate("ToiletDetails", { toilet: item })}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backIconContainer} onPress={navigate}>
          <FontAwesome name="arrow-left" size={25} color="#fff" />
        </TouchableOpacity>
        <Btn
          btnAction={goBack}
          btnText="Voir sur la carte"
          btnStyle={{ backgroundColor: "#ffb703", top: 10 }}
        />
        <Text style={styles.headerText}>Sanitaires à proximité :</Text>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>
          Sanitaires trouvés : {toiletCount}
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <FontAwesome5 name="filter" size={24} color="#000" light />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.filterTitle}>Filtres :</Text>
            {Object.entries(filters).map(([key, value]) => (
              <FilterItem
                key={key}
                icon={key}
                checked={value}
                onPress={() => toggleFilter(key)}
              />
            ))}
            <Btn
              btnAction={() => setModalVisible(!modalVisible)}
              btnText="Enregistrer ma sélection"
              btnStyle={{ backgroundColor: "#219EBC" }}
            />
          </View>
        </View>
      </Modal>

      <FlatList
        data={filteredToiletData}
        keyExtractor={(item) => item.name}
        renderItem={renderToiletItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    backgroundColor: "#219EBC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 25,
    height: 160,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  backIconContainer: {
    position: "absolute",
    top: 30,
    left: 30,
  },
  headerText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
    fontSize: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 25,
    marginBottom: 25,
  },
  filterText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
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
  filterTitle: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ListToilet;