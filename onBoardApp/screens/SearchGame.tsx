import {
    SafeAreaView,
    Text,
} from 'react-native';

import {
    useTheme,
    TextInput,
    Button,
} from 'react-native-paper';

export default function SearchGame() {
    const paperTheme = useTheme();

    return (
        <SafeAreaView style={{ backgroundColor: paperTheme.colors.background, height: '100%' }}>
            <Text style={{ fontSize: 50, color: paperTheme.colors.onBackground }}>Hello world!</Text>
            <Button mode='contained' buttonColor={paperTheme.colors.secondary} onPress={() => { }}>
                Click me!
            </Button>
            <TextInput label={'Input'} mode='outlined' style={{ backgroundColor: paperTheme.colors.background, margin: 8 }} />
        </SafeAreaView>
    );
}