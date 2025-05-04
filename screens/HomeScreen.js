import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UsernameContext } from '../Contexte/Context';

export default function HomeScreen() {
  const [username] = useContext(UsernameContext);

  return (
    <View style={styles.container}>
      {/* Contenu principal */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Bienvenue !</Text>
        <Text style={styles.usernameText}>Vous êtes connecté à votre base de données de tâches, {username}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7', 
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30, 
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  usernameText: {
    fontSize: 18,
    color: '#fff',
  },
});
