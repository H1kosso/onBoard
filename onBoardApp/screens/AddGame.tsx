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

export function AddGame({ navigation, route }: GameSessionProps) {
    const theme = useTheme();
    const [image, setImage] = useState("");
    const [finished, setFinished] = useState(false);

    const [owned, setOwned] = useState(true);
    const [buyPrice, setBuyPrice] = useState("");
    const [whenBought, setWhenBought] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [favourite, setFavourite] = useState(false);
    const localhost = env.IP_ADDRESS;

    const handlePress = async () => {
        const storedNick = await AsyncStorage.getItem("@token");

        if (!storedNick) {
            ToastAndroid.show("User token not found", ToastAndroid.SHORT);
            return;
        }

        const data = {
            username: storedNick,
            gameId: route.params.gameId,
            owned,
            buyPrice: parseFloat(buyPrice),
            whenBought: formatDate(whenBought),
            favourite
        };
        try {
            const response = await axios.post(`${localhost}/api/collection`, data); // Correct endpoint here
            console.log(data);

            if (response.status === 201) {
                ToastAndroid.show("Game added successfully", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error(error);
            if (error.response) {
                console.log("error occured")
            } else {
                ToastAndroid.show("Network error", ToastAndroid.SHORT);
            }
        }
        navigation.navigate("SearchGame", { searchText: ""})
    };

    useEffect(() => {
        const fetchGameDetails = async () => {
            navigation.setOptions({ title: route.params.gameTitle });
            const details = await getBoardGameById(route.params.gameId);
            if (details) {
                setImage(details.imageUrl);
            }
            setFinished(true);
        };

        fetchGameDetails();
    }, [navigation, route.params.gameId, route.params.gameTitle]);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || whenBought;
        setShowDatePicker(false);
        setWhenBought(currentDate);
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return finished ? (
        <ScrollView contentContainerStyle={styles.container}>
            <Image style={styles.image} resizeMode="contain" source={{ uri: image }} />
            <Text style={styles.label}>Owned</Text>
            <Checkbox
                status={owned ? 'checked' : 'unchecked'}
                onPress={() => setOwned(!owned)}
            />
            <Text style={styles.label}>Buy Price</Text>
            <TextInput
                style={styles.input}
                value={buyPrice}
                keyboardType="numeric"
                onChangeText={text => setBuyPrice(text)}
            />
            <Text style={styles.label}>When Bought</Text>
            <Button onPress={() => setShowDatePicker(true)}>Select Date</Button>
            <Text>{formatDate(whenBought)}</Text>
            {showDatePicker && (
                <DateTimePicker
                    value={whenBought}
                    mode="date"
                    display="default"
                    onChange={onChangeDate}
                />
            )}
            <Text style={styles.label}>Favourite</Text>
            <Checkbox
                status={favourite ? 'checked' : 'unchecked'}
                onPress={() => setFavourite(!favourite)}
            />
            <Button mode="contained" onPress={handlePress}>Add Game</Button>
        </ScrollView>
    ) : (
        <ScrollView contentContainerStyle={styles.container}>
            <Text>Loading...</Text>
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
