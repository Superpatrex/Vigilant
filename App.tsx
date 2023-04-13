import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme, Pressable, Text } from 'react-native';

import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ForgetLoginModal from './components/ForgetLoginModal';
import AddContactModal from './components/AddContactModal';
import AddPinModal from './components/AddPinModal';
import ContactView from './components/ContactView';
import EditContactScreen from './pages/EditContactScreen';

import Home from './components/Home';

const Stack = createNativeStackNavigator();

function App({ navigation }): JSX.Element {
  const { colors } = useTheme();

  return (
    <NavigationContainer theme={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ContactView"
            component={ContactView}
            options={{
              title: "",
              headerRight: () => (
                <Pressable onPress={() => navigation.navigate('EditContact')}>
                  <Text style={{ color: colors.primary, fontSize: 18 }}>Edit</Text>
                </Pressable>
              )
            }}
          />
          <Stack.Screen
            name="EditContact"
            component={EditContactScreen}
            options={{
              title: "Edit Contact"
            }}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen
                name="ForgetLoginModal"
                component={ForgetLoginModal}
                options={{
                    title: 'Forget Login?',
                }}
            />
            <Stack.Screen
              name="AddContactModal"
              component={AddContactModal}
              options={{
                title: 'Add Contact'
              }}
            />
            <Stack.Screen
              name="AddPinModal"
              component={AddPinModal}
              options={{
                title: 'Add Pin'
              }}
            />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
