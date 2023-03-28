import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    useColorScheme,
    View,
    Button,
    Alert,
  } from 'react-native';

const Register = ({ navigation }) => {
    return (
        <View style={styles.centered}>
            <View style={styles.registerBox}>
                <Text style={{
                    color: "white",
                    fontSize: 50,
                    marginTop: 5
                }}>Register</Text>
                <View style={{
                    width: 285,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <TextInput style={styles.shortInput} placeholder="First Name" placeholderTextColor={"#6b6b6b"}/>
                    <TextInput style={styles.shortInput} placeholder="Last Name" placeholderTextColor={"#6b6b6b"}/>
                </View>
                <TextInput style={styles.input} placeholder="Email" placeholderTextColor={"#6b6b6b"}/>
                <TextInput style={styles.input} placeholder="Username" placeholderTextColor={"#6b6b6b"} />
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor={"#6b6b6b"}/>
                <Button
                    title="Register"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    registerBox: {
      backgroundColor: "#202020",
      height: 485,
      width: 347,
      borderRadius: 15,
      // flex: 1,
      // justifyContent: "center",
      alignItems: "center",
    },
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
    shortInput: {
        height: 45,
        width: 135,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: "white",
        color: "black"
    },
  });

export default Register;