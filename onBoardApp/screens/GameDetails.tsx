import { useEffect, useState } from "react";
import { Image, ScrollView } from 'react-native';

import { useTheme as useNavTheme } from "@react-navigation/native";
import { IconButton, Text, Card, useTheme, DataTable, ActivityIndicator, Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { StyleProp, TextStyle } from "react-native";

import { GameDetailsProps } from "../types/MainStackParamList";
import { GameDetailsType } from "../types/GameTypes";
import { getBoardGameById } from "../bgg-interface/BGGInterface";
import WebDisplay from "../components/WebDisplay";
import DataTableCellTitle from "../components/DataTableCellTitle";

type ParamtersCell = {
    icon: string | undefined,
    title: string,
    value: string | number,
    style: StyleProp<TextStyle> | undefined
};

function GameInfoDataTable({ data }: { data: ParamtersCell[] }) {
    const theme = useTheme();

    return (
        <DataTable>
            {
                data.map((cellValue, index) => (
                    <DataTable.Row key={index}>
                        <DataTable.Cell>
                            <DataTableCellTitle iconName={cellValue.icon} title={cellValue.title} />
                        </DataTable.Cell>
                        <DataTable.Cell >
                            <Text style={[{ color: theme.colors.tertiary, fontWeight: 'bold', paddingVertical: 4 }, cellValue.style]}>{cellValue.value}</Text>
                        </DataTable.Cell>
                    </DataTable.Row>
                ))
            }

        </DataTable>
    );
}

export function GameDetails({ navigation, route }: GameDetailsProps) {
    const [gameDetails, setGameDetails] = useState<GameDetailsType>();
    const [detailsCellData, setDetailsCellData] = useState<ParamtersCell[]>();
    const [descriptionCellData, setDescriptionCellData] = useState<ParamtersCell[]>();
    const [isFav, setIsFav] = useState(false);

    const navTheme = useNavTheme();
    const theme = useTheme();

    useEffect(() => {
        navigation.setOptions({ title: route.params.gameTitle })
        getBoardGameById(route.params.gameId)
            .then((details) => {
                if (details) {
                    setDetailsCellData([
                        { icon: "category", title: "Category", value: details.categories.join(', '), style: { color: theme.colors.secondary } },
                        { icon: "psychology", title: "Mechanics", value: details.mechanics.join(', '), style: { color: theme.colors.secondary } },
                        { icon: "schedule", title: "Year published", value: details.yearPublished, style: undefined },
                        { icon: "group", title: "Players", value: `${details.players.min}-${details.players.max}`, style: undefined },
                        { icon: "timer", title: "Play time", value: `${details.playtime.min}-${details.playtime.max}`, style: undefined },
                        { icon: "face", title: "Min. age", value: details.minAge, style: undefined }
                    ]);

                    setDescriptionCellData([
                        { icon: undefined, title: "Designers", value: details.designers.join(', '), style: { color: theme.colors.secondary } },
                        { icon: undefined, title: "Artists", value: details.artists.join(', '), style: { color: theme.colors.secondary } },
                        { icon: undefined, title: "Publishers", value: details.publishers.join(', '), style: { color: theme.colors.secondary } }
                    ]);

                    setGameDetails(details);
                }

            })
    }, [])

    useEffect(() => {
        navigation.setOptions({ headerRight: () => <IconButton icon="star" size={28} iconColor={isFav ? navTheme.colors.primary : navTheme.colors.border} onPress={onFavouriteButton} /> })
    }, [isFav])

    const onFavouriteButton = () => {
        console.log('Favourite state changed -> call to BoardAPI')
        setIsFav(!isFav);
    }

    if (gameDetails && detailsCellData && descriptionCellData) {
        return (
            <ScrollView style={{ margin: 8 }}>
                <Image style={{ width: '100%', height: 256, marginBottom: 8 }} resizeMode="contain" source={{ uri: gameDetails.imageUrl }} />
                <Text variant="labelSmall" style={{ marginBottom: 8, textAlign: 'center' }}>{gameDetails.title}</Text>
                <Card style={{ marginVertical: 8 }}>
                    <Card.Title title="Details" titleStyle={{ fontSize: 18 }} />
                    <GameInfoDataTable data={detailsCellData} />
                </Card>

                <Card style={{ marginVertical: 4 }}>
                    <Card.Title title="Description" titleStyle={{ fontSize: 18 }} left={() => <Icon name="description" color={theme.colors.onSurface} size={34} />} />
                    <Card.Content style={{ marginBottom: 16 }}>
                        <WebDisplay html={gameDetails.description} />
                    </Card.Content>
                    <GameInfoDataTable data={descriptionCellData} />
                </Card>

                <Button
                    icon="play-circle-outline"
                    onPress={() => navigation.navigate("GameSession", { gameId: gameDetails.gameId, gameTitle: gameDetails.title })}
                    buttonColor={theme.colors.tertiary}
                    textColor={theme.colors.onTertiary}
                    style={{ marginTop: 16, width: '80%', alignSelf: 'center' }}
                    labelStyle={{ fontSize: 18 }}
                >
                    Play the game
                </Button>
            </ScrollView>
        );

    }
    else {
        return (
            <ActivityIndicator color={theme.colors.secondary} size={'large'} style={{ marginTop: 32 }} />
        );
    }
}