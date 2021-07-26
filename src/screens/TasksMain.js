import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Image, Keyboard, Pressable, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { addTask, deleteTask } from '../store/action/tasksActions';
import Screen from '../components/Screen';
import Logo from '../components/Logo';
import EmptyList from '../components/EmptyList';
import Icon from "react-native-vector-icons/FontAwesome";
import * as Tasks from '../../api/firestore';


function Task({ updateDisplay, title, id }) {
    const dispatch = useDispatch();

    return (
        <View style={styles.tasks}>
            <View style={styles.taskContainer}>
                <Text style={styles.title}> {title} </Text>
            </View>

            <TouchableOpacity onPress={() => Tasks.deleteTask({id}, 
                (str) => {
                    dispatch(deleteTask(str));
                    updateDisplay();
                }, 
                () => console.log("Failed to delete task"))
            }>
                <Image source={require("../../assets/check-icon.png")} style={styles.checked} />            
            </TouchableOpacity>
        </View>
    )
}

export default ({navigation}) => {
    const [tasksLog, setTasksLog] = useState([]);

    const updateDisplay = () => {
        Tasks.tasksRef.get().then((res)=>{
            setTasksLog(res.docs);
        });
    }

    useEffect(() => {
        updateDisplay();
    }, [])

    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');

    const onSubmit = () => {
        if (!title) {
            return alert('Please fill all fields');
        }
        
        Tasks.addTask({ title },
            (id) => {
                const newTask = {
                    id,
                    title,
                };
                
                dispatch(addTask({...newTask}));
                updateDisplay();
            }, () => 0
        )

        setModalVisible(!modalVisible);
    };
    
    return (
        <Screen style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <Logo />
            </TouchableOpacity>
            <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("Main")}>
          <Icon name="chevron-left" size={25} color="black" />
        </TouchableOpacity>
            
            <Text style={styles.header}> TO DO LIST </Text>

            <View style={styles.listContainer}>
                {tasksLog.length > 0 ? (
                    <FlatList 
                        data={tasksLog}
                        renderItem={({item}) => (
                            <Task updateDisplay={updateDisplay} title={item.data().title} id={item.id} />
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        style={styles.tasksList}
                    />
                ) : (
                    <EmptyList />
                )}

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
                                <Text style={styles.modalTitle}>Add new title!</Text>
                                <Text style={styles.modalText}>Title:</Text>
                                <TextInput
                                onChangeText={(text) => setTitle(text)}
                                placeholder="e.g. Submissions for Milestone 2"
                                placeholderTextColor="#B8BDBD"
                                style={styles.modalText}
                                />

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

                    <TouchableOpacity style={styles.adderButton} onPress={() => setModalVisible(true)}>
                        <Image source={require("../../assets/add-list-icon.png")} />
                    </TouchableOpacity>
                </View>
            </View>
                                        
            <TouchableOpacity style={styles.duckListButton} onPress={() => {navigation.navigate("Main")}}>
                <Image source={require("../../assets/ducklist.png")} style={styles.ducklist} />
            </TouchableOpacity>
        </Screen>
    );
}

const styles = StyleSheet.create({
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
    checked: {
        transform: [{scale: 0.6}],
    },
    container: {
        backgroundColor: '#fffdf1',
        flex: 1,
    },
    ducklist: {
        transform: [{scale: 0.7}],
    },
    duckListButton: {
        position: 'absolute',
        bottom: 0 ,
        right: -43,
    },
    header: {
        fontSize: 30,
        alignSelf: 'center'
    },
    listContainer: {
        backgroundColor: "white",
        width: 370,
        height: 400,
        alignSelf: 'center',
        borderRadius: 40
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
        borderRadius: 20,
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
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    tasks: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textStyle: {
        fontFamily: "Avenir",
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
    },
    title: {
        marginLeft: 20,
        fontSize: 20,
        maxWidth: 300,
        flexWrap: 'wrap-reverse',
    },
    backButton: {
        position: 'absolute',
        top: "20%",
        left: "3%"
    }
})