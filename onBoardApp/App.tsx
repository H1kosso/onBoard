import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNav } from './nav/TabNav';
import { SearchGameTitle, SearchGame } from './screens/SearchGame';
import { GameDetails } from './screens/GameDetails';
import { Login } from './screens/Login';
import { Register } from './screens/Register';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchHistory } from './screens/SearchHistory';
import SplashScreen from './screens/SplashScreen';
import GameSession from './screens/GameSession';
import { AddGame } from "./screens/AddGame";
import { Stats } from "./screens/Stats";
import {Challenges} from "./screens/Challenges";
import {AddChallenge} from "./screens/AddChallenge";


const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [initialRouteName, setInitialRouteName] = useState<string>('Login');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('@token');
    console.log("Is signed in? -> " + !!token)
    setIsLoggedIn(!!token);
    setInitialRouteName(!!token ? 'SearchHistory' : 'Login');
  };

  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name='TabNav' component={TabNav} options={{ headerShown: false }} />
      <Stack.Screen name="SearchGame" component={SearchGame}
        options={({ route, navigation }) => ({ headerTitle: () => <SearchGameTitle route={route} navigation={navigation} /> })} />
      <Stack.Screen name="GameDetails" component={GameDetails} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name='GameSession' component={GameSession} options={{ title: 'Create the game session' }} />
      <Stack.Screen name='AddGame' component={AddGame} options={{ title: 'Add game to collection' }} />
      <Stack.Screen name='Stats' component={Stats} options={{ title: 'Check stats' }} />
      <Stack.Screen name='Challenges' component={Challenges} options={{ title: 'Challenges' }} />
      <Stack.Screen name='AddChallenge' component={AddChallenge} options={{ title: 'Add new challenge' }} />

    </Stack.Navigator>
  );
}


export default App;
