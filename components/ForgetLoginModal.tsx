import * as React from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet,
  } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';


const ForgetLoginModal = ({ navigation }) => {
    const { colors } = useTheme();

    const [email, setEmail] = React.useState('');

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: colors.text }}>Enter your email and we'll send you a link</Text>
            <TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' autoComplete='email' onChangeText={text => setEmail(text)} placeholder='Enter your email here' placeholderTextColor={"#6b6b6b"}></TextInput>
            <Button onPress={() => navigation.goBack()} title="Send"></Button>
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