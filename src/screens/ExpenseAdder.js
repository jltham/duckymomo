import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import {useDispatch} from 'react-redux';

import {addTransaction} from '../store/action/transactionActions';
import Screen from "../components/Screen";
import Logo from "../components/Logo";

export default ({navigation}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState();

    const onSubmit = () => {
        if (!title || !price) {
            return alert('Please fill all fields');
        }

        const id = Math.floor(Math.random() * 100000000);

        const newTransaction = {
            id,
            title,
            price: +(-1 * price),
            type,
        };

        dispatch(addTransaction({...newTransaction}));
        navigation.navigate("Transactions");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Screen style={styles.container}>
                    <TouchableOpacity onPress={() => navigation.navigate("Transactions")}>
                        <Logo />
                    </TouchableOpacity>

                    <Text style={styles.mainText}>What did you spend on?</Text>

                    <Picker
                    style={styles.picker}
                    selectedValue={type}
                    onValueChange={(itemValue, itemIndex) =>
                        setType(itemValue)
                    }>
                        <Picker.Item label="" value="" />
                        <Picker.Item label="Food" value="food" />
                        <Picker.Item label="Transport" value="transport" />
                        <Picker.Item label="Shopping" value='shopping' />
                        <Picker.Item label="Others" value='others' />
                    </Picker>

                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Title of Expenditure</Text>

                        <TextInput
                        label="Title of Expenditure"
                        placeholder="e.g. Shopping for clothes"
                        style={styles.input}
                        onChangeText={setTitle}
                        value={title} 
                        returnKeyType="next"
                        blurOnSubmit={false} />
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={styles.title}>Price of Expenditure</Text>

                        <TextInput
                        keyboardType='number-pad'
                        label="Price of Expenditure"
                        placeholder="e.g. $29.99"
                        style={styles.input}
                        onChangeText={setPrice}
                        value={price} 
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
    picker: {
        marginTop: -45,
        height: 200,
        width: 200
    },
    title: {
        fontSize: 15,
    },
})