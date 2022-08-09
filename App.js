import {StatusBar} from 'expo-status-bar';
import {Text, View} from 'react-native';
import {TailwindProvider} from 'tailwindcss-react-native';
import { NativeRouter, Route, Routes, Link } from "react-router-native";
import React from 'react';
import Toast from 'react-native-toast-message';
import OnBoard from './src/components/OnBoard';

export default function App() {
    return (
        <>
            <NativeRouter>
                <TailwindProvider>
                        <View>
                            <Routes>
                                <Route path="/" element={<OnBoard />} />
                            </Routes>
                        </View>
                </TailwindProvider>
                <Toast />
            </NativeRouter>
        </>
    );
}