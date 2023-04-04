import * as React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
    Pressable,
  } from 'react-native';
import buildPath from '../buildPath';

const doRegister = async (fName: string, lName: string, email: string, username: string, password: string) => {
  // Waka waka
  var obj = {firstname: fName, lastname: lName, login: username, pass: password, email: email, regioncode: 5, countrycode: 5};
  var js = JSON.stringify(obj);

  try
  {
    const response = await fetch(buildPath('api/signup'),
    {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});

    var res = JSON.parse(await response.text());

    if (res.error === 'User Created')
    {
      Alert.alert('User created');
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

const Register = ({ navigation }) => {
  const [fName, setfName] = React.useState('err');
  const [lName, setlName] = React.useState('err');
  const [email, setEmail] = React.useState('err');
  const [username, setUsername] = React.useState('err');
  const [password, setPassword] = React.useState('err');
  const [confirmPassword, setConfirmPassword] = React.useState('rre');

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
                <TextInput style={styles.shortInput} onChangeText={text => setfName(text)} placeholder="First Name" placeholderTextColor={"#6b6b6b"}/>
                <TextInput style={styles.shortInput} onChangeText={text => setlName(text)} placeholder="Last Name" placeholderTextColor={"#6b6b6b"}/>
            </View>
            <TextInput style={styles.input} onChangeText={text => setEmail(text)} placeholder="Email" placeholderTextColor={"#6b6b6b"}/>
            <TextInput style={styles.input} onChangeText={text => setUsername(text)} placeholder="Username" placeholderTextColor={"#6b6b6b"} />
            <TextInput style={styles.input} textContentType='newPassword' secureTextEntry={true} onChangeText={text => setPassword(text)} placeholder="Password" placeholderTextColor={"#6b6b6b"}/>
            <TextInput style={styles.input} secureTextEntry={true} placeholder="Confirm Password" placeholderTextColor={"#6b6b6b"} onChangeText={text => setConfirmPassword(text)}/>
            <Pressable style={({pressed}) => [{ backgroundColor: pressed ? "#595959" : "#494949" }, styles.buttonStyle]} onPress={async () =>
            {
                if (password != confirmPassword)
                {
                    Alert.alert("Passwords do not match");
                    return;
                }
                var obj = {firstname: fName, lastname: lName, login: username, pass: password, email: email, regioncode: 5, countrycode: 5};
                var js = JSON.stringify(obj);
              
                try
                {
                  const response = await fetch(buildPath('api/signup'),
                  {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});
              
                  var res = JSON.parse(await response.text());

                  console.log(res);
                  if (res.error === 'User Created')
                  {
                    Alert.alert('User created');
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
            }}>
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
    height: 515,
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
    buttonStyle:{
    //   backgroundColor:"#494949",
      padding:7,
      margin:10,
      height: 38,
      width: 171,
      borderRadius: 7.5,
      justifyContent: "center",
      alignItems: "center",
  }
});

export default Register;