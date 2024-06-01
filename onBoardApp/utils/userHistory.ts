import AsyncStorage from '@react-native-async-storage/async-storage';

const historyKeyAS = "GAME_HISTORY";

export function addHistoryEntry(entry: string) {
    AsyncStorage.getItem(historyKeyAS)
        .then((historyArray) => {
            if (historyArray) {
                const history: string[] = JSON.parse(historyArray);
                history.push(entry);
                AsyncStorage.setItem(historyKeyAS, JSON.stringify(history));
            }
            else {
                AsyncStorage.setItem(historyKeyAS, JSON.stringify([entry]));
            }
        })
        .catch((error) => console.error(historyKeyAS, error));

}

export async function getHistory(): Promise<string[] | undefined> {
    try {
        const historyArray = await AsyncStorage.getItem(historyKeyAS);
        if (historyArray)
            return JSON.parse(historyArray);
        else
            return undefined;
    }
    catch (error) {
        console.error(historyKeyAS, error);
        return undefined;
    }
}