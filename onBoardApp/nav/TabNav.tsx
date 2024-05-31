import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme as useNavTheme } from "@react-navigation/native";
import { SearchHistory, SearchHistoryTitle } from '../screens/SearchHistory';
import { TabNavProps } from '../types/MainStackParamList';

import { Account } from '../screens/Account';

import { Collection } from "../screens/Collection";
import {Challenges} from "../screens/Challenges";


const Tab = createBottomTabNavigator();

export function TabNav({ navigation, route }: TabNavProps) {
    const theme = useNavTheme();

    return (
        <Tab.Navigator>
            <Tab.Screen name="Collection"
                component={Collection}
                options={{
                    title: "Collection",
                    tabBarIcon: (tabInfo) => <Icon name='storage' size={24} color={tabInfo.focused ? theme.colors.primary : theme.colors.text} />
                }}
            />
            <Tab.Screen
                name='SearchHistory'
                component={SearchHistory}
                options={{
                    title: 'Search Game',
                    headerTitle: () => <SearchHistoryTitle navigation={navigation} route={route} />,
                    tabBarIcon: (tabInfo) => <Icon name='search' size={24} color={tabInfo.focused ? theme.colors.primary : theme.colors.text} />
                }}
            />
            <Tab.Screen
                name='Challenges'
                component={Challenges}
                options={{
                    title: 'Challenges',
                    tabBarIcon: (tabInfo) => <Icon name='format-list-numbered' size={24} color={tabInfo.focused ? theme.colors.primary : theme.colors.text} />
                   }}
            />
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    title: "Account",
                    tabBarIcon: (tabInfo) => <Icon name='account-box' size={24} color={tabInfo.focused ? theme.colors.primary : theme.colors.text} />
                }}
            />
        </Tab.Navigator>
    );
}
