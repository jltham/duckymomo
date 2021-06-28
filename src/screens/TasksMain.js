import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Keyboard, Pressable, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { deleteTransaction } from '../store/action/transactionActions';
import Screen from '../components/Screen';
import Logo from '../components/Logo';
import EmptyList from '../components/EmptyList';

function Task({ title, id }) {
    const dispatch = useDispatch();

    return (
        <View style={styles.tasks}>
            <View style={styles.taskContainer}>
                <TouchableOpacity>
                    <Image source={require("../../assets/check-icon.png")} style={styles.checked} />
                </TouchableOpacity>
                <Text> {title} </Text>
            </View>

            <TouchableOpacity style={styles.button}></TouchableOpacity>
        </View>
    )
}

export default ({navigation}) => {
    const {tasks} = useSelector((state) => state.tasks);
    
    return (
        <Screen style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <Logo />
            </TouchableOpacity>
            
            <Text> TO DO LIST </Text>

            <View style={styles.listContainer}>
                {tasks.length > 0 ? (
                    <FlatList 
                        // data={tasks.sort((a, b) => a.date.localeCompare(b.date))}
                        data={tasks}
                        renderItem={({item}) => (
                        <Task title={item.title} id={item.id} />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        style={styles.tasksList} 
                    />
                ) : (
                    <EmptyList />
                )}

                <TouchableOpacity onPress={() => navigation.navigate("Add Task")}>
                    <Image source={require("../../assets/add-list-icon.png")} />
                </TouchableOpacity>
            </View>

            <Image source={require("../../assets/ducklist.png")} style={styles.ducklist} />
        </Screen>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#000000",
        width: 30,
        height: 30,
        marginRight: 15
    },
    checked: {
        transform: [{scale: 0.6}],
    },
    container: {
        backgroundColor: '#fffdf1',
        flex: 1,
    },
    ducklist: {
        transform: [{ scale: 0.7}],
        position: 'absolute',
        bottom: 0 ,
        right: -43,
    },
    listContainer: {
        backgroundColor: "#e6e5e1",
        width: 370,
        height: 400,
        alignSelf: 'center'
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tasks: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})