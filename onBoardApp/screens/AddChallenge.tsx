import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image, ToastAndroid } from 'react-native';
import { Text, Button, Checkbox, TextInput } from 'react-native-paper';
import {CommonActions, useTheme} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameSessionProps } from "../types/MainStackParamList";
import { getBoardGameById } from "../bgg-interface/BGGInterface";
import axios from "axios";
import env from "../env";

export function AddChallenge({ navigation, route }: GameSessionProps) {
    const theme = useTheme();
    const [finished, setFinished] = useState(false);

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [targetValue, setTargetValue] = useState(10)
    const [progressValue, setProgressValue] = useState(0)
    const localhost = env.IP_ADDRESS;

    const handlePress = async () => {
        const storedNick = await AsyncStorage.getItem("@token");

        if (!storedNick) {
            ToastAndroid.show("User token not found", ToastAndroid.SHORT);
            return;
        }

        const data = {
            username: storedNick,
            title,
            description,
            targetValue,
            progressValue,
        };
        try {
            const response = await axios.post(`${localhost}/api/challenge`, data); // Correct endpoint here
            console.log(data);

            if (response.status === 201) {
                ToastAndroid.show("Challenge added successfully", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                console.log("error occured")
            } else {
                ToastAndroid.show("Network error", ToastAndroid.SHORT);
            }
        }
        navigation.navigate("Challenges", { searchText: ""})
    };

    return  (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />
            <Text style={styles.label}>Description</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
            />
            <Text style={styles.label}>Target Value</Text>
            <TextInput
                style={styles.input}
                value={targetValue.toString()}
                keyboardType="numeric"
                onChangeText={setTargetValue}
            />
            <Text style={styles.label}>Progress Value</Text>
            <TextInput
                style={styles.input}
                value={progressValue.toString()}
                keyboardType="numeric"
                onChangeText={setProgressValue}
            />
            <Button mode="contained"
                    onPress={handlePress}
                    buttonColor={theme.colors.tertiary}
                    textColor={theme.colors.onTertiary}>Add Challenge</Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    image: {
        width: '100%',
        height: 256,
        marginBottom: 8
    },
    label: {
        fontSize: 16,
        marginVertical: 8
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8
    }
});
