import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFFFFF',
    },
    topContainer: {
      justifyContent: 'center',
      top: 50,
      width: '100%',
    },
    backgroundImage: {
      position: 'absolute',
      width: '100%'
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 20,
      zIndex: 1,
    },
    logoText: {
      color: '#FFB703',
      marginTop: 5,
      fontSize: 40,
      fontWeight: 'bold',
    },
    logo: {
      width: 250,
      height: 150,
      resizeMode: 'contain',
    },
    bottomContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      paddingHorizontal: 30,
    },
    textContainer: {
      alignSelf: 'flex-start',
    },
    titleText: {
      color: '#000000',
      fontSize: 30,
      marginBottom: 20,
      textAlign: 'left',
      fontWeight: 'bold',
    },
    yellowText: {
      color: '#FFB703',
      fontWeight: 'bold',
    },
    input: {
      marginTop: 10,
      marginVertical: 4,
      height: 50,
      borderRadius: 4,
      padding: 10,
      backgroundColor: 'rgba(196, 196, 196, 0.2)',
      width: '100%',
      color: '#000000',
    },
    buttonText: {
      color: "#FFFFFF",
      fontWeight: 'bold',
    },
    registerButton: {
      backgroundColor: '#219EBC',
      borderRadius: 50,
      width: 250,
      height: 50,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      elevation: 4,
    },
    switchButton: {
      marginTop: 10,
      alignItems: 'center',
    },
    switchButtonText: {
      color: '#000000',
      fontSize: 16,
    },
    languageIconContainer: {
      position: 'absolute',
      top : 0,
      left: 30,
    },
  });