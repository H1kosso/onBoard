import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('@token');
      if (token) {        
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'TabNav' }] 
          });
        }, 2000);
      } else {        
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
          });
        }, 2000);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>      
      <Image style={{marginBottom: 20}} source={require('../resources/images/onBoard.png')}></Image>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SplashScreen;
