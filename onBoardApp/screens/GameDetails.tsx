import { useEffect, useState } from "react";
import { Image, ScrollView, View } from 'react-native';

import { useTheme as useNavTheme } from "@react-navigation/native";
import { IconButton, Text, Card, useTheme, DataTable, ActivityIndicator } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons'
import { StyleProp, TextStyle } from "react-native";

import { GameDetailsProps } from "../types/MainStackParamList";
import { GameDetailsType } from "../types/GameTypes";
import { getBoardGameById } from "../bgg-interface/BGGInterface";
import WebDisplay from "../utils/WebDisplay";

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
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name={cellValue.icon} size={20} color={theme.colors.onSurface} />
                                <Text style={{ marginLeft: 8, color: theme.colors.onSurface }}>{cellValue.title}</Text>
                            </View>
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

    const onFavouriteButton = () => {
        console.log('Favourite state changed -> call to BoardAPI')
        setIsFav(!isFav);
    }

    useEffect(() => {
        navigation.setOptions({ headerRight: () => <IconButton icon="star" size={28} iconColor={isFav ? navTheme.colors.primary : navTheme.colors.border} onPress={onFavouriteButton} /> })
    }, [isFav])

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
            </ScrollView>
        );

    }
    else {
        return (
            <ActivityIndicator size={'large'} style={{ marginTop: 32 }} />
        );
    }
}