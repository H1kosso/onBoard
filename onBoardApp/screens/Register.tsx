    import React, { useState } from 'react';
    import { SafeAreaView, Text, TouchableOpacity, View, TextInput, Image, KeyboardAvoidingView, Platform, ToastAndroid } from 'react-native';
    import commonStyles from '../styles/commonStyles';
    import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
    import { useNavigation } from '@react-navigation/native';
    import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


    export function Register() {
        const [nick, setNick] = useState<string>('');
        const [email, setEmail] = useState<string>('');
        const [password, setPassword] = useState<string>('');
        
        const navigation = useNavigation();

        const handleRegister = async () => {

            if(nick.trim() === '' || email.trim() === '' || password.trim() === '') {
                ToastAndroid.show("All fields must be provided", ToastAndroid.SHORT);
                return;
            }
            try {
                const response = await axios.post('http://192.168.2.164:3100/api/user/register', {
                    username: nick,
                    email: email,
                    password: password,
                });
        
                if (response.status === 201) {
                    await AsyncStorage.setItem("@token", "true");
                    navigation.navigate("TabNav");
                    
                } else {
                    const errorData = await response.data;
                    ToastAndroid.show(errorData.message, ToastAndroid.SHORT);
                }
            } catch (error) {
                if(error.response.status === 500) {
                    ToastAndroid.show("Username already exists", ToastAndroid.SHORT);
                }

            }
        };

        return (
            <SafeAreaView style={commonStyles.centerContainer}>
                <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
                    <View style={commonStyles.centerContainer}>
                        <Text style={commonStyles.header}>Join!</Text>

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
                            <Text style={commonStyles.label}>Email</Text>
                            <TextInput
                                style={commonStyles.textInput}
                                value={email}
                                keyboardType='email-address'
                                autoCapitalize="none"
                                cursorColor="#000"                            
                                onChangeText={setEmail}                            
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

                        <View>
                            <TouchableOpacity style={commonStyles.button} onPress={handleRegister}>
                                <Text style={commonStyles.button.text}>Let's play ➡️</Text>
                            </TouchableOpacity>                        
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
