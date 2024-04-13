import {
    SafeAreaView,
    Text,
    TouchableOpacity,
} from 'react-native';

import {
    useTheme,
} from 'react-native-paper';

import { TabNavProps } from '../types/MainStackParamList';

export function SearchHistoryTitle({ navigation }: TabNavProps) {
    const theme = useTheme();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("SearchGame", { searchText: undefined })}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, padding: 8, backgroundColor: theme.colors.backdrop }}>Search for a game...</Text>
        </TouchableOpacity>
    );
}

export function SearchHistory() {
    const paperTheme = useTheme();

    return (
        <SafeAreaView style={{ backgroundColor: paperTheme.colors.background }}>
            <Text>Search history or some other shit</Text>
        </SafeAreaView>
    );
}