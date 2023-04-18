import * as React from 'react';
import { Text, View, Button, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingsScreen = ({ route, navigation }) => {
    const { colors } = useTheme();

    return (
        <View style={{ flex: 0.8, justifyContent: "center", alignItems: "center" }}>
            {/* <Text style={{ fontSize: 20, color: colors.text }}>Hello!</Text> */}
            <Pressable style={[styles.pressable, { backgroundColor: colors.card }]} onPress={() => navigation.navigate('ForgetLoginModal', { name: 'Change Password' })} >
                <Text style={[styles.pressableText, { color: colors.text }]}>Change Password</Text>
                <Ionicons name='chevron-down-outline' size={20} color={colors.text}></Ionicons>
            </Pressable>
            <Pressable style={[styles.pressable, { backgroundColor: colors.card }]} onPress={() => navigation.navigate('SearchRadiusModal')}>
                <Text style={[styles.pressableText, { color: colors.text }]}>Search Radius</Text>
                <Ionicons name='chevron-down-outline' size={20} color={colors.text}></Ionicons>
            </Pressable>
            <Button onPress={ () => navigation.navigate("Login") } title="Log Out"></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    pressable: {
        height: 50,
        width: 325,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 15,
        margin: 10,
        padding: 10,
    },
    pressableText: {
        fontSize: 20
    }
})

export default SettingsScreen;