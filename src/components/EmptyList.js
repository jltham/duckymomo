import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default () => {
    return (
        <View style={styles.container}>
            <Text style={styles.emptyText}>No task recorded yet!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e6e5e1',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        color: "#9b9c92"
    }
})