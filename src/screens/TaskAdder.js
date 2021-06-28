import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';

import { addTransaction } from '../store/action/transactionActions';
import Screen from "../components/Screen";
import Logo from "../components/Logo";

export default ({navigation}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');

    const onSubmit = () => {
        if (!title) {
            return alert('Please fill all fields');
        }

        const id = Math.floor(Math.random() * 100000000);

        const newTask = {
            id,
            title,
            price
        };

        dispatch(addTask({...newTask}));
        navigation.navigate("To Do List");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Screen style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.navigate("To Do List")}>
                        <Logo />
                    </TouchableOpacity>

                    <Text style={styles.mainText}>What you want to be reminded of?</Text>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Title of task</Text>

                        <TextInput
                        label="Title of Expenditure"
                        placeholder="e.g. Submission of Milestone 2"
                        style={styles.input}
                        onChangeText={setTitle}
                        value={title} 
                        returnKeyType="next"
                        blurOnSubmit={false} />
                    </View>

                    <TouchableOpacity 
                        onPress={onSubmit} 
                        style={styles.submit}>
                        <Text>Submit!</Text>
                    </TouchableOpacity>
            </Screen>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffdf1',
        flex: 1,
        alignItems: 'center',
    },
    input: {
        backgroundColor: "#e1e1e1",
        height: 40,
        width: 320,
        borderWidth: 1,
        borderColor: "#d0d0d0",
        marginBottom: 20
    },
    mainText: {
        fontSize: 30,
        marginBottom:30
    },
    title: {
        fontSize: 15,
    },
})