import * as React from 'react';
import { Pressable, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@react-navigation/native';

import ContactView from './ContactView';
import EditContactScreen from '../pages/EditContactScreen';

const Stack = createNativeStackNavigator();

const ContactStack = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <Stack.Navigator>
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
        </Stack.Navigator>
    )
}

export default ContactStack;