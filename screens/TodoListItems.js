import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { TokenContext } from '../Contexte/Context';
import { createTodo, getTodos, deleteTodo, updateTodo } from '../utils/todo';
import TodoList from '../components/TodoList';

export default function TodoListItems({ route }) {
    const { todoListId } = route.params;
    const [token] = useContext(TokenContext);
    const [items, setItems] = useState([]);
    const [newTodoText, setNewTodoText] = useState('');
    const [doneCount, setDoneCount] = useState(0); // Suivi des tâches 

    useEffect(() => {
        const fetchItems = async () => {
            const todoListItems = await getTodos(todoListId, token);
            setItems(todoListItems);
            const completedTasks = todoListItems.filter(item => item.done).length; // On calcule le count initial
            setDoneCount(completedTasks);
        };
        fetchItems();
    }, [todoListId, token]);

    // Définition de la fonction addTodo
    const addTodo = async () => {
        try {
            const newTodo = await createTodo(newTodoText, todoListId, token);
            setItems((prevItems) => {
                const updatedItems = [
                    ...prevItems,
                    { id: newTodo.id, title: newTodo.title, content: newTodo.content, done: false },
                ];
                const completedTasks = updatedItems.filter(item => item.done).length; // Update du count
                setDoneCount(completedTasks);
                return updatedItems;
            });
            setNewTodoText('');
        } catch (e) {
            console.error('Erreur en ajoutant l\'item', e);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            const nodesDeleted = await deleteTodo(id, token);
            if (nodesDeleted > 0) {
                // Filtre
                const updatedItems = items.filter((item) => item.id !== id);
                setItems(updatedItems);
                const completedTasks = updatedItems.filter(item => item.done).length;
                setDoneCount(completedTasks);
            }
        } catch (e) {
            console.error('Erreur de suppression', e);
        }
    };

    const handleToggleDone = async (id) => {
        // Mise à jour de l'état local
        setItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item.id === id ? { ...item, done: !item.done } : item
            );
            const completedTasks = updatedItems.filter(item => item.done).length;
            setDoneCount(completedTasks);
            return updatedItems;
        });
    
        // Mise à jour dans la base de données
        const updatedItem = items.find(item => item.id === id);
        try {
            await updateTodo(id, !updatedItem.done, token);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'état de la tâche", error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Items de la todoLists</Text>
            <TodoList
                todos={items}
                onAddTodo={addTodo}
                onDeleteTodo={handleDeleteTodo}
                onToggleDone={handleToggleDone}
                newTodoText={newTodoText}
                setNewTodoText={setNewTodoText}
                doneCount={doneCount} // On passe le nombre total de tâches réalisées
                setDoneCount={setDoneCount} // Assurez-vous de passer setDoneCount ici
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
