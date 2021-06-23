import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Keyboard, Pressable, FlatList } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {deleteTransaction} from '../store/action/transactionActions';
import EmptyTxn from "../components/EmptyTxn";
import Screen from "../components/Screen";
import Logo from "../components/Logo";

function Item({title, id, price}) {
    const dispatch = useDispatch();

    return (
        <View style={styles.item}>
            {price > 0 ? (
                <Text>Received {price} from {title}!</Text>
            ) : (
                <Text>Paid {price} for {title}</Text>
            )}
            
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                    dispatch(deleteTransaction(id));
                }}
            >
                <Text style={styles.cross}> X </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ({navigation}) => {
    const {transactions} = useSelector((state) => state.transactions);

    const prices = transactions.map((item) => item.price);
    const totalPrice = prices.reduce((prev, curr) => prev += curr, 0);
    const totalExpenditure = prices
    .filter((item) => item < 0)
    .reduce((prev, curr) => prev += curr, 0) * -1;

    return (
        <Screen style={styles.container}>

            <Logo />

            <View style={styles.info}>
                <View style={styles.text}>
                    <Text style={styles.text1}> My Expenses </Text>
                    <Text style={styles.text2}> ${totalExpenditure} / ${totalPrice} </Text> 
                </View>

                <TouchableOpacity style={styles.adder} onPress={() => navigation.navigate("TransactionsAdder")} >
                    <Text style={styles.adderText}>Add New Trans-Quack-Tion</Text>
                </TouchableOpacity>

                <View style={styles.historyContainer}>
                    
                    <Text style={styles.historyText}> History </Text>

                    {transactions.length > 0 ? (
                        <FlatList 
                            data={transactions}
                            renderItem={({item}) => (
                            <Item title={item.title} id={item.id} price={item.price} />
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            style={styles.history} 
                        />
                    ) : (
                        <EmptyTxn />
                    )}
                </View>
            </View>

            <TouchableOpacity style={styles.duckbank} onPress={() => navigation.navigate("Main")}>
                <Image source={require('../../assets/duckbank.png')} />
            </TouchableOpacity>

        </Screen>
    )

}

const styles = StyleSheet.create({
    adder: {
        backgroundColor: '#fefefe',
        borderColor: '#f3ecc6',
        borderWidth: 2,
        borderRadius: 20,
        width: 330,
        height: 70,
        marginBottom: 20,
        justifyContent:'center',
        alignItems:'center',
    },
    adderText: {
    },
    container: {
        backgroundColor: '#fffdf1',
        flex: 1,
    },
    cross: {
        fontSize: 14,
        color: '#f3ecc6',
    },
    deleteButton: {
        backgroundColor: "#fffdf1",
        borderColor: '#f3ecc6',
        borderWidth: 2,
        height: 20,
        width: 20,
        marginLeft: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    duckbank: {
        transform: [{scale: 0.55}],
        position: 'absolute',
        left: -145,
        bottom: -70
    },
    historyContainer: {
        backgroundColor: '#fefefe',
        borderColor: '#f3ecc6',
        borderWidth: 2,
        borderRadius: 20,
        width: 330,
        height: 250,
        justifyContent:'center',
        alignItems:'center',
    },
    historyText: {
        margin: 10,
    },
    info: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        padding: 5,
        borderBottomColor: "#f3ecc6",
        borderBottomWidth: 2,
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
    },
    logo: {
        resizeMode: 'center',
        alignSelf: 'center'
    },
    text: {
        marginBottom: 20
    }
})