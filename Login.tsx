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
    Pressable,
  } from 'react-native';

const Stack = createNativeStackNavigator();

function Login({ navigation }) {
    let number = 5;
    return (
        <View style={styles.centered}>
            <View style={styles.loginBox}>
                <Text style={{
                    color: "white",
                    fontSize: 50,
                    marginTop: 5
                }}>Login</Text>
                <TextInput style={styles.input} placeholder="Username" placeholderTextColor={"#6b6b6b"}/>
                <TextInput style={styles.input} placeholder="Password" placeholderTextColor={"#6b6b6b"}/>
                <Pressable style={styles.buttonStyle} onPress={() => Alert.alert('It\'ll log you in eventually.')}>
                        <Text style={styles.buttonText}>{"Login"}</Text>
                    </Pressable>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    
                    <Pressable style={styles.buttonStyle} onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.buttonText}>{"Register"}</Text>
                    </Pressable>
                    <Pressable style={styles.buttonStyle} onPress={() => Alert.alert("Kick rocks 🤷‍♂️")}>
                        <Text style={styles.buttonText}>{"Forgot Login?"}</Text>
                    </Pressable>
                </View>
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
    loginBox: {
      backgroundColor: "#202020",
      height: 390,
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
    separator: {
      marginVertical: 8,
      borderBottomColor: "#FFFFFF",
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    buttonStyle:{
        backgroundColor:"#494949",
        padding:7,
        margin:10,
    },
    buttonText:{
        color:"white",
    },
  });

export default Login;