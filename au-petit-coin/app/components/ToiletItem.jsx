import React from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ToiletItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <View style={styles.imageContainer}>
      <ImageBackground
        source={{ uri: item.image }}
        imageStyle={{ borderRadius: 10 }}
        style={styles.image}
      >
        <View style={styles.detailsContainer}>
          <View style={styles.locationContainer}>
            <FontAwesome name="map-marker" size={16} color="#219ebc" />
            <Text style={styles.locationText}>{item.name}</Text>
          </View>
          <Text style={styles.addressText}>{item.address}</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesome
                key={star}
                name={star <= item.rating ? "star" : "star-o"}
                size={12}
                color="#FFD700"
              />
            ))}
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 30,
  },
  imageContainer: {
    overflow: "hidden",
    width: 344,
    height: 243,
    flex: 1,
  },
  image: {
    resizeMode: "cover",
    overflow: "hidden",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
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
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  locationText: {
    color: "#000000",
    fontSize: 12,
    marginLeft: 5,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  addressText: {
    color: "#000000",
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    color: "#FFD700",
    marginLeft: 5,
    fontSize: 12,
  },
});

export default ToiletItem;