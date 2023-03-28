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
                <Button
                    title="Sign In"
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Button
                        title="Register"
                        onPress={() =>
                            navigation.navigate('Register')
                        }
                    />
                    <Button
                        title="Forgot Login?"
                        onPress={() => 
                            Alert.alert('Kick rocks 🤷‍♂️')
                        }
                    />
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
    }
  });

export default Login;