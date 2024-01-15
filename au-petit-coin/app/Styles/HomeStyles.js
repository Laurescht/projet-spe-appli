import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    color: '#FFB703',
    marginTop: 10,
    fontSize: 40,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 50,
    flexDirection: 'row',
  },
  logo: {
    width: 250,
    height: 150,
    resizeMode: 'contain',
  },
  loginButton: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    width: 150,
    height: 70,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    width: 150,
    height: 70,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchButton: {
    margin: 10,
    alignItems: 'center',
  },
  switchButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFB703',
    fontWeight: 'bold',
  },
});