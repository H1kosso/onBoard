import { useEffect, useState } from "react";
import { SafeAreaView, View, TextInput } from "react-native";

import { Card, Chip, Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons"

import { GameSessionProps } from "../types/MainStackParamList";

export default function GameSession({ navigation, route }: GameSessionProps) {
    const player = 'Dawid'; // TODO: Get this from token or sth.

    const [friend, setFriend] = useState<string>("");
    const [friendContainer, setFriendContainer] = useState<string[]>([]);
    const theme = useTheme();

    useEffect(() => {
        navigation.setOptions({ title: route.params.gameTitle })
    }, []);

    const onFriendTextChange = (text: string) => {
        setFriend(text);
        if (text.endsWith(" ") || text.endsWith("\n")) {
            if (!text.startsWith(" ") && !text.startsWith("\n"))
                setFriendContainer([...friendContainer, text.split(" ")[0]])

            setFriend("");
        }
    };

    const onRemoveFriend = (index: number) => {
        setFriendContainer(friendContainer.filter((_, idx) => index !== idx));
    }

    return (
        <SafeAreaView style={{ margin: 4 }}>
            <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
                Enter some info to save the game session
            </Text>
            <Card>
                <Card.Title title="Friends" left={() => <Icon size={32} name="groups" />} />
                <Card mode="contained" style={{ margin: 8 }} contentStyle={{ flexDirection: 'row', flexWrap: 'wrap', margin: 2 }}>
                    {
                        friendContainer.map((friend, index) =>
                            <Chip key={index} style={{ width: 'auto', marginVertical: 6, marginHorizontal: 2, justifyContent: 'center' }} closeIcon="close" onClose={() => onRemoveFriend(index)}>{friend}</Chip>)
                    }

                    <TextInput
                        value={friend}
                        onChangeText={onFriendTextChange}
                        style={{ color: theme.colors.onSurface }}
                        multiline={true}
                        cursorColor={theme.colors.secondary}
                    />
                </Card>
            </Card>
        </SafeAreaView>
    );
}