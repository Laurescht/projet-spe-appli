import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const FilterItem = ({ icon, checked, onPress }) => {
  const iconSource = getFilterIconSource(icon);

  return (
    <TouchableOpacity onPress={onPress} style={styles.filterItem}>
      <FontAwesome5
        name={checked ? "check-square" : "square"}
        size={24}
        color="#219EBC"
      />
      <View style={styles.iconContainer}>
        <Image source={iconSource} style={styles.filterIcon} />
      </View>
      <Text>{getFilterLabel(icon)}</Text>
    </TouchableOpacity>
  );
};

const getFilterIconSource = (icon) => {
  switch (icon) {
    case "babyZone":
      return require("../../assets/zone-bebe.png");
    case "squatToilets":
      return require("../../assets/toilettes-turque.png");
    case "disabledAccess":
      return require("../../assets/handicape.png");
    case "free":
      return require("../../assets/gratuit.png");
    default:
      return null;
  }
};

const getFilterLabel = (icon) => {
  switch (icon) {
    case "babyZone":
      return "Zone pour bébés";
    case "squatToilets":
      return "Toilettes Turque";
    case "disabledAccess":
      return "Accès handicapé";
    case "free":
      return "Gratuit";
    default:
      return "";
  }
};

const styles = StyleSheet.create({
  filterItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: "#219EBC",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  filterIcon: {
    width: 35,
    height: 35,
  },
});

export default FilterItem;