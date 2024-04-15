import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNav } from './nav/TabNav';
import { SearchGameTitle, SearchGame } from './screens/SearchGame';
import { GameDetails } from './screens/GameDetails';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {

  return (
    <Stack.Navigator>
      <Stack.Screen name='TabNav' component={TabNav} options={{ headerShown: false }} />
      <Stack.Screen name="SearchGame" component={SearchGame}
        options={({ route, navigation }) => ({ headerTitle: () => <SearchGameTitle route={route} navigation={navigation} /> })} />
      <Stack.Screen name="GameDetails" component={GameDetails} />
    </Stack.Navigator>
  );
}

export default App;
