import * as React from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet,
  } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import buildPath from '../buildPath';

const ForgetLoginModal = ({ navigation }) => {
    const { colors } = useTheme();
    const [email, setEmail] = React.useState('');

    const Reset = async (email: string) => {
        var js = JSON.stringify(email);
        const [errorVisible, setErrorVisible] = React.useState(false);
        const [errorMessage, setErrorMessage] = React.useState('');
        
        try
        {
            const response = await fetch(buildPath('api/resetPassword'),
            {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});
        
            var res = JSON.parse(await response.text());
        
            console.log(res);
            if (res.success)
            {
                // Alert.alert('User created');
                setErrorMessage('Sent email');
                setErrorVisible(true);
            }
            else
            {
                setErrorMessage(res.error);
                setErrorVisible(true);
            }
        }
        catch (e: any)
        {
            throw e;
        }

        navigation.back()
    }

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: colors.text }}>Enter your email and we'll send you a link</Text>
            <TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' autoComplete='email' onChangeText={text => setEmail(text)} placeholder='Enter your email here' placeholderTextColor={"#6b6b6b"}></TextInput>
            <Button onPress={() => Reset(email)} title="Send"></Button>
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

export default ForgetLoginModal;