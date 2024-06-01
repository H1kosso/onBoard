import { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    Text,
    TouchableOpacity,
} from 'react-native';

import {
    useTheme,
    Card,
    Avatar
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { TabNavProps } from '../types/MainStackParamList';
import { getHistory } from '../utils/userHistory';
import { useIsFocused } from '@react-navigation/native';

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

export function SearchHistory({ navigation }: TabNavProps) {
    const theme = useTheme();
    const isFocused = useIsFocused();
    const [history, setHistory] = useState<string[]>();

    useEffect(() => {
        getHistory()
            .then((value) => setHistory(value));
    }, [isFocused]);

    const HistoryItem = ({ value }: { value: string }) => {
        return (
            <Card
                mode='contained'
                style={{ backgroundColor: theme.colors.inverseOnSurface, marginHorizontal: 4, marginTop: 8 }}
                contentStyle={{ margin: -6 }}
                onPress={() => navigation.navigate("SearchGame", { searchText: value })}>
                <Card.Title
                    title={value}
                    titleVariant='titleMedium'
                    right={(props) => <Avatar.Icon {...props} size={48} color={theme.colors.onBackground} style={{ backgroundColor: theme.colors.inverseOnSurface, marginRight: 8 }} icon={"history"} />} />
            </Card>
        );
    };

    return (
        <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
            {
                history
                    ?
                    <FlatList
                        data={history.reverse()}
                        renderItem={(item) => <HistoryItem key={item.index} value={item.item} />} />
                    :
                    <></>
            }

        </SafeAreaView>
    );
}
