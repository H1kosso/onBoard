import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, ToastAndroid, View } from "react-native";

import { Card, Chip, Text, useTheme, Icon, DataTable, Button } from "react-native-paper";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"

import { GameSessionProps } from "../types/MainStackParamList";
import { GameSessionType } from "../types/GameTypes";
import DataTableCellTitle from "../components/DataTableCellTitle";
import { getUsername } from "../utils/userCredentials";
import axios from "axios";
import env from "../env";

type GameDetailsType = {
    playtime: number | undefined,
    location: string | undefined
};

type SubmitButtonProps = {
    buttonColor: string,
    textColor: string,
    contentText: string
}

export default function GameSession({ navigation, route }: GameSessionProps) {
    const [friendText, setFriendText] = useState<string>("");
    const [friendContainer, setFriendContainer] = useState<string[]>([]);
    const [winnerIndex, setWinnerIndex] = useState<number>();

    const [gameDetails, setGameDetails] = useState<GameDetailsType>({ playtime: undefined, location: undefined });

    const theme = useTheme();

    const [submitButtonProps, setSubmitButtonProps] = useState<SubmitButtonProps>({ buttonColor: theme.colors.primary, textColor: theme.colors.onPrimary, contentText: "Save" });

    const localhost = env.IP_ADDRESS;

    useEffect(() => {
        navigation.setOptions({ title: route.params.gameTitle })
        getUsername()
            .then((appUserName) => {
                if (appUserName)
                    setFriendContainer([appUserName]);
            });
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
    };

    const getAppUserName = () => {
        return friendContainer[0];
    }


    const onSubmitGameSession = async () => {
        const date = new Date();
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;

        if (winnerIndex !== undefined && gameDetails.location && gameDetails.playtime) {
            const cleanedFriends = friendContainer.map(f => f.trim());
            const dataToSend: GameSessionType = {                
                username: getAppUserName(),
                gameId: route.params.gameId,
                location: gameDetails.location,
                date: formattedDate,
                players: cleanedFriends.join(','),
                playtime: gameDetails.playtime,
                winner: cleanedFriends[winnerIndex]
            };

            try {
                axios.post(`${localhost}/api/gamehistory`, dataToSend);

            } catch (error) {
                ToastAndroid.show("Something wrong while saving game session", ToastAndroid.SHORT);
            }
            console.log(`GameSession - submit game record: ${JSON.stringify(dataToSend)}`);
            setSubmitButtonProps({ buttonColor: theme.colors.tertiary, textColor: theme.colors.onTertiary, contentText: "Success!" });
            setTimeout(() => { navigation.goBack(); }, 1000);
        }
        else {
            setSubmitButtonProps({ buttonColor: theme.colors.error, textColor: theme.colors.onError, contentText: "Something's missing" });
        }

    };

    return (
        <SafeAreaView style={{ margin: 4 }}>
            <Text variant="bodyLarge" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                Enter some info to save the game session
            </Text>
            <Card style={style.card} contentStyle={{ margin: 8 }}>
                <Card.Title title="Players" titleVariant="titleLarge" left={(props) => <CommunityIcon {...props} color={theme.colors.onSurface} size={32} name="account-group" />} />
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
            </Card>

            <Card style={style.card}>
                <Card.Title title="Game details" titleVariant="titleLarge" left={(props) => <CommunityIcon {...props} color={theme.colors.onSurface} size={32} name="checkerboard" />} />
                <DataTable>
                    <DataTable.Row style={style.dataTableRow}>
                        <DataTable.Cell>
                            <DataTableCellTitle iconName="timer" title="Playing time" />
                        </DataTable.Cell>
                        <DataTable.Cell>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
                                <TextInput
                                    keyboardType="numeric"
                                    onChangeText={(text: string) => { setGameDetails({ ...gameDetails, playtime: parseInt(text) }) }}
                                    style={[{ color: theme.colors.primary, backgroundColor: theme.colors.backdrop }, style.detailInput]}
                                    cursorColor={theme.colors.primary}
                                />
                                <Text style={{ paddingStart: 4 }}>min</Text>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row style={style.dataTableRow}>
                        <DataTable.Cell>
                            <DataTableCellTitle iconName="map" title="Location" />
                        </DataTable.Cell>
                        <DataTable.Cell>
                            <TextInput
                                onChangeText={(text: string) => { setGameDetails({ ...gameDetails, location: text }); }}
                                style={[{ marginVertical: 4, color: theme.colors.primary, backgroundColor: theme.colors.backdrop }, style.detailInput]}
                                cursorColor={theme.colors.primary}
                            />
                        </DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </Card>
            <Button
                onPress={onSubmitGameSession}
                buttonColor={submitButtonProps.buttonColor}
                textColor={submitButtonProps.textColor}
                style={{ marginTop: 8, width: '80%', alignSelf: 'center', padding: 4 }}
                labelStyle={{ fontSize: 20 }}
            >
                {submitButtonProps.contentText}
            </Button>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    card: {
        marginVertical: 4
    },
    dataTableRow: {
        marginVertical: 4
    },
    detailInput: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'right',
        borderRadius: 6,
        minWidth: 48,
    }

});