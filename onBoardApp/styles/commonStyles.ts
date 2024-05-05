import { StyleSheet, Dimensions } from "react-native";
import { paperThemeDark } from "./themePaper";
import { black, white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const { width } = Dimensions.get('window');

const commonStyles = StyleSheet.create({
    button: {
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 12,
        borderColor: "#000",
        borderWidth: 1,
        backgroundColor: "#400",
        width: 150,

        text: {
            fontSize: 15,
            textAlign: 'center',
        }
    },

    header: {
        fontSize: 36,
        fontWeight: "bold",
        color: paperThemeDark.colors.primary
    },

    centerContainer: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        backgroundColor: "#512F2F"        
    },    

    formContainer: {
        display: "flex",
        justifyContent: "flex-start",
        marginVertical: 20
    },

    label: {
        fontSize: 18,
        fontWeight: "300",
        color: 'white'
    },

    textInput: {
        width: width - 50,
        height: "auto",
        borderRadius: 10,
        backgroundColor: "#FFF",
        color: '#000'

    },
    
});


export default commonStyles;