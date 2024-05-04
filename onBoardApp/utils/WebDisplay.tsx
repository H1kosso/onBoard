import React from "react";
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from "react-native";
import { useTheme } from "react-native-paper";

const WebDisplay = React.memo(function WebDisplay({ html }: { html: string }) {
    const { width: contentWidth } = useWindowDimensions();
    const theme = useTheme();

    const tagsStyles = {
        body: {
            color: theme.colors.onSurface
        }
    };
    return (
        <RenderHtml
            contentWidth={contentWidth}
            source={{ html }}
            tagsStyles={tagsStyles}
        />
    );
})

export default WebDisplay;