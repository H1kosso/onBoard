/**
 * @format
 */
import {
    AppRegistry,
    useColorScheme
} from 'react-native';

import {
    PaperProvider,
    MD3DarkTheme,
    MD3LightTheme,
} from 'react-native-paper';

import App from './App';
import {name as appName} from './app.json';
import { paperThemeLight, paperThemeDark } from './styles/themePaper'

export default function Main() {
    const colorScheme = useColorScheme();
    const paperTheme =
        colorScheme === 'light'
            ? { ...MD3LightTheme, colors: paperThemeLight.colors }
            : { ...MD3DarkTheme, colors: paperThemeDark.colors };

    return (
        <PaperProvider theme={paperTheme}>
            <App />
        </PaperProvider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
