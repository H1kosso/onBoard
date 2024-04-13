import { useEffect, useState } from 'react';

import {
    SafeAreaView,
    Text,
    FlatList,
} from 'react-native';

import { TextInput } from 'react-native-paper';

import { useTheme as useNavTheme } from '@react-navigation/native';
import { SearchGameProps } from '../types/MainStackParamList';

export function SearchGameTitle({ navigation }: SearchGameProps) {
    const theme = useNavTheme();
    const [text, setText] = useState("");

    return (
        <TextInput onChangeText={(text: string) => setText(text)} onSubmitEditing={() => { navigation.setParams({ searchText: text }) }} style={{ minWidth: '100%', fontSize: 18, backgroundColor: theme.colors.card }} />
    );
}

export const SearchGame = ({ route }: SearchGameProps) => {
    useEffect(() => {
        if (route.params.searchText) {
            console.log('SearchText changed -> call to BGG api');
        }

    }, [route.params.searchText])

    return (
        <SafeAreaView>
            <Text>{route.params.searchText}</Text>
        </SafeAreaView>
    );
};


