import {useTheme} from "react-native-paper";
import {SafeAreaView, Text} from "react-native";
import {searchBoardGame} from "../bgg-interface/BGGInterface";

export function Collection() {
    const paperTheme = useTheme();

    return (
        <SafeAreaView style={{ backgroundColor: paperTheme.colors.background }}>
           <Text>Collection</Text>
        </SafeAreaView>
    );
}
