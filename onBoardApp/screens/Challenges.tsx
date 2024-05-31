import { Button, ScrollView, Text } from "react-native";
import env from "../env";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {Avatar, Card, IconButton, Paragraph, ProgressBar, useTheme} from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";

export function Challenges({ navigation, route }) {
    const localhost = env.IP_ADDRESS;
    const [challenges, setChallenges] = useState([]);
    const [finished, setFinished] = useState(false);

    const fetchChallenges = () => {
        AsyncStorage.getItem("@token")
            .then(nick => {
                const url = `${localhost}/api/challenge/all?username=${nick}`;
                axios.get(url)
                    .then(response => {
                        setChallenges(response.data);
                        setFinished(true);
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error("Błąd:", error);
                        setFinished(true);
                    });
            })
            .catch(error => {
                console.error("Error retrieving username from AsyncStorage:", error);
                setFinished(true);
            });
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchChallenges();
        }, [])
    );

    const theme = useTheme()
    return (
        <ScrollView>
            <Button
                title="Add new challenge"
                onPress={() => navigation.navigate("AddChallenge", {})}
                buttonColor={theme.colors.tertiary}
                textColor={theme.colors.onTertiary}/>
            {finished ? (
                challenges.length > 0 ? (
                    challenges.map(challenge => (
                        <ChallengeItem key={Math.random()} itemProps={challenge} refreshChallenges={fetchChallenges} />
                    ))
                ) : (
                    <Text>No challenges found</Text>
                )
            ) : (
                <Text>Loading</Text>
            )}
        </ScrollView>
    );
}
function ChallengeItem(props) {
    const {_id, title, description, targetValue, progressValue, username} = props.itemProps;
    const localhost = env.IP_ADDRESS;
    const {refreshChallenges} = props;

    const handleUpdateProgress = () => {
        const updatedProgress = progressValue + 1;
        const url = `${localhost}/api/challenge`;
        const data = {
            username: username,
            title: title,
            progressValue: updatedProgress
        };

        axios.put(url, data)
            .then(response => {
                console.log("Progress updated:", response.data);
                refreshChallenges();
            })
            .catch(error => {
                console.error("Error updating progress:", error);
            });
    };

    const handleDeleteChallenge = () => {
        const url = `${localhost}/api/challenge?title=${title}&username=${username}`;

        axios.delete(url)
            .then(response => {
                console.log("Challenge deleted:", response.data);
                refreshChallenges();
            })
            .catch(error => {
                console.error("Error deleting challenge:", error);
            });
    };

    const progressPercentage = progressValue / targetValue;
    const theme = useTheme();
    return (
        <Card style={{marginVertical: 4, marginHorizontal: 8}}>
            <Card.Title
                title={title}
                right={(props) => <IconButton {...props} icon="delete" onPress={handleDeleteChallenge}/>}
            />
            <Card.Content>
                <Paragraph style={{marginBottom: 8}}>{description}</Paragraph>
                <Paragraph style={{textAlign: 'center', marginVertical: 4}}>Target: {targetValue}</Paragraph>
                <ProgressBar progress={progressPercentage} style={{marginVertical: 8}}/>
                <Paragraph style={{textAlign: 'center'}}>{Math.round(progressPercentage * 100)}%</Paragraph>
                <Button
                    mode="contained"
                    onPress={handleUpdateProgress}
                    color={theme.colors.tertiary}
                    style={{marginTop: 8}}
                    labelStyle={{color: theme.colors.onTertiary}}
                    title={"Update Progress"}
                >
                    Update Progress
                </Button>
            </Card.Content>
        </Card>
    );
}
