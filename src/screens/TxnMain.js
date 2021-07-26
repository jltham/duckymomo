import React, {useState, useEffect} from 'react';
import { StyleSheet, Modal, View, Text, TouchableOpacity, Image, FlatList, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Picker } from "@react-native-picker/picker";
import {addTransaction} from '../store/action/transactionActions';



import { deleteTransaction } from '../store/action/transactionActions';
import * as Transactions from '../../api/firestore';
import EmptyTxn from "../components/EmptyTxn";
import Screen from "../components/Screen";
import Logo from "../components/Logo";
import Icon from "react-native-vector-icons/FontAwesome";


function Item({updateDisplay, title, id, price, type}) {
    const dispatch = useDispatch();

    return (
        <View style={styles.item}>
            {type === "food" ? (
                <Text style={styles.itemText}>Munched on ${1 * price} worth of {title}</Text>
            ) : type === "transport" ? (
                <Text style={styles.itemText}>{title} had a fare of ${1 * price}</Text>
            ) : (
                <Text style={styles.itemText}>Shopped for {title} and spent ${1 * price}</Text>
            )
            }
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                    Transactions.remove(
                        {id},
                        (str) => {
                            dispatch(deleteTransaction(str));
                            updateDisplay();
                        },
                        () => console.log("Failed to delete")
                    )
                }}
            >
                <Text style={styles.cross}> X </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ({navigation}) => {
    const [transactionsLog, setTransactionsLog] = useState([])

    const updateDisplay = () => {
        Transactions.transactionsRef.get().then((res)=>{
            setTransactionsLog(res.docs);
        });
    }

    useEffect(() => {
        updateDisplay();
    }, [])

    const totalExpenditure = transactionsLog.map((item) => item.data().price)
    .reduce((prev, curr) => prev += curr, 0) * 1;

    const totalFood = transactionsLog.filter((item) => item.data().type === "food")
    .map((item) => item.data().price)
    .reduce((prev, curr) => prev += curr, 0);

    const totalTransport = transactionsLog.filter((item) => item.data().type === "transport")
    .map((item) => item.data().price)
    .reduce((prev, curr) => prev += curr, 0);

    const totalShopping = transactionsLog.filter((item) => item.data().type === "shopping")
    .map((item) => item.data().price)
    .reduce((prev, curr) => prev += curr, 0);

    const foodPercent = totalExpenditure > 0 ? (totalFood / totalExpenditure * 100).toFixed(2)
                                             : 0;
    const transportPercent = totalExpenditure > 0 ? (totalTransport / totalExpenditure * 100).toFixed(2)
                                                  : 0;
    const shoppingPercent = totalExpenditure > 0 ? (totalShopping / totalExpenditure * 100).toFixed(2)
                                                 : 0;
                                                 const dispatch = useDispatch();
    const {tasks} = useSelector((state) => state.tasks);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [type, setType] = useState("");   
    const [price, setPrice] = useState(''); 

    const onSubmit = () => {
        if (!title || !price || type == "") {
            return alert('Please fill all fields');
        } else if (price > 9999) {
            return alert('That is too much money for the duck bank to manage!!')
        }
    
        
        Transactions.create(
            {title, price, type},
            (id) => {
                const newTransaction = {
                    id,
                    title,
                    price: +(-1 * price),
                    type,
                };

                dispatch(addTransaction({...newTransaction}));
                updateDisplay();
            },
            () => 0,
        );
            setModalVisible(!modalVisible);
    };

    return (

        <Screen style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Logo />
        </TouchableOpacity>

            <View style={styles.info}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate("Main")}>
                    <Icon name="chevron-left" size={25} color="black" />
                </TouchableOpacity>

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

                <TouchableOpacity style={styles.adder} onPress={() => setModalVisible(true)}>
                    <Text style={styles.adderText}>Add New Trans-Quack-Tion</Text>
                </TouchableOpacity>

                <View style={styles.centeredView}>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>What did you spend on?</Text>

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

                            <View style={{ flexDirection: "row" }}>

                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={
                                        onSubmit
                                    }
                                >

                                    <Text style={styles.textStyle}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>

                </Modal>
                </View>


                <View style={styles.historyContainer}>
                    
                    <Text style={styles.historyText}> History </Text>

                    {transactionsLog.length > 0 ? (
                        <FlatList 
                            data={transactionsLog}
                            renderItem={({item}) => (
                                <Item updateDisplay={updateDisplay} id={item.id} title={item.data().title} price={item.data().price} type={item.data().type} />
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
    itemText: {
        maxWidth: 200,
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
    backButton: {
        position: "absolute",
        top: "10%",
        left: "3%",
      },
      adderButton: {
        position: "absolute",
        bottom: -80,
        left: 0
    },
    button: {
        backgroundColor: "#000000",
        width: 30,
        height: 30,
        marginRight: 15
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
    },
    modalButton: {
        backgroundColor: "#ffdb78",
        width: "40%",
        height: "40%",
        alignItems: "center",
        margin: 10,
        justifyContent: "center",
        borderRadius: 5,
    },
    modalText: {
        marginBottom: 10,
        textAlign: "center",
        color: "black",
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        color: "black",
        fontWeight: "bold",
        fontSize: 25,
    },
    modalView: {
        marginTop: "50%",
        backgroundColor: "white",
        borderRadius: 30,
        paddingVertical: 40,
        alignItems: "center",
        shadowColor: "#000",
        position: "absolute",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textStyle: {
        fontFamily: "Avenir",
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
    },
    picker: {
        marginTop: -45,
        height: 200,
        width: 200
    },
    title: {
        marginLeft: 0,
        fontSize: 20,
        maxWidth: 300,
        flexWrap: 'wrap-reverse',
    },
    input: {
        backgroundColor: "white",
        height: 40,
        width: 320,
        marginBottom: 20
    },

})