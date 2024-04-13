import { NativeStackScreenProps } from '@react-navigation/native-stack';

type MainStackParamList = {
    TabNav: undefined,
    SearchGame: { searchText: string | undefined },
};

export type TabNavProps = NativeStackScreenProps<MainStackParamList, "TabNav">;
export type SearchGameProps = NativeStackScreenProps<MainStackParamList, "SearchGame">;