import * as React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
    Pressable,
    Button,
  } from 'react-native';
import buildPath from '../buildPath';

function Login({ navigation }) {
    const [username, setUsername] = React.useState('err');
    const [password, setPassword] = React.useState('err');
    return (
        <View style={styles.centered}>
            <View style={styles.loginBox}>
                <Text style={{
                    color: "white",
                    fontSize: 50,
                    marginTop: 5
                }}>Login</Text>
                <TextInput style={styles.input} autoComplete='username' textContentType='username' onChangeText={text => setUsername(text)} placeholder="Username" placeholderTextColor={"#6b6b6b"}/>
                <TextInput style={styles.input} autoComplete='password' textContentType='password' secureTextEntry={true} onChangeText={text => setPassword(text)} placeholder="Password" placeholderTextColor={"#6b6b6b"}/>
                <Pressable style={({pressed}) => [{ backgroundColor: pressed ? "#595959" : "#494949" }, styles.buttonStyle]} onPress={async () =>
                {
                    // Waka waka
                    var obj = {userName: username, password: password};
                    var js = JSON.stringify(obj);

                    try
                    {
                        const response = await fetch(buildPath('api/login'),
                        {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});

                        var res = JSON.parse(await response.text());

                        console.log(res);
                        if (res.id <= 0)
                        {
                            Alert.alert('Username or Password incorrect');
                        }
                        else
                        {
                            navigation.navigate("Welcome");
                        }

                    }
                    catch (e: any)
                    {
                        Alert.alert(e.toString());
                        throw e;
                    }
                }}>
                        <Text style={styles.buttonText}>{"Login"}</Text>
                    </Pressable>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <Pressable style={({pressed}) => [{ backgroundColor: pressed ? "#595959" : "#494949" }, styles.smallerButtonStyle]} onPress={() => navigation.navigate("Register")}>
                        <Text style={styles.buttonText}>{"Register"}</Text>
                    </Pressable>
                    <Pressable style={({pressed}) => [{ backgroundColor: pressed ? "#595959" : "#494949" }, styles.smallerButtonStyle]} onPress={() => navigation.navigate('ForgetLoginModal')}>
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
        // backgroundColor:"#494949",
        padding:7,
        margin:15,
        height: 38,
        width: 171,
        borderRadius: 7.5,
        justifyContent: "center",
        alignItems: "center"
    },
    smallerButtonStyle: {
        // backgroundColor:"#494949",
        padding:7,
        margin:10,
        height: 32,
        width: 137,
        borderRadius: 7.5,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText:{
        color:"white",
        fontSize: 15,
    },
  });

export default Login;