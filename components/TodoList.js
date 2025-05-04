import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Text, FlatList, TouchableOpacity } from 'react-native';
import TodoItem from './TodoItem';

export default function TodoList({
    todos,
    onAddTodo,
    onDeleteTodo,
    onToggleDone,
    newTodoText,
    setNewTodoText,
    doneCount,
    setDoneCount,
}) {
    const [filter, setFilter] = useState('all');
    const [filteredTodos, setFilteredTodos] = useState([]);

    useEffect(() => {
        setFilteredTodos(
            todos.filter((item) => {
                if (filter === 'active') return !item.done;
                if (filter === 'done') return item.done;
                return true;
            })
        );
    }, [todos, filter]);

    const exportForWeb = (data, format) => {
        // Creation d'un blob pour stocker les données en brut
        const blob = new Blob([data], { type: format });
        // url temporaire pour stocker le blob
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `todo-list.${format === 'application/json' ? 'json' : 'txt'}`;
        document.body.appendChild(a);
        // Simule le click pour démarrer le dl
        a.click();
        document.body.removeChild(a);
        // Enleve le lien au blob
        URL.revokeObjectURL(url);
    };

    const exportList = (format) => {
        // Vérifie les tâches
        if (!todos || todos.length === 0) {
            alert('Aucune tâche à exporter !');
            return;
        }
        
        //On récupère les infos du navigateur
        const userAgent = navigator.userAgent;
        // On regarde quel sorte de navigateur
        const isWeb = userAgent.includes('Mozilla') && !userAgent.includes('Mobile');


        switch (format) {
            case 'json':
                // Conversion en JSON
                const jsonOutput = JSON.stringify(todos, null, 2);
                if (isWeb) {
                    exportForWeb(jsonOutput, 'application/json');
                }
                break;

            case 'text':
                const textOutput = todos
                    .map((todo, index) => `${index + 1}. ${todo.content} [${todo.done ? 'fait' : 'non fait'}]`)
                    .join('\n');
                if (isWeb) {
                    exportForWeb(textOutput, 'text/plain');
                }
                break;
        }
    };

    const totalTasks = todos.length;

    const updateDoneCount = (updatedTodos) => {
        const count = updatedTodos.filter((todo) => todo.done).length;
        if (setDoneCount) {
            setDoneCount(count);
        }
    };

    const progress = totalTasks > 0 ? (doneCount / totalTasks) * 100 : 0;

    return (
        <View style={styles.container}>
            <TextInput
                onChangeText={setNewTodoText}
                placeholder="Ajouter une nouvelle tâche"
                value={newTodoText}
                style={styles.input}
            />
            {/* Bouton d'ajout */ }
            <TouchableOpacity style={styles.addButton} onPress={onAddTodo}>
                <Text style={styles.addButtonText}>Ajouter</Text>
            </TouchableOpacity>
            <Text style={styles.statsText}>
                Tâches complétées : {doneCount} / {totalTasks} | Progression : {Math.round(progress)}%
            </Text>
            {/* Barre de progression */ }
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            {/* Boutons de filtre */ }
            <View style={styles.filterButtons}>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
                    onPress={() => setFilter('all')}
                >
                    <Text style={styles.filterButtonText}>Toutes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'active' && styles.activeFilter]}
                    onPress={() => setFilter('active')}
                >
                    <Text style={styles.filterButtonText}>En cours</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.filterButton, filter === 'done' && styles.activeFilter]}
                    onPress={() => setFilter('done')}
                >
                    <Text style={styles.filterButtonText}>Complétées</Text>
                </TouchableOpacity>
            </View>
            {/* Boutons d'exportation */}
            <View style={styles.exportButtons}>
                <TouchableOpacity style={styles.exportButton} onPress={() => exportList('json')}>
                    <Text style={styles.exportButtonText}>Exporter JSON</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.exportButton} onPress={() => exportList('text')}>
                    <Text style={styles.exportButtonText}>Exporter Texte</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={filteredTodos}
                renderItem={({ item }) => (
                    <TodoItem
                        item={item}
                        onDelete={() => onDeleteTodo(item.id)}
                        onToggleDone={() => onToggleDone(item.id)}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
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
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#76c7c0',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 15,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    statsText: {
        marginVertical: 6,
        fontSize: 16,
        color: '#333',
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        marginBottom: 20,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#76c7c0',
        borderRadius: 10,
    },
    filterButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    filterButton: {
        backgroundColor: '#76c7c0',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    filterButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    exportButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    exportButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 10,
        flex: 1,
        marginHorizontal: 5,
    },
    exportButtonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    actionButton: {
        backgroundColor: '#FF6347',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
    },
});
