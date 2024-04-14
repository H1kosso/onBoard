import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme as useNavTheme } from "@react-navigation/native";
import { IconButton } from "react-native-paper";

import { GameDetailsProps } from "../types/MainStackParamList";
import { GameDetailsType } from "../types/GameTypes";

export function GameDetails({ navigation, route }: GameDetailsProps) {
    const [isFav, setIsFav] = useState(false);
    const theme = useNavTheme();

    const mockData: GameDetailsType = {
        gameId: route.params.gameId,
        title: route.params.gameTitle,
        category: "Action",
        description: "Battleground: Crossbows &amp; Catapults puts you in the middle of a real fantasy battle and can be played on almost any flat surface.<br/><br/>Carefully place your weapons and warriors to take out your opponent's forces and defenses, Knight or Orc.<br/><br/>Load up the elastic powered weapons to launch the battle discs to do maximum damage to your opponent's side. Use your moves to strategically place your warriors and weapons to both defend your castle and attack your enemy. Aim for the flags and win bonus lives!<br/><br/>Be the first to knock over all your enemies to win!<br/><br/>Includes two complete armies, Knights and Orcs. 80 pieces in total.<br/><br/>First edition in 1983 as Crossbows &amp; Catapults<br/><br/>",
        imageUrl: "https://cf.geekdo-images.com/vbWhXsB-FHNxJWrUAFEjTg__original/img/8uloGSG6JWBVkGV6TAEw4oDsrY0=/0x0/filters:format(jpeg)/pic231219.jpg",
        players: { min: 2, max: 4 },
        playtime: { min: 40, max: 60 },
        suggestedNumOfPlayers: 2,
        suggestedPlayerAge: 4
    }

    useEffect(() => {
        navigation.setOptions({ title: route.params.gameTitle })
    }, [])

    const onFavouriteButton = () => {
        console.log('Favourite state changed -> call to BoardAPI')
        setIsFav(!isFav);
    }

    useEffect(() => {
        navigation.setOptions({ headerRight: () => <IconButton icon="star" size={28} iconColor={isFav ? theme.colors.primary : theme.colors.border} onPress={onFavouriteButton} /> })
    }, [isFav])

    return (
        <SafeAreaView>

        </SafeAreaView>
    );
}