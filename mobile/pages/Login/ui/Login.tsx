import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, TextInput, View } from 'react-native';
import { useLoginMutation } from '../lib/api';
import { storage } from '../../../storage/storage';
import { setAuth } from '../lib/userSlice';
import { useAppDispatch } from '../../../store/store';

export const Login = () => {
    const [ login , { isLoading }] = useLoginMutation();
    const [token, setToken] = useState('');
    const dispatch = useAppDispatch();

    const loginTrigger = async () => {
        try {
            const {data} = await login({token}).unwrap();
            console.log(data);
            storage.set('x-token-access', data.access_token);
            storage.set('X-token-refresh', data.refresh_token);
            dispatch(setAuth());
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter your token"
                value={token}
                onChangeText={setToken}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true} // Assuming token should be hidden
                editable={!isLoading}
            />

            {isLoading ? (
                <ActivityIndicator size="small" color="#0000ff" />
            ) : (
                <Button
                    title="Login"
                    onPress={loginTrigger}
                    disabled={isLoading}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});
