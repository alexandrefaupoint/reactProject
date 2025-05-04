import React, { useContext } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { TokenContext } from '../Contexte/Context';

export default function SignOutScreen() {
  const [, setToken] = useContext(TokenContext);

  const handleSignOut = () => {
    setToken(null); // Déconnexion
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Déconnexion</Text>
      <Text style={styles.message}>Vous êtes sur le point de vous déconnecter.</Text>
      <Button title="Se déconnecter" onPress={handleSignOut} color="#76c7c0" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7', 
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
});
