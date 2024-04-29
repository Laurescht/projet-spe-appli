import { auth } from "../../FirebaseConfig";
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
// import {BlurView} from "@react-native-community/blur";

const Login = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const navigation = useNavigation();
  const [isKeyboardOpen, setKeyboardOpen] = useState(false);

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
      console.log(response);
      console.log({ email });

      navigation.navigate("Search", { email });
    } catch (error) {
      console.log(error);
      alert("La connexion a échoué : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      alert("Consultez vos mails !");

      navigation.navigate("Search", { email });
    } catch (error) {
      console.log(error);
      alert("L'inscription a échoué : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode((prevAuthMode) =>
      prevAuthMode === "login" ? "signup" : "login"
    );
    console.log(authMode);
  };

  const navigateToHome = () => {
    navigation.navigate("Home");
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
