import { View } from "react-native";
import { Text, useTheme } from "react-native-paper";

import Icon from 'react-native-vector-icons/MaterialIcons'

type DataTableCellTitleProp = {
    iconName: string | undefined,
    title: string
}

export default function DataTableCellTitle({ iconName, title }: DataTableCellTitleProp) {
    const theme = useTheme();

    return (
        <View style={{ flexDirection: 'row' }}>
            <Icon name={iconName} size={20} color={theme.colors.onSurface} />
            <Text style={{ marginLeft: 8, color: theme.colors.onSurface }}>{title}</Text>
        </View>
    );
}