import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import Fond from "../../assets/Fond.png";
import { FontAwesome } from "@expo/vector-icons";
import Btn from "../components/Btn";
import { useUser } from "../../UserContext";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const Profil = ({ route, navigation }) => {
  const { user } = useUser();
  const handleLogout = () => {
    FIREBASE_AUTH.signOut();
  };

  const search = () => {
    navigation.navigate("Search");
  };

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        style={{ flex: 1 }}
      >
        <View style={styles.topContainer}>
          <Image
            source={Fond}
            style={styles.backgroundImage}
            resizeMode="cover"
          />
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/Logo-Poopy.png")}
              style={styles.logo}
            />
            <Text style={styles.logoText}>Bienvenue {user.pseudo} !</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
      <View>
        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", marginBottom: 100 }}>
          <Btn
            btnAction={handleLogout}
            btnText="Déconnexion"
            btnStyle={{ backgroundColor: "#FFB703" }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.retourIconContainer} onPress={search}>
        <FontAwesome
          name="arrow-left"
          size={25}
          color="#ffffff"
          marginTop={15}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profilContainer: {
    alignItems: "center",
  },
  topContainer: {
    justifyContent: "center",
    top: 50,
    width: "100%",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    color: "#FFB703",
    marginTop: 5,
    fontSize: 40,
    fontWeight: "bold",
  },
  logo: {
    width: 250,
    height: 150,
    resizeMode: "contain",
  },
  retourIconContainer: {
    position: "absolute",
    top: 30,
    left: 30,
  },
  btnDeco: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Profil;