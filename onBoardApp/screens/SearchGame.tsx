import { useEffect, useState, useRef } from 'react';

import {
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Card, Avatar, useTheme, ActivityIndicator } from 'react-native-paper';

import { SearchGameProps } from '../types/MainStackParamList';
import { GameCardType } from '../types/GameTypes';
import { searchBoardGame } from '../bgg-interface/BGGInterface';
import { addHistoryEntry } from '../utils/userHistory';

export function SearchGameTitle({ navigation, route }: SearchGameProps) {
    const theme = useTheme();
    const [text, setText] = useState<string>();
    const inputRef = useRef(); // Workaround for autoFocus

    useEffect(() => {
        const newText = route.params.searchText;
        if (newText) {
            setText(newText);
        }
    }, [])

    const onSubmitSearchText = () => {
        if (text)
            addHistoryEntry(text);
        navigation.setParams({ searchText: text })
    }

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
                onSubmitEditing={onSubmitSearchText}
                style={{
                    fontWeight: 'bold',
                    fontSize: 18,
                    marginLeft: 8,
                    color: theme.colors.onSurface,
                    minWidth: '50%'
                }}
                ref={inputRef}
                onLayout={text ? undefined : () => inputRef.current.focus()}
            />

            <TouchableOpacity onPress={() => setText("")} style={{}}>
                <Icon name='cancel' size={20} color={theme.colors.onSurface} />
            </TouchableOpacity>


        </SafeAreaView>
    );
}

export function SearchGame({ navigation, route }: SearchGameProps) {
    const [foundGames, setFoundGames] = useState<GameCardType[] | undefined>([]);

    useEffect(() => {
        const text = route.params.searchText;
        if (text) {
            setFoundGames(undefined);
            searchBoardGame(text)
                .then((games) => {
                    setFoundGames(games);
                });
        }
    }, [route.params])

    return (
        <SafeAreaView>
            {
                foundGames !== undefined
                    ? <FlatList
                        data={foundGames}
                        renderItem={({ item }) => <GameItem itemProps={item} navProps={{ navigation: navigation, route: route }} />} />
                    : <ActivityIndicator size={'large'} style={{ marginTop: 32 }} />
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
    const helperUri = "https://cf.geekdo-images.com/NaVK216SnjDz3VLr5kKOAg__original/img/_fR_-LU6T4zfa901SvBAx3V8O3k=/0x0/filters:format(jpeg)/pic350302.jpg";
    return (
        <Card
            style={{ marginVertical: 4, marginHorizontal: 8 }}
            onPress={() => navigation.navigate("GameDetails", { gameId: itemProps.gameId, gameTitle: itemProps.title })}>
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
        </Card>
    );
}

