import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput, Button, TouchableOpacity, ScrollView, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

const OnBoard = () => {
    const [task, setTask] = useState('');
    const [changeTask, setChangeTask] = useState('');
    const [listTask, setListTask]= useState([]);
    const [change, setChange] = useState(true)
    const [indexChange, setIndexChange] = useState(null)

    const handlerAddTask = () => {
        setListTask([...listTask, {task: task, status: true,time: new Date().getSeconds()}]);
        setTask('');
        Keyboard.dismiss()
        Toast.show({
            type: 'success',
            text1: 'Add Task Success',
            text2: 'Have a great day 👋'
        });		
    }
    const handlerDelTask = (index) => {
        const newTask = [...listTask];
        newTask.splice(index, 1);
        setListTask(newTask);
        Toast.show({
            type: 'success',
            text1: 'Delete task Success',
        });	
    }
    const handlerChangeTask = (index) => {
        const newTask = [...listTask];
        setIndexChange(index);
        setChangeTask(listTask[index].task);
    
    }
    const handlerChangeStatus = (index) => {
        const newTask = [...listTask];
        newTask[index].status = !newTask[index].status;
        setListTask(newTask);
        Toast.show({
            type: 'success',
            text1: 'Change Status Task Success',
            text2: 'Have a great day 👋'
        });	
    }
    const handlerChange = (index) => {
        const newTask = [...listTask];
        newTask[index].task = changeTask;
        setIndexChange(null)
        setChangeTask(newTask)
        Toast.show({
            type: 'success',
            text1: 'Change Task Success',
            text2: 'Have a great day 👋'
        });	
    }
    return (
            <KeyboardAvoidingView behavior="position" >
                <SafeAreaView style={styles.task} className="bg-[#E8EAED] flex-1">
                    <View>
                        <Text className="mt-[40px] ml-[20px] text-[24px] font-bold text-[#1A1A1A]">Today's tasks</Text>
                    </View>
                    <View>
                        <ScrollView style={styles.list} className="mt-[30px]">
                            {
                                listTask.map((item, index) => (
                                    <View  key={index}  className="max-h-[30vh] p-5 flex items-center justify-between flex-row h-fit rounded-[10px] bg-white mx-[20px] mt-[20px] shadow">
                                        <TouchableOpacity className={item.status ? "w-[24px] h-[24px] rounded-[5px] bg-[#55BCF6]" : "w-[24px] h-[24px] rounded-[5px] bg-red-600"} onPress={() => handlerChangeStatus(index)}>

                                        </TouchableOpacity>
                                        {!(indexChange === index) ? 
                                            <View className="flex items-center w-[64%] justify-start">
                                                <Text className={item.status ? "text-[14px] text-[#1A1A1A] w-[80%] text-left font-normal" : "text-[14px] text-[#1A1A1A] w-[80%] text-left line-through font-normal"}>
                                                    {item.task}
                                                </Text>
                                            </View>
                                            : 
                                            <View className="flex items-center w-[64%] justify-start">
                                                <TextInput placeholder="Write a task" onChangeText={setChangeTask} value={changeTask} className="p-4  text-[14px] font-normal" />
                                            </View>
                                        }
                                        <View>
                                            {!(indexChange === index) ? 
                                            <TouchableOpacity onPress={() => handlerChangeTask(index)} className="text-[14px]">
                                                <Text>
                                                    Change Task
                                                </Text>
                                            </TouchableOpacity> : 
                                            <TouchableOpacity onPress={() => handlerChange(index)} className="text-[14px]">
                                                <Text>
                                                    Change 
                                                </Text>
                                            </TouchableOpacity>
                                            }
                                            <TouchableOpacity onPress={() => handlerDelTask(index)} className="text-[14px]">
                                                <Text>
                                                    Delete
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))
                            }
                        </ScrollView >
                    </View>
                            <View  className="absolute z-10 bg-[#E8EAED] py-2 bottom-[4%] ml-[20px] flex items-center justify-center flex-row">
                                    <TextInput  placeholder="Write a task" onChangeText={setTask} value={task} className="p-4 w-[246px] h-[45px] rounded-[10px] shadow bg-white flex items-center justify-center  text-[14px] font-normal" />
                                    <TouchableOpacity onPress={handlerAddTask} className="w-[60px] h-[60px] ml-[20px] mr-[29px] rounded-full bg-white shadow flex items-center justify-center">
                                        <Text>Add</Text>
                                    </TouchableOpacity>
                            </View>
                </SafeAreaView>
            </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    task: {
        minHeight: '100%',
    },
    list: {
        minHeight: '70%',
        maxHeight: '85%',
    },
  });
export default OnBoard;