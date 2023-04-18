import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme, useTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme, Pressable, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GlobalStoreProvider } from 'react-native-global-store';

import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ForgetLoginModal from './components/ForgetLoginModal';
import AddContactModal from './components/AddContactModal';
import AddPinModal from './components/AddPinModal';
import ContactStack from './components/ContactStack';
import EditPinModal from './components/EditPinModal';
import PasswordReqModal from './components/PasswordReqModal';
import TextContactsModal from './components/TextContactsModal';
import SearchRadiusModal from './components/SearchRadiusModal';

import Home from './components/Home';

const initialState = { searchDist: 5000 };

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const { colors } = useTheme();
  return (
    <GlobalStoreProvider
      initialState={initialState}
    >
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
              options={({ navigation }) => ({
                headerRight: () => (
                  <Pressable onPress={() => navigation.navigate('PasswordReqModal')}>
                    <Ionicons name='information-circle-outline' size={32} color={colors.primary}></Ionicons>
                  </Pressable>
                )
              })}
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
                  options={({ route }) => ({
                    title: route.params.name,
                  })}
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
              <Stack.Screen
                name='PasswordReqModal'
                component={PasswordReqModal}
                options={{
                  title: 'Password Requirements'
                }}
              />
              <Stack.Screen
                name='TextContactsModal'
                component={TextContactsModal}
                options={{
                  title:'Text Contacts'
                }}
              />
              <Stack.Screen
                name='SearchRadiusModal'
                component={SearchRadiusModal}
                options={{
                  title: 'Change Search Radius'
                }}
              />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalStoreProvider>
  );
}

export default App;
