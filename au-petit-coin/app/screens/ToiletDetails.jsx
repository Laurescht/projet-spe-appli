import React from "react";
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ToiletDetails = ({ route }) => {
  const { toilet } = route.params;
  const navigation = useNavigation();

  return (
    <View style={{}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <View style={styles.backButtonCircle}>
          <FontAwesome name="arrow-left" size={24} color="#FFF" />
        </View>
      </TouchableOpacity>
      <ImageBackground source={{ uri: toilet.image }} style={styles.toiletImage}>
        <Text style={styles.toiletName}>{toilet.name}</Text>
      </ImageBackground>

      <View
        style={[
          styles.filtersContainer,
          { backgroundColor: "#FFEEC6", padding: 20, height: 100 },
        ]}
      >
        {toilet.babyZone && (
          <View style={[styles.filterContainer, styles.activeFilter]}>
            <Image
              source={require("../../assets/zone-bebe.png")}
              style={styles.filterIcon}
            />
          </View>
        )}

        {toilet.squatToilets && (
          <View style={[styles.filterContainer, styles.activeFilter]}>
            <Image
              source={require("../../assets/toilettes-turque.png")}
              style={styles.filterIcon}
            />
          </View>
        )}

        {toilet.disabledAccess && (
          <View style={[styles.filterContainer, styles.activeFilter]}>
            <Image
              source={require("../../assets/handicape.png")}
              style={styles.filterIcon}
            />
          </View>
        )}

        {toilet.free && (
          <View style={[styles.filterContainer, styles.activeFilter]}>
            <Image
              source={require("../../assets/gratuit.png")}
              style={styles.filterIcon}
            />
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <FontAwesome name="map-marker" size={16} color="#219ebc" />
          <Text style={styles.addressText}>{toilet.adress}</Text>
        </View>
        <View style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesome
              key={star}
              name={star <= toilet.rating ? "star" : "star-o"}
              size={12}
              color="#FFD700"
            />
          ))}
          <Text style={styles.ratingText}>{toilet.rating.toFixed(1)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toiletImage: {
    width: "100%",
    height: 300,
  },
  toiletName: {
    position: "absolute",
    textTransform: "uppercase",
    bottom: 20,
    left: 10,
    // backgroundColor: "rgba(33, 158, 188, 0.5)",
    color: "#FFF",
    padding: 8,
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: 18
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButtonCircle: {
    backgroundColor: "rgba(33, 158, 188, 0.5)",
    width: 40,
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  filtersContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    gap: 20,
  },
  filterContainer: {
    width: 43,
    height: 43,
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
  },
  activeFilter: {
    borderColor: "#219EBC",
  },
  filterIcon: {
    width: 35,
    height: 35,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  addressText: {
    color: "#767070",
    fontSize: 12,
    marginLeft: 5,
    fontWeight: "bold",
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: "#767070",
    marginLeft: 5,
    fontSize: 12,
  },
});

export default ToiletDetails;
