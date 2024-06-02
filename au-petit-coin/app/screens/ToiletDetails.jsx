import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { firestore } from "../../FirebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  getDocs,
  query,
} from "firebase/firestore";
import { useUser } from "../../UserContext";
import { MaterialIcons } from "@expo/vector-icons";
import CommentItem from "../components/CommentItem";
import FilterIcon from "../components/FilterIcon";

const ToiletDetails = ({ route, navigation }) => {
  const { toilet } = route.params;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { user } = useUser();
  const collectionRef = collection(
    firestore,
    "toilettes",
    toilet.id,
    "comments"
  );

  const getComments = async () => {
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    try {
      const collectionDoc = await getDocs(q);
      const data = [];
      collectionDoc.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  const addComment = async () => {
    if (comment.trim() === "") return;

    const newComment = {
      userId: user?.uid,
      pseudo: user.pseudo,
      content: comment,
      timestamp: new Date(),
    };

    try {
      await addDoc(collectionRef, newComment);
      setComments((prevComments) => [newComment, ...prevComments]);
      setComment("");
      Keyboard.dismiss();
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
    >
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <View style={styles.backButtonCircle}>
            <FontAwesome name="arrow-left" size={24} color="#FFF" />
          </View>
        </TouchableOpacity>
        <ImageBackground
          source={{ uri: toilet.image }}
          style={styles.toiletImage}
        >
          <Text style={styles.toiletName}>{toilet.name}</Text>
        </ImageBackground>

        <View style={[styles.filtersContainer, { backgroundColor: "#FFEEC6", padding: 20, height: 100 }]}>
          {toilet.babyZone && <FilterIcon iconSource={require("../../assets/zone-bebe.png")} />}
          {toilet.squatToilets && <FilterIcon iconSource={require("../../assets/toilettes-turque.png")} />}
          {toilet.disabledAccess && <FilterIcon iconSource={require("../../assets/handicape.png")} />}
          {toilet.free && <FilterIcon iconSource={require("../../assets/gratuit.png")} />}
        </View>

        <View style={styles.infoContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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

        {comments.length > 0 ? (
          <View style={{ paddingHorizontal: 20, flex: 1, marginTop: 20 }}>
            <Text style={{ fontWeight: "bold", marginBottom: 15 }}>Avis :</Text>

            <FlatList
              data={comments}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CommentItem item={item} />}
            />
          </View>
        ) : (
          <View style={{ alignItems:'center', justifyContent:'center', flex:1 }}>
            <Text style={{ textAlign: "center" }}>Soit le premier à ajouter un commentaire...</Text>
          </View>
        )}
      </View>
      <View style={styles.commentInputContainer}>
        <TextInput
          placeholder="Ajouter un commentaire..."
          value={comment}
          onChangeText={setComment}
          style={styles.commentInput}
        />
        <TouchableOpacity onPress={addComment} style={styles.sendButton}>
          <MaterialIcons name="send" size={24} color="#219ebc" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    color: "#FFF",
    padding: 8,
    borderRadius: 5,
    fontWeight: "bold",
    fontSize: 18,
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
    gap : 20,
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
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#FFEEC6",
    padding: 5,
  },
  commentInput: {
    flex: 1,
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
  },
});

export default ToiletDetails;