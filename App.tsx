import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme, Pressable, Text } from 'react-native';

import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ForgetLoginModal from './components/ForgetLoginModal';
import AddContactModal from './components/AddContactModal';
import AddPinModal from './components/AddPinModal';
import ContactStack from './components/ContactStack';
import EditPinModal from './components/EditPinModal';

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
          <Stack.Screen
            name="ContactStack"
            component={ContactStack}
            options={{
              title: "",
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
            <Stack.Screen
              name='EditPinModal'
              component={EditPinModal}
              options={{
                title: 'Edit Pin'
              }}
            />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
