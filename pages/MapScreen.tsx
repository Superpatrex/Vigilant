import * as React from 'react';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
    StyleSheet,
    Text,
    View,
  } from 'react-native';
import { useTheme } from '@react-navigation/native';

const MapScreen = () => {
    const { colors } = useTheme();
    return (
        <View style={ styles.container }>
            {/* <Text style={{ fontSize: 30, color: colors.text }}>Hello, user 👋</Text> */}
            <MapView
                // provider={ PROVIDER_GOOGLE }
                style={styles.map}
                initialRegion={{
                    latitude: 28.6024,
                    longitude: -81.2001,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={ { latitude: 28.6024, longitude: -81.2001 } }
                    title="Crime"
                    description='Mad CS professor on the loose'
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

})

export default MapScreen;