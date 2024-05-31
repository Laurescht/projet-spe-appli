import { auth, FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Fond from "../../assets/Fond.png";
import { styles } from "../Styles/Connexion-InscriptionStyles";
import Btn from "../components/Btn";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useUser } from "../../UserContext";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../FirebaseConfig";
// import {BlurView} from "@react-native-community/blur";

const Login = ({ mode }) => {
  const { user, updateUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const navigation = useNavigation();
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);
  const auth = FIREBASE_AUTH;

  const getUserDetailsFromFirestore = async (uid) => {
    const userDoc = doc(firestore, "users", uid);

    try {
      const userDocSnapshot = await getDoc(userDoc);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        // Mise à jour du contexte utilisateur avec les détails récupérés
        updateUser({
          uid: uid,
          pseudo: userData.pseudo,
          email: email,
          imageURL: userData.imageURL || "",
        });
      } else {
        console.log("Le document utilisateur n'existe pas dans Firestore.");
      }
    } catch (error) {
      console.log(
        "Erreur lors de la récupération des détails utilisateur depuis Firestore:",
        error
      );
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleChangeLanguage = () => {
    console.log("Changer la langue");
  };

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      await getUserDetailsFromFirestore(response.user.uid);

      //navigation.navigate("Search", { email });
    } catch (error) {
      alert("La connexion a échoué : " + error.message);
    } finally {
      setLoading(false);
    }
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
            <Text style={styles.logoText}>Au p'tit coin</Text>
          </View>
          <TouchableOpacity
            style={styles.languageIconContainer}
            onPress={handleChangeLanguage}
          >
            <Icon name={"globe"} size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.titleText}>
              <Text style={styles.yellowText}>Je</Text>
              {"\n"}me connecte !
            </Text>
          </View>
          <TextInput
            value={email}
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#000000"
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            secureTextEntry={true}
            value={password}
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#000000"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
          />
          <Btn btnAction={signIn} btnText="Connexion" />
          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => navigation.navigate("Inscription")}
          >
            <Text style={styles.switchButtonText}>
              Pas encore inscrit ? S'inscrire
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
