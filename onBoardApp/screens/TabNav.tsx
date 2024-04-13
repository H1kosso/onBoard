import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { SearchHistory, SearchHistoryTitle } from './SearchHistory';

import { TabNavProps } from '../types/MainStackParamList';

const Tab = createBottomTabNavigator();

export function TabNav({ navigation, route }: TabNavProps) {

    return (
        <Tab.Navigator>
            <Tab.Screen name='SearchHistory' component={SearchHistory} options={{
                title: 'Search Game',
                headerTitle: () => <SearchHistoryTitle navigation={navigation} route={route} />,
            }} />
        </Tab.Navigator>
    );
}