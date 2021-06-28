import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Keyboard, Pressable, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { deleteTransaction } from '../store/action/transactionActions';
import EmptyTxn from "../components/EmptyTxn";
import Screen from "../components/Screen";
import Logo from "../components/Logo";

function Item({title, id, price, type}) {
    const dispatch = useDispatch();

    return (
        <View style={styles.item}>
            {type === "food" ? (
                <Text>Munched on ${-1 * price} worth of {title}</Text>
            ) : type === "transport" ? (
                <Text>{title} had a fare of ${-1 * price}</Text>
            ) : (
                <Text>Shopped ({title}) and burnt ${-1 * price}</Text>
            )
            }
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

    const totalExpenditure = transactions.map((item) => item.price)
    .reduce((prev, curr) => prev += curr, 0) * -1;

    const totalFood = transactions.filter((item) => item.type === "food")
    .map((item) => item.price)
    .reduce((prev, curr) => prev += curr, 0);

    const totalTransport = transactions.filter((item) => item.type === "transport")
    .map((item) => item.price)
    .reduce((prev, curr) => prev += curr, 0);

    const totalShopping = transactions.filter((item) => item.type === "shopping")
    .map((item) => item.price)
    .reduce((prev, curr) => prev += curr, 0);

    const foodPercent = totalExpenditure > 0 ? (totalFood / totalExpenditure * -100).toFixed(2)
                                             : 0;
    const transportPercent = totalExpenditure > 0 ? (totalTransport / totalExpenditure * -100).toFixed(2)
                                                  : 0;
    const shoppingPercent = totalExpenditure > 0 ? (totalShopping / totalExpenditure * -100).toFixed(2)
                                                 : 0;

    return (
        <Screen style={styles.container}>
            
            <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <Logo />
            </TouchableOpacity>

            <View style={styles.info}>
                <View style={styles.numberBanner}>
                    <View style={styles.text}>
                        <Text style={styles.text1}> My Expenses </Text>
                        <Text style={styles.text2}> ${totalExpenditure}</Text> 
                    </View>

                    <View style={styles.analysis}>
                        <View style={styles.numberBanner}>
                            <Image style={styles.food} source={require("../../assets/food-icon.png")} />
                            <Text>{foodPercent}%</Text>
                        </View>

                        <View style={styles.numberBanner}>
                            <Image style={styles.transport} source={require("../../assets/transport-icon.png")} />
                            <Text>{transportPercent}%</Text>
                        </View>

                        <View style={styles.numberBanner}>
                            <Image style={styles.shopping} source={require("../../assets/shopping-icon.png")} />
                            <Text>{shoppingPercent}%</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.adder} onPress={() => navigation.navigate("Expense")} >
                    <Text style={styles.adderText}>Add New Trans-Quack-Tion</Text>
                </TouchableOpacity>

                <View style={styles.historyContainer}>
                    
                    <Text style={styles.historyText}> History </Text>

                    {transactions.length > 0 ? (
                        <FlatList 
                            data={transactions}
                            renderItem={({item}) => (
                            <Item title={item.title} id={item.id} price={item.price} type={item.type} />
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
    food: {
        transform: [{scale: 0.5}]
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
        top: -25,
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
    numberBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    shopping: {
        transform: [{scale: 0.6}]
    },
    text: {
        marginBottom: 20,
    },
    text1: {
        textAlign: 'center',
        marginRight: 120,
        bottom: 25
    },
    text2: {
        textAlign: 'center',
        fontSize: 60,
        position: 'absolute',
        left: -20,
        top: -10,
    },
    transport: {
        transform: [{scale: 0.55}]
    },
})