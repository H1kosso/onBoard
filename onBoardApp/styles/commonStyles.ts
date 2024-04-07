import { StyleSheet } from "react-native";
import theme from "./themeOld";

const commonStyles = StyleSheet.create({
    button: {
        backgroundColor: theme.teritary,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 4,

        text: {
            fontSize: 20,
            color: theme.text,
            textAlign: 'center',
        }
    }
});


export default commonStyles;