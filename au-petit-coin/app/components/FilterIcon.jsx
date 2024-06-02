import React from "react";
import { View, Image, StyleSheet } from "react-native";

const FilterIcon = ({ iconSource }) => {
  return (
    <View style={[styles.filterContainer, styles.activeFilter]}>
      <Image source={iconSource} style={styles.filterIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    width: 43,
    height: 43,
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
  },
  filterIcon: {
    width: 35,
    height: 35,
  },
  activeFilter: {
    borderColor: "#219EBC",
  },
});

export default FilterIcon;
