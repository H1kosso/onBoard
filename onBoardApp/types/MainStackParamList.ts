import { NativeStackScreenProps } from '@react-navigation/native-stack';

type MainStackParamList = {
    TabNav: undefined,
    SearchGame: { searchText: string | undefined },
    GameDetails: { gameId: string, gameTitle: string }
};

export type TabNavProps = NativeStackScreenProps<MainStackParamList, "TabNav">;
export type SearchGameProps = NativeStackScreenProps<MainStackParamList, "SearchGame">;
export type GameDetailsProps = NativeStackScreenProps<MainStackParamList, "GameDetails">;