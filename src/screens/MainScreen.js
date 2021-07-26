import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import Logo from "../components/Logo";
import Screen from "../components/Screen";
import DuckBank from "../components/DuckBank";
import DuckList from "../components/DuckList";
import Icon from "react-native-vector-icons/FontAwesome";


export default ({navigation}) => {
    return (
        <Screen style={styles.container}>
            <Logo />
            <TouchableOpacity
            style={styles.logOutButton}
            onPress={() => {
            navigation.navigate("Login");
            }}
            >
        <Icon name="sign-out" size={35} color="orange" />
        </TouchableOpacity>

            <Text style={styles.mainMsg} > BE POSITIVE! </Text>

            <TouchableOpacity style={styles.duckBank} onPress={() => navigation.navigate("Transactions")}>
                <DuckBank />
            </TouchableOpacity>

            <TouchableOpacity style={styles.duckList} onPress={() => navigation.navigate("To Do List")}>
                <DuckList />
            </TouchableOpacity>            
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffdf1',
        flex: 1,
        alignItems: 'center',
    },
    logOutButton: {
        position: "absolute",
        top: "20%",
        right: "5%",
      },
    duckBank: {
        transform: [{scale: 0.65}],
        position: "absolute",
        bottom: -60,
        right: -40
    },
    duckList: {
        transform: [{scale: 0.8}],
        position: "absolute",
        bottom: 25,
        right: -62,
    },
    mainMsg: {
        marginTop: "20%",
        marginHorizontal: "10%",
        paddingBottom: "2%",
        fontSize: 50,
        fontFamily: "AvenirNext-Bold",
        alignSelf: "flex-end",
    }
})