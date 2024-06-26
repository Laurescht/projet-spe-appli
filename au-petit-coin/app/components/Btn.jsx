import { View, Text, TouchableOpacity, style } from "react-native";
import React from "react";
import { styles } from '../Styles/Connexion-InscriptionStyles';
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";


const Btn = ({btnAction, btnText, btnStyle}) => {

    const navigation = useNavigation();

    const handlePress = () => {
        if (typeof btnAction === 'function'){
          btnAction();
         
        }
        else if (typeof btnAction === 'string') {

          navigation.navigate(btnAction);
        }
        else if (typeof btnAction === 'object' && btnAction.routeName) {

          const { routeName, additionalProps } = btnAction;
          navigation.navigate(routeName, additionalProps);
        }
      };



  return (
    <TouchableOpacity
      style={[styles.button, styles.registerButton, btnStyle, style]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>{btnText}</Text>
    </TouchableOpacity>
  );
};

export default Btn;
