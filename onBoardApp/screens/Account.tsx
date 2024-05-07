import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, TextInput, Image, ToastAndroid } from 'react-native';
import commonStyles from '../styles/commonStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';



export function Account() {
    const navigation = useNavigation();
    const [nick, setNick] = useState<string | null>();

    useEffect(() => {
        async function fetchNick() {
            const storedNick = await AsyncStorage.getItem("@token");
            setNick(storedNick);            
        }
        fetchNick();
    }, []);

    const handleLogout = () => {
        AsyncStorage.removeItem("@token");
        navigation.navigate("Login");

    }
    return (
        <SafeAreaView style={commonStyles.centerContainer}>
            <Text>Hello {nick}</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Log out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

}