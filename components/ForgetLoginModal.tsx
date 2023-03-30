import * as React from 'react';
import {
    Text,
    View,
    Button,
  } from 'react-native';

const ForgetLoginModal = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{fontSize: 30}}>Kick rocks 🤷‍♂️</Text>
            <Button onPress={() => navigation.goBack()} title="Dismiss"></Button>
        </View>
    );
}

export default ForgetLoginModal;