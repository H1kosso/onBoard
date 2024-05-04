import { useEffect, useState, useRef } from 'react';

import {
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Card, Avatar, useTheme } from 'react-native-paper';
import { TextInput } from 'react-native';

import { SearchGameProps } from '../types/MainStackParamList';
import { GameCardType } from '../types/GameTypes';
import { searchBoardGame } from '../bgg-interface/BGGInterface';

export function SearchGameTitle({ navigation }: SearchGameProps) {
    const theme = useTheme();
    const [text, setText] = useState("");
    const inputRef = useRef(); // Workaround for autoFocus

    return (
        <SafeAreaView style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            backgroundColor: theme.colors.surface,
        }}>
            <Icon name='search' size={30} color={theme.colors.onSurface} />
            <TextInput
                value={text}
                onChangeText={(text: string) => setText(text)}
                onSubmitEditing={() => { navigation.setParams({ searchText: text }) }}
                style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginLeft: 8,
                    color: theme.colors.onSurface,
                    minWidth: '50%'
                }}
                ref={inputRef}
                onLayout={() => inputRef.current.focus()}
            />

            <TouchableOpacity onPress={() => setText("")} style={{}}>
                <Icon name='cancel' size={20} color={theme.colors.onSurface} />
            </TouchableOpacity>


        </SafeAreaView>
    );
}

export function SearchGame({ navigation, route }: SearchGameProps) {
    const [foundGames, setFoundGames] = useState<GameCardType[]>();

    useEffect(() => {
        if (route.params.searchText) {
            searchBoardGame(route.params.searchText)
                .then((games) => {
                    setFoundGames(games);
                });
        }
    }, [route.params.searchText])

    return (
        <SafeAreaView>
            {
                foundGames !== undefined
                    ? <FlatList
                        data={foundGames}
                        renderItem={({ item }) => <GameItem itemProps={item} navProps={{ navigation: navigation, route: route }} />} />
                    : null
            }

        </SafeAreaView>
    );
};

type GameItemProps = {
    itemProps: GameCardType,
    navProps: SearchGameProps
}

function GameItem(props: GameItemProps) {
    const iconSize = 54;
    const navigation = props.navProps.navigation;
    const itemProps = props.itemProps;

    return (
        <Card
            style={{ marginVertical: 4, marginHorizontal: 8 }}
            onPress={() => navigation.navigate("GameDetails", { gameId: itemProps.gameId, gameTitle: itemProps.title })}>
            <Card.Title
                title={itemProps.title}
                subtitle={itemProps.category}
                left={(props) =>
                    <Avatar.Image
                        {...props}
                        size={iconSize}
                        source={{ uri: itemProps.imageUrl }}
                    />
                }
                leftStyle={{ marginRight: 32 }}
            />
        </Card>
    );
}

