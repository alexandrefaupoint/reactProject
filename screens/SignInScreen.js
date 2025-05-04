import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { signIn } from '../utils/sign';
import { TokenContext, UsernameContext } from '../Contexte/Context'; // Pour sauvegarder les informations après l'inscription

export default function SignInScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useContext(TokenContext);
  const [usernameContext, setUsernameContext] = useContext(UsernameContext);

  const handleSignIn = async () => {
    try {
      // Appelle la fonction signIn avec le nom d'utilisateur et le mot de passe
      const result = await signIn(username, password);
      setToken(result); // Sauvegarde le token retourné après l'inscription
      setUsernameContext(username); // Sauvegarde le nom d'utilisateur dans le contexte
    } catch (error) {
      Alert.alert('Erreur', error.message || 'Une erreur est survenue lors de la connexion.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Se connecter</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button title="Se connecter" onPress={handleSignIn} color="#76c7c0" />
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
    width: '80%', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
});
