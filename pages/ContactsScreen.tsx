import * as React from 'react';
import { Text, View, SectionList, StyleSheet, ScrollView, Alert, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import buildPath from '../buildPath';

type Contact = {
    id: string,
    firstName: string,
    lastName: string,
    phoneNumber: number,
    description: string
};

const ContactsScreen = ({ route, navigation }) => {
    const [data, setData] = React.useState<Contact[]>([]);

    const getContacts = async () => {
        // Wakka wakka
        var obj = {objectId: route.params.userId}
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/getContacts'),
            {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if (res.error === '')
            {
                setData(res.contacts);
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

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getContacts();
        });

        return unsubscribe;
    }, [navigation]);

    const { colors } = useTheme();
    return (
        <View style={{ flex: 1, paddingTop: 22 }}>
            {/* <View style={{ flex: 1, alignItems: "center" }}>
                <Text>This is some filler text</Text>
                <Text>More text</Text>
            </View> */}
            <FlatList
                data={data}
                renderItem={({item}) => <Text style={[styles.item, { color: colors.text }]}>{item.firstName} {item.lastName}</Text>}
                // renderSectionHeader={({section}) => (<Text style={[styles.sectionHeader, { backgroundColor: colors.border, color: colors.text }]}>{section.title}</Text>)}
                keyExtractor={({id}) => id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    sectionHeader: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 2,
        fontSize: 14,
        fontWeight: 'bold'
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    }
})

export default ContactsScreen;