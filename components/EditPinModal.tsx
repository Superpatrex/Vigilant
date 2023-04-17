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

const EditPinModal = ({ route, navigation }) => {
    const { colors } = useTheme();

    const [pinTitle, setPinTitle] = React.useState(route.params.marker.title);
    const [pinDescription, setPinDescription] = React.useState(route.params.marker.description);
    const [pinAddress, setPinAddress] = React.useState(route.params.marker.street);
    const [errorVisible, setErrorVisible] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const editPin = async () => {
        if (pinTitle == '')
        {
            setErrorMessage('The pin must have a type!');
            setErrorVisible(true);
            return;
        }
        setErrorVisible(false);

        var obj = { ID: route.params.marker._id, usercreatedobjectid: route.params.marker.userId, Address: pinAddress, zip: route.params.location.zipCode, State: route.params.location.state, Country: route.params.location.country, Description: pinDescription, Resolved: 0, latitude: (route.params.marker.location.coordinates.latitude || 0), longitude: (route.params.marker.location.coordinates.longitude || 0), title: pinTitle };
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/editPin'),
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
    }

    const data = [
        { key: 1, value: 'Crime' },
        { key: 2, value: 'Disaster' },
        { key: 3, value: 'Accident' },
        { key: 4, value: 'Fire' },
    ]

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: colors.text, marginBottom: 10, }}>Pin Information:</Text>
            <SelectList
                setSelected={(val: string) => setPinTitle(val)}
                data={data}
                save="value"
                placeholder={route.params.marker.title}
                inputStyles={{ color: colors.text }}
                dropdownTextStyles={{ color: colors.text }}
                search={false}
                boxStyles={{ width: 220, }}
            />
            <TextInput style={[styles.input, { marginBottom: 5 }]} autoCorrect={false} onChangeText={text => setPinAddress(text)} placeholder={route.params.marker.street} placeholderTextColor={"#6b6b6b"}></TextInput>
            <TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' onChangeText={text => setPinDescription(text)} placeholder={route.params.marker.description} placeholderTextColor={"#6b6b6b"}></TextInput>
            <Button onPress={() => { editPin()}} title="Done"></Button>
            { errorVisible ?
                <View style={{ height: 30, width: 200, backgroundColor: colors.notification, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "white" }}>{errorMessage}</Text>
                </View>
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
    }
})

export default EditPinModal;