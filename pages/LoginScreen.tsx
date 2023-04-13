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
import { useTheme } from '@react-navigation/native';
import buildPath from '../buildPath';

function LoginScreen({ navigation }) {
    const { colors } = useTheme();
    const [username, setUsername] = React.useState('err');
    const [password, setPassword] = React.useState('err');
    
    const doLogin = async () => {
        // Waka waka
        var obj = {login: username, pass: password};
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/login'),
            {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if (res.error === '')
            {
                navigation.navigate('Home', {
                    userId: res._id,
                });
            }
            else
            {
                Alert.alert('Username or Password incorrect');
            }

        }
        catch (e: any)
        {
            Alert.alert(e.toString());
            throw e;
        }
    }

    return (
        <View style={styles.centered}>
            <View style={{ height: '30%', justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: colors.text, fontSize: 25 }}>Welcome Back</Text>
            </View>
            <View style={[styles.loginBox, { backgroundColor: colors.card }]}>
                <Text style={{
                    color: colors.card,
                    fontSize: 50,
                    marginTop: 5
                }}>Login</Text>
                <TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' autoComplete='username' textContentType='username' onChangeText={text => setUsername(text)} placeholder="Username" placeholderTextColor={"#6b6b6b"}/>
                <TextInput style={styles.input} autoCorrect={false} autoComplete='password' textContentType='password' secureTextEntry={true} onChangeText={text => setPassword(text)} placeholder="Password" placeholderTextColor={"#6b6b6b"}/>
                <Pressable style={({pressed}) => [{ backgroundColor: pressed ? colors.primary : colors.primary }, styles.buttonStyle]} onPress={() => doLogin()}>
                    <Text style={styles.buttonText}>{"Login"}</Text>
                </Pressable>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '35%'
                }}>
                    <Button onPress={ () => navigation.navigate('ForgetLoginModal') } title='Forget Login?' ></Button>
                    <Button onPress={ () => navigation.navigate("Register") } title="New here? Sign Up" ></Button>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column"
    },
    loginBox: {
        backgroundColor: "#202020",
        // height: 390,
        height: '70%',
        // width: 347,
        width: '100%',
        // borderRadius: 35,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        // flex: 1,
        // justifyContent: "center",
        alignItems: "center",
    },
    input: {
        height: 45,
        width: 300,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        margin: 15,
        backgroundColor: "white",
        color: "black",
    },
    buttonStyle:{
        // backgroundColor:"#494949",
        padding:7,
        margin:15,
        height: 38,
        width: 230,
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
        fontSize: 20,
    },
  });

export default LoginScreen;