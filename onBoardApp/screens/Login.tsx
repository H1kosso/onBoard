import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import commonStyles from '../styles/commonStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

export function Login() {
    const [nick, setNick] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigation = useNavigation();

    const registerUser = () : void => {
        navigation.navigate('Register');
    }

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
                        <TouchableOpacity style={commonStyles.button}>
                            <Text style={commonStyles.button.text}>Login ➡️</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={commonStyles.button} onPress={registerUser}>
                            <Text style={commonStyles.button.text}>Register ➡️</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
