import { Avatar, Card, Paragraph, useTheme } from "react-native-paper";
import { Button, FlatList, SafeAreaView, Text, ToastAndroid, View } from "react-native";
import { getBoardGameById, searchBoardGame } from "../bgg-interface/BGGInterface";
import { useEffect, useState, useCallback } from "react";
import env from "../env";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import { GameCardType } from "../types/GameTypes";
import { SearchGameProps } from "../types/MainStackParamList";

export function Collection() {
    const localhost = env.IP_ADDRESS;
    const [collection, setCollection] = useState([]);
    const [games, setGames] = useState([]);
    const [finished, setFinished] = useState(false);

    useFocusEffect(
        useCallback(() => {
            AsyncStorage.getItem("@token")
                .then(nick => {
                    const url = `${localhost}/api/collection?username=${nick}`;
                    axios.get(url)
                        .then(response => {
                            setCollection(response.data);

                            const gameIds = response.data.map(game => game.gameId);
                            const gamePromises = gameIds.map(id => getBoardGameById(id));

                            Promise.all(gamePromises)
                                .then(gameDetails => {
                                    const flattenedGameDetails = gameDetails.flat();
                                    setGames(mergeGameData(flattenedGameDetails, response.data));
                                    setFinished(true);
                                })
                                .catch(error => {
                                    console.error('Error fetching game details:', error);
                                });
                        })
                        .catch(error => {
                            console.error("Błąd:", error);
                        });
                })
                .catch(error => {
                    console.error("Error retrieving username from AsyncStorage:", error);
                });
        }, [localhost])
    );

    function mergeGameData(gameLog, ownershipLog) {
        const gameOwnershipDict = {};
        ownershipLog.forEach(entry => {
            gameOwnershipDict[entry.gameId.toString()] = entry;
        });

        const mergedData = gameLog.map(game => {
            const ownershipEntry = gameOwnershipDict[game.gameId];
            if (ownershipEntry) {
                return { ...game, ...ownershipEntry };
            } else {
                return game;
            }
        });
        return mergedData;
    }

    return (
        <SafeAreaView>
            {
                games !== undefined
                    ? <FlatList
                        data={games}
                        renderItem={({ item }) => <GameItem itemProps={item} />} />
                    : null
            }

        </SafeAreaView>
    );
}

function GameItem(props: GameItemProps) {
    const iconSize = 54;
    const itemProps = props.itemProps;    
    const helperUri = "https://cf.geekdo-images.com/NaVK216SnjDz3VLr5kKOAg__original/img/_fR_-LU6T4zfa901SvBAx3V8O3k=/0x0/filters:format(jpeg)/pic350302.jpg";
    return (
        <Card
            style={{ marginVertical: 4, marginHorizontal: 8 }}>

            <Card.Title
                title={itemProps.title}
                subtitle={itemProps.categories.join(', ')}
                left={(props) =>
                    <Avatar.Image
                        {...props}
                        size={iconSize}
                        source={{ uri: itemProps.imageUrl ? itemProps.imageUrl : helperUri }}
                    />
                }
                leftStyle={{ marginRight: 32 }}
            />
            <Card.Content>
                <Paragraph>Buy Price: {itemProps.buyPrice}</Paragraph>
                <Paragraph>When Bought: {itemProps.whenBought}</Paragraph>
                <Paragraph>Owned: {itemProps.owned ? 'Yes' : 'No'}</Paragraph>

            </Card.Content>
        </Card>
    );
}
