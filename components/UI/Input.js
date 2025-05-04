import React, { useState } from 'react';
import { TextInput, Button, View, Text } from 'react-native';

const Input = ({ onSubmit, loading, error, placeholder }) => {
  const [title, setTitle] = useState('');

  // Gestion du changement de valeur dans le champ de texte
  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  // Soumission du formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() !== '') {
      onSubmit(title);
      setTitle(''); // Réinitialise l'input après la soumission
    }
  };

  return (
    <View>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder={placeholder || "Entrez un titre de TodoList..."}
        disabled={loading}
        style={{ borderColor: '#ccc', borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button
        title={loading ? 'Chargement...' : 'Soumettre'}
        onPress={handleSubmit}
        disabled={loading || title.trim() === ''}
      />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
};

export default Input;