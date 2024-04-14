import { useEffect, useState, useRef } from 'react';

import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    Image
} from 'react-native';

import { TextInput, Card, Avatar } from 'react-native-paper';

import { useTheme as useNavTheme } from '@react-navigation/native';
import { SearchGameProps } from '../types/MainStackParamList';
import { GameCardType } from '../types/GameTypes';

export function SearchGameTitle({ navigation }: SearchGameProps) {
    const theme = useNavTheme();
    const [text, setText] = useState("");
    const inputRef = useRef(); // Workaround for autoFocus

    return (
        <TextInput
            onChangeText={(text: string) => setText(text)}
            onSubmitEditing={() => { navigation.setParams({ searchText: text }) }}
            style={{ minWidth: '100%', fontSize: 18, backgroundColor: theme.colors.card }}
            ref={inputRef}
            onLayout={() => inputRef.current.focus()}
        />
    );
}

export function SearchGame({ route }: SearchGameProps) {
    const mockItems: GameCardType[] = [];

    useEffect(() => {
        if (route.params.searchText) {
            console.log('SearchText changed -> call to BGG api');
            for (let i = 0; i < 20; i++) {
                mockItems.push({ title: 'Game of Thrones', category: 'Action', imageUrl: 'https://cf.geekdo-images.com/vbWhXsB-FHNxJWrUAFEjTg__thumb/img/sSvH-SbDEC-2zF5BvDGNxsytGFs=/fit-in/200x150/filters:strip_icc()/pic231219.jpg' })
            }
        }
    }, [route.params.searchText])

    return (
        <SafeAreaView>
            <FlatList
                data={mockItems}
                renderItem={({ item }) => <GameItem itemProps={item} />} />
        </SafeAreaView>
    );
};

function GameItem({ itemProps }: { itemProps: GameCardType }) {
    const iconSize = 50;

    return (
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
        />
    );
}

