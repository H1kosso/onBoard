import { useEffect, useState } from "react";
import { SafeAreaView, TextInput } from "react-native";

import { Card, Chip, Text, List, useTheme, Icon } from "react-native-paper";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"

import { GameSessionProps } from "../types/MainStackParamList";

export default function GameSession({ navigation, route }: GameSessionProps) {
    const player = 'Dawid'; // TODO: Get this from token or sth.

    const [friendText, setFriendText] = useState<string>("");
    const [friendContainer, setFriendContainer] = useState<string[]>([player]);
    const [winnerIndex, setWinnerIndex] = useState<number>();
    const theme = useTheme();

    useEffect(() => {
        navigation.setOptions({ title: route.params.gameTitle })
    }, []);

    const onFriendTextChange = (text: string) => {
        setFriendText(text);
        if (text.endsWith(" ") || text.endsWith("\n")) {
            if (!text.startsWith(" ") && !text.startsWith("\n"))
                setFriendContainer([...friendContainer, text.split(" ")[0]])

            setFriendText("");
        }
    };

    const onRemoveFriend = (index: number) => {
        setFriendContainer(friendContainer.filter((_, idx) => index !== idx));
        if (index === winnerIndex)
            setWinnerIndex(undefined);
    };

    const onSelectWinner = (index: number) => {
        setWinnerIndex(index);
    };

    const amIAppUser = (index: number) => {
        return index === 0;
    }

    return (
        <SafeAreaView style={{ margin: 4 }}>
            <Text variant="bodyLarge" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Enter some info to save the game session
            </Text>
            <Card contentStyle={{ margin: 8 }}>
                <Card.Title title="Players" titleStyle={{ fontSize: 20 }} left={(props) => <CommunityIcon {...props} color={theme.colors.onSurface} size={32} name="account-group" />} />
                <Text variant="bodySmall" style={{ textAlign: 'center', marginBottom: 4 }}>Select the winner by clicking on the nickname</Text>
                <Card mode="contained" contentStyle={{ flexDirection: 'row', flexWrap: 'wrap', margin: 2 }}>
                    {
                        friendContainer.map((friend, index) =>
                            <Chip
                                key={index}
                                style={{ width: 'auto', marginVertical: 6, marginHorizontal: 2, justifyContent: 'center' }}
                                closeIcon={"close"}
                                icon={(props) => <Icon {...props} color={'gold'} size={20} source={index === winnerIndex ? "crown" : undefined} />}
                                onClose={amIAppUser(index) ? undefined : () => onRemoveFriend(index)}
                                onPress={() => onSelectWinner(index)}
                            >
                                {friend}
                            </Chip>)
                    }

                    <TextInput
                        value={friendText}
                        onChangeText={onFriendTextChange}
                        style={{ color: theme.colors.onSurface }}
                        multiline={true}
                        cursorColor={theme.colors.secondary}
                    />
                </Card>
                <List.Section>
                    <List.Accordion title="The winner is" left={(props) => <List.Icon {...props} icon="crown" />}>
                        <List.Item title="Item" style={{ backgroundColor: theme.colors.background }} onPress={() => console.log('hello')} />
                    </List.Accordion>
                </List.Section>
            </Card>


        </SafeAreaView>
    );
}