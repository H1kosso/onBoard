import { Appearance, ColorValue } from 'react-native';

const colorScheme = Appearance.getColorScheme();

type Theme = {
    text: ColorValue,
    background: ColorValue,
    primary: ColorValue,
    secondary: ColorValue,
    teritary: ColorValue
};

let theme: Theme;
if (colorScheme === 'light') {
    theme = {
        text: '#201a18',
        background: '#fffbff',
        primary: '#af3100',
        secondary: '#ffdbd1',
        teritary: '#f5e2a7'
    }
}
else {
    theme = {
        text: '#ede0dc',
        background: '#201a18',
        primary: '#ffb59f',
        secondary: '#5d4037',
        teritary: '#524619'
    }
}

export default theme; 