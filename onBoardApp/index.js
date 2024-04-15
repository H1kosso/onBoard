/**
 * @format
 */
import 'react-native-gesture-handler';
import {
    AppRegistry,
    useColorScheme
} from 'react-native';

import {
    PaperProvider,
    MD3DarkTheme,
    MD3LightTheme,
    adaptNavigationTheme,
} from 'react-native-paper';

import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import App from './App';
import {name as appName} from './app.json';
import { paperThemeLight, paperThemeDark } from './styles/themePaper'

export default function Main() {
    const colorScheme = useColorScheme();
    const { LightTheme, DarkTheme } = adaptNavigationTheme({
        reactNavigationLight: NavigationDefaultTheme,
        reactNavigationDark: NavigationDarkTheme,
    });
    const paperTheme =
        colorScheme === 'light'
            ? { ...MD3LightTheme, ...LightTheme, colors: { ...paperThemeLight.colors, ...LightTheme.colors } }
            : { ...MD3DarkTheme, ...DarkTheme, colors: { ...paperThemeDark.colors, ...DarkTheme.colors } };

    return (
        <PaperProvider theme={paperTheme}>
            <NavigationContainer theme={paperTheme}>
                <App />
            </NavigationContainer>
        </PaperProvider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
