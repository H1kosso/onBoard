import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import env from '../env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameSessionType } from '../types/GameTypes';
import {Avatar, Card, Paragraph,} from "react-native-paper";
import { getBoardGameById } from "../bgg-interface/BGGInterface";



export function Stats() {
    const baseUrl = env.IP_ADDRESS;
    const [gameHistoryList, setGameHistoryList] = useState<GameSessionType[]>([]);


    useFocusEffect(
        React.useCallback(() => {
            const fetchGameHistory = async () => {
                try {
                    const username = await AsyncStorage.getItem('@token');
                    if (username) {
                        const response = await axios.get(`${baseUrl}/api/gamehistory?username=${username}`);
                        setGameHistoryList(response.data);
                    } else {
                        console.error('No username found in AsyncStorage');
                    }
                } catch (error) {
                    console.error('Error fetching game history:', error);
                }
            };

            fetchGameHistory();
        }, [])
    );

    const getGameDetails = async (gameId: string) => {
        try {
            const gameDetails = await getBoardGameById(gameId);
            return gameDetails;
        } catch (error) {
            console.error('Error fetching game details:', error);
            return null;
        }
    };
    

    const GameItem = ({ itemProps }: { itemProps: GameSessionType }) => {
        const iconSize = 54;
        const helperUri = "https://cf.geekdo-images.com/NaVK216SnjDz3VLr5kKOAg__original/img/_fR_-LU6T4zfa901SvBAx3V8O3k=/0x0/filters:format(jpeg)/pic350302.jpg";

        const [gameDetails, setGameDetails] = useState<{ title: string, imageUrl: string } | null>(null);

        useEffect(() => {
            const fetchData = async () => {
                const details = await getGameDetails(itemProps.gameId);
                if (details) {
                    setGameDetails({ title: details.title, imageUrl: details.imageUrl });
                }
            };

            fetchData();

            return () => {
                setGameDetails(null);
            };
        }, [itemProps.gameId]);

        return (
            <Card style={{ marginVertical: 4, marginHorizontal: 8 }}>
                <Card.Title
                    title={gameDetails?.title || "Loading..."}
                    subtitle={`Location: ${itemProps.location}, Date: ${itemProps.date}`}
                    left={(props) =>
                        <Avatar.Image
                            {...props}
                            size={iconSize}
                            source={{ uri: gameDetails?.imageUrl || helperUri }}
                        />
                    }
                    leftStyle={{ marginRight: 32 }}
                />
                <Card.Content>
                    <Paragraph>Players: {itemProps.players}</Paragraph>
                    <Paragraph>Playtime: {itemProps.playtime} minutes</Paragraph>
                    <Paragraph>Winner: {itemProps.winner}</Paragraph>
                </Card.Content>
            </Card>
        );
    };

    return (
        <SafeAreaView>
            <FlatList
                style={{ marginVertical: 50 }}
                data={gameHistoryList}
                renderItem={({ item }) => <GameItem itemProps={item} />}
                keyExtractor={(item) => item._id}
            />
        </SafeAreaView>
    );
}
