import React, { useEffect, useState, useRef } from 'react';

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
    const mockItems: GameCardType[] = [];

    useEffect(() => {
        if (route.params && route.params.searchText) {
            console.log('SearchText changed -> call to BGG api');
            for (let i = 0; i < 20; i++) {
                mockItems.push({ gameId: i.toString(), title: 'Game of Thrones', category: 'Action', imageUrl: 'https://cf.geekdo-images.com/vbWhXsB-FHNxJWrUAFEjTg__thumb/img/sSvH-SbDEC-2zF5BvDGNxsytGFs=/fit-in/200x150/filters:strip_icc()/pic231219.jpg' })
            }
        }
    }, [route.params])

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

