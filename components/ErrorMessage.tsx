import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const ErrorMessage = ({ errorMessage }) => {
    const { colors } = useTheme();

    return (
        <View style={[styles.errorMessage, { backgroundColor: colors.notification }]}>
            <Text style={{ color: "white" }} adjustsFontSizeToFit={true}>{errorMessage}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    errorMessage: {
        height: 30,
        width: 250,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default ErrorMessage;