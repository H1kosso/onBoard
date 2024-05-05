import { useEffect, useState } from "react";
import { useWindowDimensions, ScrollView, View } from 'react-native';

import { useTheme as useNavTheme } from "@react-navigation/native";
import { IconButton, Text, Card, useTheme, DataTable } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons'
import RenderHtml from 'react-native-render-html';

import { GameDetailsProps } from "../types/MainStackParamList";
import { GameDetailsType } from "../types/GameTypes";
import { StyleProp, TextStyle } from "react-native";

export function GameDetails({ navigation, route }: GameDetailsProps) {
    const [isFav, setIsFav] = useState(false);
    const navTheme = useNavTheme();
    const theme = useTheme();
    const { width } = useWindowDimensions();

    const mockData: GameDetailsType = {
        gameId: route.params.gameId,
        title: route.params.gameTitle,
        category: "Action",
        description: "Battleground: Crossbows &amp; Catapults puts you in the middle of a real fantasy battle and can be played on almost any flat surface.<br/><br/>Carefully place your weapons and warriors to take out your opponent's forces and defenses, Knight or Orc.<br/><br/>Load up the elastic powered weapons to launch the battle discs to do maximum damage to your opponent's side. Use your moves to strategically place your warriors and weapons to both defend your castle and attack your enemy. Aim for the flags and win bonus lives!<br/><br/>Be the first to knock over all your enemies to win!<br/><br/>Includes two complete armies, Knights and Orcs. 80 pieces in total.<br/><br/>First edition in 1983 as Crossbows &amp; Catapults<br/><br/>",
        imageUrl: "https://cf.geekdo-images.com/vbWhXsB-FHNxJWrUAFEjTg__original/img/8uloGSG6JWBVkGV6TAEw4oDsrY0=/0x0/filters:format(jpeg)/pic231219.jpg",
        players: { min: 2, max: 4 },
        playtime: { min: 40, max: 60 },
        suggestedNumOfPlayers: 2,
        suggestedPlayerAge: 4
    }

    type ParamtersCell = {
        icon: string,
        title: string,
        value: string | number,
        style: undefined | StyleProp<TextStyle>
    };

    const parametersContainer: ParamtersCell[] = [
        { icon: "category", title: "Category", value: mockData.category, style: { color: theme.colors.secondary } },
        { icon: "group", title: "Players", value: `${mockData.players.min}-${mockData.players.max}`, style: undefined },
        { icon: "timer", title: "Play time", value: `${mockData.playtime.min}-${mockData.playtime.max}`, style: undefined },
        { icon: "groups", title: "Suggested players", value: mockData.suggestedNumOfPlayers, style: undefined },
        { icon: "face", title: "Suggested age", value: mockData.suggestedPlayerAge, style: undefined }
    ];

    useEffect(() => {
        navigation.setOptions({ title: route.params.gameTitle })
    }, [])

    const onFavouriteButton = () => {
        console.log('Favourite state changed -> call to BoardAPI')
        setIsFav(!isFav);
    }

    useEffect(() => {
        navigation.setOptions({ headerRight: () => <IconButton icon="star" size={28} iconColor={isFav ? navTheme.colors.primary : navTheme.colors.border} onPress={onFavouriteButton} /> })
    }, [isFav])

    return (
        <ScrollView style={{ margin: 8 }}>
            <Card style={{ marginBottom: 8 }}>
                <Card.Cover width={64} height={64} source={{ uri: mockData.imageUrl }} />
            </Card>
            <Card style={{ marginVertical: 8 }}>
                <Card.Title title="Details" titleStyle={{ fontSize: 18 }} />
                <DataTable>
                    {
                        parametersContainer.map((cellValue, index) => (
                            <DataTable.Row key={index}>
                                <DataTable.Cell>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name={cellValue.icon} size={20} color={theme.colors.onSurface} />
                                        <Text style={{ marginLeft: 8, color: theme.colors.onSurface }}>{cellValue.title}</Text>
                                    </View>
                                </DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Text style={[{ color: theme.colors.tertiary, fontWeight: 'bold' }, cellValue.style]}>{cellValue.value}</Text>
                                </DataTable.Cell>
                            </DataTable.Row>
                        ))
                    }

                </DataTable>
            </Card>

            <Card style={{ marginVertical: 4 }}>
                <Card.Title title="Description" titleStyle={{ fontSize: 18 }} left={() => <Icon name="description" color={theme.colors.onSurface} size={34} />} />
                <Card.Content>
                    <RenderHtml
                        source={{ html: mockData.description }}
                        contentWidth={width}
                        tagsStyles={{
                            html: {
                                color: theme.colors.onSurface
                            }
                        }} />
                </Card.Content>
            </Card>
        </ScrollView>
    );
}