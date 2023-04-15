import * as React from 'react';
import { Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

import MapScreen from '../pages/MapScreen';
import SettingsScreen from '../pages/SettingsScreen';
import ContactsScreen from '../pages/ContactsScreen';

const Tab = createBottomTabNavigator();


const Home = ({ route, navigation }) => {
    const { colors } = useTheme();

    return (
        <Tab.Navigator initialRouteName='Map' screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName = "";

                if (route.name === "Map") {
                    iconName = focused ? 'map' : 'map-outline';
                } else if (route.name === "Settings") {
                    iconName = focused ? 'cog' : 'cog-outline';
                } else if (route.name === "Contacts") {
                    iconName = focused ? 'people' : 'people-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarInactiveTintColor: "gray",
        })} >
            <Tab.Screen name="Settings" component={SettingsScreen} initialParams={{ userId: route.params.userId }} />
            <Tab.Screen name="Map" component={MapScreen} initialParams={{ userId: route.params.userId }} options={{ headerShown: false }} />
            <Tab.Screen name="Contacts" component={ContactsScreen}  initialParams={{ userId: route.params.userId }} options={{
                headerRight: () => (
                    <Pressable onPress={() => navigation.navigate('AddContactModal', { userId: route.params.userId })}>
                        <Ionicons name='add-outline' size={35} color={colors.primary}></Ionicons>
                    </Pressable>
                )
            }} />
        </Tab.Navigator>
    );
}

export default Home;