import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { CommonActions } from "@react-navigation/native";

import Screen from "../components/Screen";
import Logo from "../components/Logo";
import * as Authentication from "../../api/auth";
import { TextInput } from "react-native-paper";


export default ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  
    const handleLogin = () => {
      Keyboard.dismiss();
      setIsLoginLoading(true);
  
      Authentication.login(
        { email, password },
        (user) => navigation.dispatch(CommonActions.reset({
          index: 0,
          routes: [{
            name: "Main",
            params: { name: user.displayName }
          }]
        })),
        (error) => {
          setIsLoginLoading(false);
          return console.error(error);
        }
      );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Screen scrollable style={styles.container}>
                
                <Logo />
                <Text style={styles.logoName}>Welcome!</Text>

                
                <View style={styles.textContainer}>
                    <TextInput
                    value={email}
                    onChangeText={setEmail}
                    mode="flat"
                    theme={{
                        colors: {
                        primary: "black",
                        underlineColor: "transparent",
                        background: "#003489",
                        },
                    }}
                    label="Email address"
                    placeholder="e.g. harrystyles@mail.com"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                    blurOnSubmit={false}
                    style={styles.input}
                    left={<TextInput.Icon name="account" color={"#0c4271"} />}
                    />

                    <TextInput
                    mode="flat"
                    style={styles.input}
                    label="Password"
                    placeholder="e.g. iLoveHarry"
                    theme={{
                      colors: {
                        primary: "black",
                        underlineColor: "transparent",
                        background: "#003489",
                      },
                    }}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                    left={
                      <TextInput.Icon
                        name="form-textbox-password"
                        color={"#0c4271"}
                      />
                    }
                    right={
                      <TextInput.Icon
                        color={"#0c4271"}
                        name={isPasswordVisible ? "eye-off" : "eye"}
                        onPress={() => setIsPasswordVisible((state) => !state)}
                      />
                    }
                  
                />

                </View>

                <TouchableOpacity 
                style={styles.loginButtonFinal}
                onPress={handleLogin}
                loading={isLoginLoading}
                disabled={isLoginLoading}
                >
                    <Image source={require('../../assets/login-button-final.png')}></Image>
                </TouchableOpacity>

                <View style={styles.signUpContainer}>
                    <Text style={styles.signUpText}>Don't have an account?</Text>

                    <TouchableOpacity 
                    style={styles.signUpButton}
                    onPress={() => navigation.navigate("SignUp")}
                    >
                        <Image source={require('../../assets/sign-up-button.png')}></Image>
                    </TouchableOpacity>
                </View>

            </Screen>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fffdf1',
        flex: 1,
    },
    font: {
        fontSize: 20,
        paddingTop: 30
    },
    logo: {
        resizeMode: 'center',
        alignSelf: 'center'
    },
    logoName: {
      marginTop: "20%",
      marginHorizontal: "10%",
      paddingBottom: "2%",
      fontSize: 50,
      fontFamily: "AvenirNext-Bold",
      alignSelf: "flex-end",
    },
    loginButtonFinal: {
        transform: [{scale: 0.5}],
        alignItems: 'center',
    },
    signUpButton: {
        //top: '25%',
        transform: [{scale: 0.5}],
    },
    signUpContainer: {
        alignItems: 'center',
    },
    signUpText: {
        paddingTop: 10,
        marginBottom: '-5%',
        alignSelf: "center",
        color: "black",
        fontSize: 20,
        fontFamily: "Avenir",
        fontWeight: "600",
    },
    textContainer: {
      //marginTop:'45%',
      alignItems: 'center',
        
    },
    input: {
      height: 50,
      width: "80%",
      backgroundColor: "white",
      marginBottom: 20,
      fontSize: 15,
      opacity: 0.85,
    },
})