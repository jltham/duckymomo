import React from 'react';
import { LogBox } from "react-native";
import { Provider as StoreProvider } from 'react-redux';
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/MainScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LoadingScreen from './src/screens/LoadingScreen';
import TxnMain from './src/screens/TxnMain';
import TxnAdder from './src/screens/TxnAdder';

import store from './src/store';

import firebase from './api/firebase';

const Stack = createStackNavigator();

const screens = [
  { name: "Loading", component: LoadingScreen },
  { name: "SignUp", component: SignUpScreen },
  { name: "Login", component: LoginScreen },
  { name: "Main", component: MainScreen },
  { name: "Transactions", component: TxnMain },
  { name: "TransactionsAdder", component: TxnAdder }
];

LogBox.ignoreLogs(["Setting a timer for a long period of"]);

export default function App() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={screens[3].name} headerMode="none">
            {screens.map(({ name, component }) => <Stack.Screen key={name} name={name} component={component} />)}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </StoreProvider>
  );
}

