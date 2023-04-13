import * as React from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';

import { useTheme } from '@react-navigation/native';

const EditContactScreen = ({ route }) => {
    const { colors } = useTheme();

    const [phoneNumber, setPhoneNumber] = React.useState('');

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.text, marginBottom: 10 }]}>{route.params.details.firstName} {route.params.details.lastName}</Text>
            <View style={[styles.card, { backgroundColor: colors.border, height: 70, marginBottom: 15, }]}>
                <Text style={[styles.cardText, { color: colors.text, fontSize: 15, }]}>Phone Number</Text>
                {/* <Text style={[styles.cardText, { color: colors.primary }]}>{route.params.details.phoneNumber}</Text> */}
                <TextInput placeholder={route.params.details.phoneNumber} onChangeText={text => setPhoneNumber(text)}></TextInput>
            </View>
            <View style={[styles.card, { backgroundColor: colors.border, height: 100 }]}>
                <Text style={[styles.cardText, { color: colors.text, fontSize: 15, }]}>Description</Text>
                <Text style={[styles.cardText, { color: colors.text }]}>{route.params.details.description}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 30,
    },
    card: {
        width: '90%',
        borderRadius: 20,
        padding: 12,
    },
    cardText: {
        fontSize: 20,
    }
})

export default EditContactScreen;