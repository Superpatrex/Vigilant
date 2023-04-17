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
import SendSMS from 'react-native-sms'
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';

import buildPath from '../buildPath';

type Contact = {
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: number,
    description: string
};

const TextContactsModal = ({ route, navigation }) => {
    const { colors } = useTheme();
    const [data, setData] = React.useState<Contact[]>([]);
    const [message, setMessage] = React.useState('Example text');
    const [location, setLocation] = React.useState<GeolocationResponse>();

    const getContacts = async () => {
        // Wakka wakka
        var obj = {objectId: route.params.userId}
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/getContacts'),
            {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if (res.error === '')
            {
                setData(res.results);
            }
            else if (res.error === 'User has empty contact')
            {
                // Do nothing
                console.log('User has no contacts');
            }
            else
            {
                Alert.alert(res.error);
            }
        }
        catch (e: any)
        {
            Alert.alert(e.toString());
            throw e;
        }
    }

    const getLocation = () => {
        
        Geolocation.getCurrentPosition(
            position => {
                console.log(position);
                setLocation(position);
            },
            error => {
                // See error code charts below.
                console.log(error.code, error.message);
                setLocation(undefined);
            },
            {
                enableHighAccuracy: true, timeout: 15000, maximumAge: 10000
            },
        );
        console.log(location);
    };

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getContacts();
            getLocation();
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: colors.text }}>Edit Emergency Message:</Text>
            <TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' onChangeText={text => setMessage(text)} placeholder='I need help at (location)' placeholderTextColor={"#6b6b6b"}></TextInput>
            <Button onPress={() => SendSMS.send({
                body: message,
                recipients: ['5155160624'],
                // route.params.data.phoneNumber
                successTypes: ['sent', 'queued'],
                allowAndroidSendWithoutReadPermission: true
            }, (completed, cancelled, error) => {

                console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

        })} title="Send"></Button>
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

export default TextContactsModal;