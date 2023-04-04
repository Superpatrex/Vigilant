import * as React from 'react';
import {
    Text,
    View,
  } from 'react-native';
import { useTheme } from '@react-navigation/native';


const Welcome = () => {
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 30, color: colors.text }}>Hello, user 👋</Text>
        </View>
    );
}

export default Welcome;