import * as React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

const PasswordReqModal = () => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
                data={[
                    {key: 'At least 8 characters'},
                    {key: '1 special character (!#*%$&)'},
                    {key: '1 number'},
                    {key: '1 uppercase letter'},
                ]}
                renderItem={({item}) => <Text style={[styles.item, { color: colors.text }]}>{`\u2022 `}{item.key}</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    item: {
        fontSize: 25,
    }
})

export default PasswordReqModal;