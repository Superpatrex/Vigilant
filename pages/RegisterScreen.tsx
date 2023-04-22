import * as React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
    Pressable,
  } from 'react-native';
import { useTheme } from '@react-navigation/native';
import buildPath from '../buildPath';
import ErrorMessage from '../components/ErrorMessage';
import md5 from '../components/md5';

const RegisterScreen = ({ navigation }) => {
    const { colors } = useTheme();

    const [fName, setfName] = React.useState('err');
    const [lName, setlName] = React.useState('err');
    const [email, setEmail] = React.useState('err');
    const [username, setUsername] = React.useState('err');
    const [password, setPassword] = React.useState('err');
    const [confirmPassword, setConfirmPassword] = React.useState('rre');
    const [errorVisible, setErrorVisible] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const validatePassword = (password: string) => {
        let passwordRestrictions = /(?=.*\d)(?=.*[A-Za-z])(?=.*[?!@#$%^&*]).{8,32}$/;

        return passwordRestrictions.test(password);
    }

    const doRegister = async (fName: string, lName: string, email: string, username: string, password: string) => {

        if (password != confirmPassword)
        {
            // Alert.alert("Passwords do not match");
            setErrorMessage('Passwords do not match');
            setErrorVisible(true);
            return;
        }

        if (!validatePassword(password))
        {
            setErrorMessage('Password does not meet requirements');
            setErrorVisible(true);
            return;
        }
        setErrorVisible(false);

        let hash = md5(password);

        // Wakka wakka
        var obj = {firstname: fName, lastname: lName, login: username, pass: hash, email: email, regioncode: 5, countrycode: 5};
        var js = JSON.stringify(obj);
        
        try
        {
            const response = await fetch(buildPath('api/signup'),
            {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});
        
            var res = JSON.parse(await response.text());
        
            console.log(res);
            if (res.success)
            {
                // Alert.alert('User created');
                setErrorMessage('User created');
                setErrorVisible(true);
            }
            else
            {
                Alert.alert(res.error);
                setErrorMessage(res.error);
                setErrorVisible(true);
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
                <Text style={{ color: colors.text, fontSize: 25, marginBottom: 10, }}>Hello There</Text>
                { errorVisible ?
                    <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
                : null }
            </View>
            <View style={[styles.registerBox, { backgroundColor: colors.card }]}>
                <Text style={{
                    color: colors.card,
                    fontSize: 40,
                    marginTop: 5
                }}>Register</Text>
                <View style={{
                    width: 285,
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <TextInput style={styles.shortInput} autoCorrect={false} onChangeText={text => setfName(text)} placeholder="First Name" placeholderTextColor={"#6b6b6b"}/>
                    <TextInput style={styles.shortInput} autoCorrect={false} onChangeText={text => setlName(text)} placeholder="Last Name" placeholderTextColor={"#6b6b6b"}/>
                </View>
                <TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' onChangeText={text => setEmail(text)} placeholder="Email" placeholderTextColor={"#6b6b6b"}/>
                <TextInput style={styles.input} autoCorrect={false} autoCapitalize='none' onChangeText={text => setUsername(text)} placeholder="Username" placeholderTextColor={"#6b6b6b"} />
                <TextInput style={styles.input} textContentType='newPassword' secureTextEntry={true} onChangeText={text => setPassword(text)} placeholder="Password" placeholderTextColor={"#6b6b6b"}/>
                <TextInput style={styles.input} secureTextEntry={true} placeholder="Confirm Password" placeholderTextColor={"#6b6b6b"} onChangeText={text => setConfirmPassword(text)}/>
                <Pressable style={({pressed}) => [{ backgroundColor: pressed ? colors.primary : colors.primary }, styles.buttonStyle]} onPress={async () => doRegister(fName, lName, email, username, password) }>
                    <Text style={{color: "white", fontSize: 20}}>Register</Text>
                </Pressable>
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
    // height: 515,
    // width: 347,
    height: '70%',
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
    buttonStyle:{
    //   backgroundColor:"#494949",
      padding: 7,
      margin: 10,
      height: 38,
      width: 230,
      borderRadius: 7.5,
      justifyContent: "center",
      alignItems: "center",
  }
});

export default RegisterScreen;