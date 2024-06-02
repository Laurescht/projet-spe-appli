import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const CommentItem = ({ item }) => {
  const formatDate = (timestamp) => {
    const now = new Date();
    const diffInMs = now - new Date(timestamp);
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return `il y a ${diffInSeconds} secondes`;
    } else if (diffInMinutes < 60) {
      return `il y a ${diffInMinutes} minutes`;
    } else if (diffInHours < 24) {
      return `il y a ${diffInHours} heures`;
    } else {
      return `il y a ${diffInDays} jours`;
    }
  };

  const formattedDate = formatDate(item.timestamp?.toDate());

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{item.pseudo}</Text>
        <Text>{formattedDate}</Text>
      </View>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFEEC6",
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  username: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  content: {
    fontSize: 14,
  },
});

export default CommentItem;