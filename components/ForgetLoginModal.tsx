import * as React from 'react';
import {
    Text,
    View,
    Button,
  } from 'react-native';
import { useTheme } from '@react-navigation/native';


const ForgetLoginModal = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 30, color: colors.text }}>Kick rocks 🤷‍♂️</Text>
            <Button onPress={() => navigation.goBack()} title="Dismiss"></Button>
        </View>
    );
}

export default ForgetLoginModal;