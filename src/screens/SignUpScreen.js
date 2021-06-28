import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { TextInput } from "react-native-paper";
import { CommonActions } from "@react-navigation/native"
import Screen from "../components/Screen";
import Logo from "../components/Logo";
import * as Authentication from '../../api/auth';

export default ({ navigation }) => {
    const [ email, onChangeEmail ] = React.useState("");
    const [ password, onChangePassword ] = React.useState("");
    const [ username, onChangeName ] = React.useState("");
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleRegister = () => {
        Keyboard.dismiss();
        setIsRegisterLoading(true);
    
        Authentication.register(
            { name: username, email, password },
            (user) => navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [{
                name: "Main",
                params: { name: user.displayName }
                }]
            })),
            (error) => {
                setIsRegisterLoading(false);
                return console.error(error);
            }
            );
        }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Screen scrollable style={styles.container}>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Logo />
                </TouchableOpacity>

                <View style={styles.textContainer}>
                    <Text style={styles.logoName}>Get started!</Text>

                <TextInput
                    label="Your name"
                    placeholder="e.g. Harry Styles"
                    style={styles.input}
                    onChangeText={onChangeName}
                    value={username}
                    autoCapitalize="words"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    theme={{
                    colors: {
                        primary: "black",
                        underlineColor: "transparent",
                        background: "#0c4271",
                    },
                    }}
                    left={<TextInput.Icon name="account" color={"#0c4271"} />}
                />

                <TextInput
                    style={styles.input}
                    label="Email"
                    placeholder="e.g. harrystyles@mail.com"
                    theme={{ colors: { primary: "black" } }}
                    onChangeText={onChangeEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                    value={email}
                    onSubmitEditing={() => passwordTextInput.current.focus()}
                    left={<TextInput.Icon name="at" color={"#0c4271"} />}
                />

                <TextInput
                    mode="flat"
                    label="Password"
                    placeholder="e.g. iLoveHarry"
                    autoCapitalize="none"
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    theme={{
                    colors: {
                        primary: "black",
                        underlineColor: "transparent",
                        background: "#0c4271",
                    },
                    }}
                    secureTextEntry={!isPasswordVisible}
                    left={
                    <TextInput.Icon name="form-textbox-password" color={"#0c4271"} />
                    }
                    right={
                    <TextInput.Icon
                        color = {"#0c4271"}
                        name={isPasswordVisible ? "eye-off" : "eye"}
                        onPress={() => setIsPasswordVisible((state) => !state)}
                    />
                    }
                />

                    <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
                        <Image source={require('../../assets/sign-up-button.png')}></Image>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Login")}>
                        <Image source={require('../../assets/login-button.png')}></Image>
                    </TouchableOpacity>

                </View>
            </Screen>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffdf1',
        flex: 1,
    },
    font: {
        fontSize: 20,
        paddingTop: 15,
        paddingBottom: 5,
    },
    logoName: {
        marginTop: "20%",
        marginHorizontal: "10%",
        paddingBottom: "2%",
        fontSize: 50,
        fontFamily: "AvenirNext-Bold",
        alignSelf: "flex-end",
    },
    input: {
        height: 50,
        width: "80%",
        backgroundColor: "white",
        marginBottom: 20,
        fontSize: 15,
        opacity: 0.85,
      },
    loginButton: {
        marginTop: '-10%',
        transform: [{scale: 0.5}]
    },
    logo: {
        resizeMode: 'center',
        alignSelf: 'center',
    },
    signUpButton: {
        transform: [{scale: 0.5}]
    },
    textContainer: {
        alignItems: 'center'
    }
})