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
import { SelectList } from 'react-native-dropdown-select-list';

import buildPath from '../buildPath';
import ErrorMessage from './ErrorMessage';

const AddPinModal = ({ route, navigation }) => {
    const { colors } = useTheme();

    const [pinTitle, setPinTitle] = React.useState('');
    const [pinDescription, setPinDescription] = React.useState('');
    const [errorVisible, setErrorVisible] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const addPin = async () => {
        if (pinTitle == '')
        {
            setErrorMessage('The pin must have a type!');
            setErrorVisible(true);
            return;
        }
        setErrorVisible(false);

        var obj = { usercreatedobjectid: route.params.userId, Address: route.params.userLocation.street, zip: route.params.userLocation.zipCode, State: route.params.userLocation.state, Country: route.params.userLocation.country, Description: pinDescription, Resolved: 0, latitude: (route.params.userLocation.latitude || 0), longitude: (route.params.userLocation.longitude || 0), title: pinTitle };
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/addPin'),
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            if (!res.success)
            {
                // Alert.alert(res.error);
                setErrorMessage(res.error);
                setErrorVisible(true);
            }
        }
        catch (e: any)
        {
            Alert.alert(e.toString());
            throw e;
        }

        navigation.goBack();
    }

    const data = [
        { key: 1, value: 'Crime' },
        { key: 2, value: 'Disaster' },
        { key: 3, value: 'Accident' },
        { key: 4, value: 'Fire' },
        { key: 5, value: 'Gas Leak' },
    ]

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: colors.text, marginBottom: 10, }}>Pin Information:</Text>
            <SelectList
                setSelected={(val: string) => setPinTitle(val)}
                data={data}
                save="value"
                placeholder='Pin Type'
                inputStyles={{ color: colors.text }}
                dropdownTextStyles={{ color: colors.text }}
                search={false}
                boxStyles={{ width: 220, }}
            />
            <TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' onChangeText={text => setPinDescription(text)} placeholder='Description' placeholderTextColor={"#6b6b6b"}></TextInput>
            <Button onPress={() => { addPin()}} title="Done"></Button>
            { errorVisible ?
                <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
            : null}
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
    },
})

export default AddPinModal;