import AsyncStorage from '@react-native-async-storage/async-storage';

export function getUsername() {
    return AsyncStorage.getItem('@token');
}