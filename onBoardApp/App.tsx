import { createDrawerNavigator } from '@react-navigation/drawer';

import SearchGame from './screens/SearchGame';

const Drawer = createDrawerNavigator();

function App(): JSX.Element {

  return (
    <Drawer.Navigator>
      <Drawer.Screen name='SearchGame' component={SearchGame} options={{ title: 'Search a game' }} />
    </Drawer.Navigator>

  );
}

export default App;
