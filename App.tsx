import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './components/Login';
import Register from './components/Register';
import ForgetLoginModal from './components/ForgetLoginModal';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Register"
            component={Register}
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
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;
