import * as React from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet,
    Alert,
  } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

import buildPath from '../buildPath';
import ErrorMessage from './ErrorMessage';

const AddContactModal = ({ route, navigation }) => {
    const { colors } = useTheme();

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [errorVisible, setErrorVisible] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const addContact = async () => {
        var obj = { usercreatedobjectid: route.params.userId, firstname: firstName, lastname: lastName, phonenumber: phoneNumber, description: description };
        var js = JSON.stringify(obj);

        try
        {
            var response = await fetch(buildPath('api/addContact'),
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            if (res.success)
            {
                navigation.goBack();
            }
            else
            {
                setErrorMessage(res.error);
                setErrorVisible(true);
            }
        }
        catch (e: any)
        {
            Alert.alert(e.toString());
            throw e;
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            { errorVisible ? <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
            : null }
            <Text style={{ fontSize: 18, color: colors.text }}>Enter contact details:</Text>
            <TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' onChangeText={text => setFirstName(text)} placeholder='First name' placeholderTextColor={"#6b6b6b"}></TextInput>
            <TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' onChangeText={text => setLastName(text)} placeholder='Last name' placeholderTextColor={"#6b6b6b"}></TextInput>
            <TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' onChangeText={text => setPhoneNumber(text)} placeholder='Phone number' placeholderTextColor={"#6b6b6b"}></TextInput>
            <TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' onChangeText={text => setDescription(text)} placeholder='Description (optional)' placeholderTextColor={"#6b6b6b"}></TextInput>
            <Button onPress={() => addContact()} title="Add"></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 45,
        width: 289,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        margin: 15,
        backgroundColor: "white",
        color: "black",
    }
})

export default AddContactModal;