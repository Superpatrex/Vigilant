import * as React from 'react';
import { View, StyleSheet, Text, TextInput, Button, Alert } from 'react-native';
import buildPath from '../buildPath';

import { useTheme } from '@react-navigation/native';

const EditContactScreen = ({ route, navigation }) => {
    const { colors } = useTheme();

    const [firstName, setFirstName] = React.useState(route.params.details.firstName);
    const [lastName, setLastName] = React.useState(route.params.details.lastName);
    const [phoneNumber, setPhoneNumber] = React.useState(route.params.details.phoneNumber);
    const [description, setDescription] = React.useState(route.params.details.description);
    const [canDelete, setCanDelete] = React.useState(false);

    const editContact = async () => {
        var obj = { id: route.params.details.id, firstname: firstName, lastname: lastName, description: description, phonenumber: phoneNumber }
        var js = JSON.stringify(obj);

        try
        {
            var response = await fetch(buildPath('api/editContact'),
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            if (!res.success)
            {
                Alert.alert(res.error);
            }
        }
        catch (e: any)
        {
            Alert.alert(e.toString());
        }
    }

    const deleteContact = async () => {
        var obj = { objectId: route.params.details.id }
        var js = JSON.stringify(obj);

        try
        {
            var response = await fetch(buildPath('api/deleteContact'),
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            if (!res.success)
            {
                Alert.alert(res.error);
            }
        }
        catch (e: any)
        {
            Alert.alert(e.toString());
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", }}>
                <TextInput style={{ fontSize: 30, marginRight: 5, color: colors.text }} placeholder={route.params.details.firstName} onChangeText={text => setFirstName(text)}></TextInput>
                <TextInput style={{ fontSize: 30, color: colors.text }} placeholder={route.params.details.lastName} onChangeText={text => setLastName(text)}></TextInput>
            </View>
            <View style={[styles.card, { backgroundColor: colors.border, height: 70, marginBottom: 15, }]}>
                <Text style={[styles.cardText, { color: colors.text, fontSize: 15, }]}>Phone Number</Text>
                <TextInput style={{ fontSize: 20, color: colors.primary }} placeholder={route.params.details.phoneNumber} onChangeText={text => setPhoneNumber(text)}></TextInput>
            </View>
            <View style={[styles.card, { backgroundColor: colors.border, height: 100 }]}>
                <Text style={[styles.cardText, { color: colors.text, fontSize: 15, }]}>Description</Text>
                <TextInput style={{ fontSize: 20, color: colors.text }} placeholder={route.params.details.description} onChangeText={text => setDescription(text)}></TextInput>
            </View>
            <Button title='Done' onPress={() => {editContact()}}></Button>
            <Button title='Delete' color={colors.notification} onPress={() => {
                if (canDelete)
                {
                    deleteContact();
                    setCanDelete(false);
                    navigation.navigate("Contacts");
                }
                else
                {
                    Alert.alert('Are you sure? Press Delete again to delete');
                    setCanDelete(true);
                }

            }}></Button>
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