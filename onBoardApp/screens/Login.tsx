
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, TextInput, Image, ToastAndroid, Alert } from 'react-native';
import commonStyles from '../styles/commonStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';

export function Login() {
    const [nick, setNick] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigation = useNavigation();    


    const registerUser = (): void => {
        navigation.navigate('Register');
    }

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '110767044615-71rvt1h5eh00sg6ll796kps45lb7gtec.apps.googleusercontent.com'
        })

    }, []);


    const onGoogleButtonPress = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            const { idToken, user } = await GoogleSignin.signIn();
            const googleCredentials = auth.GoogleAuthProvider.credential(idToken);

            ToastAndroid.show(`Hello ${user.givenName}`, ToastAndroid.SHORT);
            await AsyncStorage.setItem("@token", "true");
            navigation.navigate("TabNav");

            return auth().signInWithCredential(googleCredentials);


        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                ToastAndroid.show("Cancelled", ToastAndroid.SHORT)
            } else if (error.code === statusCodes.IN_PROGRESS) {
                ToastAndroid.show("In progress", ToastAndroid.SHORT)
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                ToastAndroid.show("Play service not available", ToastAndroid.SHORT)
            } else {
                console.log(error)
                ToastAndroid.show("Uknown error", ToastAndroid.SHORT)
            }
        }
    };

    const handleLogin = async () => {
        if (nick.trim() === '' || password.trim() === '') {
            ToastAndroid.show("Enter username and password", ToastAndroid.SHORT);
            return;
        }
        try {
            const response = await axios.post('http://192.168.2.164:3100/api/user/login', {
                username: nick,
                password: password,
            });

            if (response.status === 200) {
                ToastAndroid.show(`Hello ${nick}`, ToastAndroid.SHORT);
                AsyncStorage.setItem("@token", "true");
                navigation.navigate("TabNav");
            }
        } catch (error: any) {
            if (error.response.status === 404) {
                ToastAndroid.show("Such user doesn't exist", ToastAndroid.SHORT);
            } else if (error.response.status === 401) {
                ToastAndroid.show("Wrong password", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show("Unknown error", ToastAndroid.SHORT);
            }
        }
    };

    return (
        <SafeAreaView style={commonStyles.centerContainer}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
                <View style={commonStyles.centerContainer}>
                    <Text style={commonStyles.header}>Login</Text>

                    <View style={commonStyles.formContainer}>
                        <Text style={commonStyles.label}>Nick</Text>
                        <TextInput
                            style={commonStyles.textInput}
                            value={nick}
                            autoCapitalize="none"
                            cursorColor="#000"
                            onChangeText={setNick}
                        />
                    </View>

                    <View style={commonStyles.formContainer}>
                        <Text style={commonStyles.label}>Password</Text>
                        <TextInput
                            style={commonStyles.textInput}
                            value={password}
                            autoCapitalize="none"
                            cursorColor="#000"
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    <Image source={require('../resources/images/onBoard.png')} />

                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity style={commonStyles.button} onPress={handleLogin}>
                            <Text style={commonStyles.button.text}>Login ➡️</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={commonStyles.button} onPress={registerUser}>
                            <Text style={commonStyles.button.text}>Register ➡️</Text>
                        </TouchableOpacity>

                    </View>
                    <GoogleSigninButton
                        style={{ width: 192, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Light}
                        onPress={onGoogleButtonPress}
                    />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
