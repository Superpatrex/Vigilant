import * as React from 'react';
import { View, Text, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { useGlobalStore } from 'react-native-global-store';
import { useTheme } from '@react-navigation/native';

const SearchRadiusModal = ({ navigation }) => {
    const { colors } = useTheme();
    const [label, setLabel] = React.useState('Near');
    const [globalStore, setGlobalStore] = useGlobalStore();

    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 10,}}>
            <View style={{ alignItems: "center", }}>
                <Text style={{ fontSize: 20, color: colors.text }}>{label}</Text>
            </View>
            <Slider
                onValueChange={(val) => {
                    setGlobalStore({ searchDist: val })
                    if (val == 5000)
                        setLabel('Near');
                    else if (val == 2502500)
                        setLabel('Far');
                    else
                        setLabel('Very Far');
                }}
                minimumValue={5000}
                maximumValue={5000000}
                step={2497500}
            />
            <Button title='Done' onPress={() => navigation.goBack()}></Button>
        </View>
    )
}

export default SearchRadiusModal;