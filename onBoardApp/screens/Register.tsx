import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import commonStyles from '../styles/commonStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

export function Register() {
    const [nick, setNick] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    
    const navigation = useNavigation();

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
                        <Text style={commonStyles.label}>Name</Text>
                        <TextInput
                            style={commonStyles.textInput}
                            value={name}
                            autoCapitalize="none"
                            cursorColor="#000"
                            onChangeText={setName}                            
                        />
                    </View>

                    <View style={commonStyles.formContainer}>
                        <Text style={commonStyles.label}>Surname</Text>
                        <TextInput
                            style={commonStyles.textInput}
                            value={surname}
                            autoCapitalize="none"
                            cursorColor="#000"
                            onChangeText={setSurname}                            
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
                        <TouchableOpacity style={commonStyles.button}>
                            <Text style={commonStyles.button.text}>Let's play ➡️</Text>
                        </TouchableOpacity>                        
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
