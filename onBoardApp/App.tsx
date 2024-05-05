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
import React from 'react';

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
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
      <Stack.Screen name='TabNav' component={TabNav} options={{ headerShown: false }} />
      <Stack.Screen name="SearchGame" component={SearchGame}
        options={({ route, navigation }) => ({ headerTitle: () => <SearchGameTitle route={route} navigation={navigation} /> })} />
      <Stack.Screen name="GameDetails" component={GameDetails} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="Register" component={Register}  options={{headerShown: false}}/>
      <Stack.Screen name='SearchHistory' component={SearchHistory} />
    </Stack.Navigator>
  );
}


export default App;
