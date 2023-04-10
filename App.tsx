import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';

import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ForgetLoginModal from './components/ForgetLoginModal';
import AddContactModal from './components/AddContactModal';

import Home from './components/Home';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
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
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
