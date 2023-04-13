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
import Geolocation, { GeolocationError, GeolocationResponse } from '@react-native-community/geolocation';

import buildPath from '../buildPath';

const AddPinModal = ({ route, navigation }) => {
    const { colors } = useTheme();

    const [pinTitle, setPinTitle] = React.useState('');
    const [pinDescription, setPinDescription] = React.useState('');
    const [location, setLocation] = React.useState<GeolocationResponse>();


    const getRandomNumber = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
    }

    const addPin = async () => {
        // Geolocation.getCurrentPosition(async (info) => await setLocation(info), (error: GeolocationError) => { console.log(error) }, { enableHighAccuracy: true });

        var obj = { usercreatedobjectid: route.params.userId, Address: '4000 Central Florida Blvd', zip: 32816, State: 'Florida', Country: 'United States of America', Description: pinDescription, Resolved: 1, latitude: (route.params.userLocation.coords.latitude || 0) + getRandomNumber(0, 0.005), longitude: (route.params.userLocation.coords.longitude || 0) - getRandomNumber(0, 0.005), title: pinTitle };
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/addPin'),
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            if (!res.success)
            {
                Alert.alert(res.error);
            }
            else
            {
                console.log('Pin added');
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
            <Text style={{ fontSize: 18, color: colors.text }}>Pin Information:</Text>
            <TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' onChangeText={text => setPinTitle(text)} placeholder='Pin title' placeholderTextColor={"#6b6b6b"}></TextInput>
            <TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' onChangeText={text => setPinDescription(text)} placeholder='Description' placeholderTextColor={"#6b6b6b"}></TextInput>
            <Button onPress={() => addPin()} title="Done"></Button>
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

export default AddPinModal;