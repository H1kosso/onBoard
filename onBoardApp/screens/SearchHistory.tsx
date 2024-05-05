import {
    SafeAreaView,
    Text,
    TouchableOpacity,
} from 'react-native';

import {
    useTheme,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { TabNavProps } from '../types/MainStackParamList';
import Button = Icon.Button;
import { searchBoardGame } from "../bgg-interface/BGGInterface";

export function SearchHistoryTitle({ navigation }: TabNavProps) {
    const theme = useTheme();

    return (
        <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: theme.colors.surface,
        }}
            onPress={() => navigation.navigate("SearchGame", { searchText: undefined })}>

            <Icon name='search' size={30} color={theme.colors.onSurface} />
            <Text style={{
                fontWeight: 'bold',
                fontSize: 18,
                marginLeft: 8,
                minWidth: '50%',
                color: theme.colors.onSurface
            }}>Search for a game</Text>
        </TouchableOpacity>
    );
}

export function SearchHistory() {
    const paperTheme = useTheme();

    return (
        <SafeAreaView style={{ backgroundColor: paperTheme.colors.background }}>
            <Text style={{ color: paperTheme.colors.onBackground }}>Search history/categories or other parameters but idk if api will support this</Text>

            <Button onPress={searchBoardGame}>Test</Button>


        </SafeAreaView>
    );
}
