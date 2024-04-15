import { useEffect, useState, useRef } from 'react';

import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';

import { TextInput, Card, Avatar, Button } from 'react-native-paper';

import { useTheme as useNavTheme } from '@react-navigation/native';
import { SearchGameProps } from '../types/MainStackParamList';
import { GameCardType } from '../types/GameTypes';

export function SearchGameTitle({ navigation }: SearchGameProps) {
    const theme = useNavTheme();
    const [text, setText] = useState("");
    const inputRef = useRef(); // Workaround for autoFocus

    return (
        <SafeAreaView style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
        }}>
            <TextInput
                value={text}
                onChangeText={(text: string) => setText(text)}
                onSubmitEditing={() => { navigation.setParams({ searchText: text }) }}
                style={{ minWidth: '80%', marginStart: 16, fontSize: 18, backgroundColor: theme.colors.card }}
                ref={inputRef}
                onLayout={() => inputRef.current.focus()}
            />
            {
                text !== "" ?
                    <TouchableOpacity onPress={() => setText("")} style={{}}>
                        <Text>✖</Text>
                    </TouchableOpacity>
                    : <></>
            }

        </SafeAreaView>
    );
}

export function SearchGame({ navigation, route }: SearchGameProps) {
    const mockItems: GameCardType[] = [];

    useEffect(() => {
        if (route.params.searchText) {
            console.log('SearchText changed -> call to BGG api');
            for (let i = 0; i < 20; i++) {
                mockItems.push({ gameId: i.toString(), title: 'Game of Thrones', category: 'Action', imageUrl: 'https://cf.geekdo-images.com/vbWhXsB-FHNxJWrUAFEjTg__thumb/img/sSvH-SbDEC-2zF5BvDGNxsytGFs=/fit-in/200x150/filters:strip_icc()/pic231219.jpg' })
            }
        }
    }, [route.params.searchText])

    return (
        <SafeAreaView>
            <FlatList
                data={mockItems}
                renderItem={({ item }) => <GameItem itemProps={item} navProps={{ navigation: navigation, route: route }} />} />
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

