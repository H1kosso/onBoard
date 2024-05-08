import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, TextInput, Image, ToastAndroid } from 'react-native';
import commonStyles from '../styles/commonStyles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';



export function Account() {
    const navigation = useNavigation();
    const [nick, setNick] = useState<string | null>();
    const [photo, setPhoto] = useState<string | null>();

    useEffect(() => {
        async function fetchNick() {
            const storedNick = await AsyncStorage.getItem("@token");
            const storedPhoto = await AsyncStorage.getItem("@photo");

            setNick(storedNick);
            setPhoto(storedPhoto);
            console.log("Photo" + photo)
        }
        fetchNick();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem("@token");
        await AsyncStorage.removeItem("@photo");
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
        );

    }
    return (
        <SafeAreaView style={commonStyles.centerContainer}>
            <Text style={commonStyles.header}>{nick}</Text>
            {photo ?                
                <Image source={{uri: photo}} style={{width: 120, height: 120, borderRadius: 60}}/>
                :
                <Image source={require('../resources/icons/ace.png')} style={{width: 120, height: 120, borderRadius: 60}}/>
            }

            <TouchableOpacity onPress={handleLogout}>
                <Text>Log out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );

}