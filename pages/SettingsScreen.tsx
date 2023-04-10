import * as React from 'react';
import { Text, View, Button, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';

const SettingsScreen = ({ navigation }) => {
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 20, color: colors.text }}>Hello!</Text>
            <Button onPress={ () => navigation.navigate("Login") } title="Goodbye"></Button>
        </View>
    );
}

export default SettingsScreen;