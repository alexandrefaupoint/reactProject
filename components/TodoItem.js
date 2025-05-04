import React, { useState, useEffect } from "react";
import { Image, View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

export default function TodoItem({ item, onDelete, onToggleDone }) {
    //C'est calculé qu'une seule fois 
    const [done, setDone] = useState(item.done);
    
    
    // Permet de recalculer l'état done
    useEffect(() => setDone(item.done), [item.done])

    const handleToggle = () => {
        setDone(!done);
        onToggleDone(item.id);
    };
    

    return (
        <View style={styles.content}>
            <Switch value={done} onValueChange={handleToggle} />
            <Text style={[styles.text_item, { textDecorationLine: done ? 'line-through' : 'none' }]}>
                {item.content}
            </Text>
            <TouchableOpacity onPress={() => onDelete(item.id)}>
                <Image source={require('../assets/trash-can-outline.png')} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row'
    },
    text_item: {
        marginLeft: 10,
        width: 150
    },
    icon: {
        width: 24,
        height: 24,
    }
})