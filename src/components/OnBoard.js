import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TextInput, Button, TouchableOpacity, ScrollView, Keyboard, KeyboardAvoidingView, Platform, } from 'react-native';
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
        setListTask([...listTask, {task: task, status: true}]);
        setTask('');
        Keyboard.dismiss()
        Toast.show({
            type: 'success',
            text1: 'Add task success',
            text2: 'This is some something 👋'
        });		
    }
    const handlerDelTask = (index) => {
        const newTask = [...listTask];
        newTask.splice(index, 1);
        setListTask(newTask);
        Toast.show({
            type: 'success',
            text1: 'Delete task success',
        });	
    }
    const handlerChangeTask = (index) => {
        setIndexChange(index);
        setChangeTask(listTask[index].task);
        const newTask = [...listTask];
    }
    const handlerChangeStatus = (index) => {
        const newTask = [...listTask];
        newTask[index].status = !newTask[index].status;
        setListTask(newTask);
    }
    const handlerChange = (index) => {
        const newTask = [...listTask];
        newTask[index].task = changeTask;
        setIndexChange(null)
        setChangeTask(newTask)
    }
    return (
        <SafeAreaView style={styles.task} className="bg-[#E8EAED] container mx-auto">
            <View>
                <Text className="mt-[94px] ml-[20px] text-[24px] font-bold text-[#1A1A1A]">Today's tasks</Text>
            </View>
            <View>
           
                <ScrollView style={styles.list} className="mt-[30px]">
                    {
                        listTask?.map((item, index) => (
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
                                    <View>
                                        <TextInput placeholder="Write a task" onChangeText={setChangeTask} value={changeTask} className="p-4 w-full h-full text-[14px] font-normal" />
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
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View  className="absolute z-10 bottom-[30px] ml-[20px] flex items-center justify-center flex-row">
                        <TouchableOpacity  className="w-[246px] h-[45px] rounded-[10px] shadow bg-white flex items-center justify-center">
                                <TextInput placeholder="Write a task" onChangeText={setTask} value={task} className="p-4 w-full h-full text-[14px] font-normal" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlerAddTask} className="w-[60px] h-[60px] ml-[20px] mr-[29px] rounded-full bg-white shadow flex items-center justify-center">
                            <Text>Add</Text>
                        </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    task: {
      minHeight: '100%',
    },
    list: {
        maxHeight: '65%',
    },
    
  });
export default OnBoard;