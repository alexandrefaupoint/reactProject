import React, { useContext, useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { TokenContext, UsernameContext } from '../Contexte/Context';
import { getTodoLists, createTodoList, deleteTodoList } from '../utils/todoLists';
import Input from '../components/UI/Input';
import { Ionicons } from '@expo/vector-icons';

export default function TodoListsScreen() {
  const [token] = useContext(TokenContext);
  const [username] = useContext(UsernameContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todoLists, setTodoLists] = useState([]);
  const navigation = useNavigation();

  const fetchTodoLists = async () => {
    try {
      const lists = await getTodoLists(username, token);
      setTodoLists(lists);
    } catch (err) {
      console.error('Erreur lors de la récupération des TodoLists', err);
    }
  };

  const handleCreateTodoList = async (title) => {
    setLoading(true);
    setError(null);

    try {
      await createTodoList(username, title, token);
      fetchTodoLists();
    } catch (err) {
      setError('Erreur lors de la création de la TodoList');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodoList = async (id) => {
    try {
      const deletedCount = await deleteTodoList(id, token);
      if (deletedCount > 0) {
        setTodoLists((prevTodoLists) =>
          prevTodoLists.filter((todo) => todo.id !== id)
        );
      } else {
        setError("Impossible de supprimer la TodoList");
      }
    } catch (err) {
      setError("Erreur lors de la suppression de la TodoList");
      console.error("Erreur API lors de la suppression", err);
    }
  };

  useEffect(() => {
    fetchTodoLists();
  }, [username, token]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mes TodoLists</Text>

      <Input
        onSubmit={handleCreateTodoList}
        loading={loading}
        error={error}
        placeholder="Entrez le titre de la nouvelle TodoList"
      />

      <FlatList
        data={todoLists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoListContainer}>
            <Text style={styles.todoListTitle} numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </Text>
            <Ionicons
              name="trash-outline"
              size={24}
              color="red"
              onPress={() => handleDeleteTodoList(item.id)}
              style={styles.deleteIcon}
            />
            <TouchableOpacity
              style={styles.viewItemsButton}
              onPress={() => navigation.navigate('TodoListItems', { todoListId: item.id })}
            >
              <Text style={styles.viewItemsText}>Voir les items</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  todoListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    flexWrap: 'wrap', 
  },
  todoListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    maxWidth: '70%',
  },
  deleteIcon: {
    marginLeft: 10,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  viewItemsButton: {
    backgroundColor: '#76c7c0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    marginLeft: 10,
  },
  viewItemsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
