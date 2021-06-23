import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Keyboard, Pressable, FlatList } from 'react-native';
import {addTransaction} from '../store/action/transactionActions';
import {useDispatch} from 'react-redux';

import Screen from "../components/Screen";
import Logo from "../components/Logo";

export default ({navigation}) => {
    return (
        <Screen style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Transactions")}>
                    <Logo />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.expenseBox} onPress={() => navigation.navigate("Expense")}>
                <Text style={styles.expense} >I spent some bills!</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.incomeBox} onPress={() => navigation.navigate("Income")}>
                <Text style={styles.income} >I received some bills!</Text>
            </TouchableOpacity>
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffdf1',
        flex: 1,
        alignItems: 'center',
    },
    expense: {
        fontSize: 40,
        color: "#fffdf1",
        margin: 50,
        textAlign: 'center'
    },
    expenseBox: {
        backgroundColor: "#e08484",
        height:250,
        width:300,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 80,
        margin:20
    },
    income: {
        fontSize: 40,
        color: "#fffdf1",
        margin: 50,
        textAlign: 'center'
    },
    incomeBox: {
        backgroundColor: "#90e37f",
        height: 250,
        width: 300, 
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: 80,
        marginTop: 30
    }
})