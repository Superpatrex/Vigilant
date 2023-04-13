import * as React from 'react';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Pressable,
    Button,
    SafeAreaView
  } from 'react-native';
import { useTheme } from '@react-navigation/native';
import buildPath from '../buildPath';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Geolocation, { GeolocationError, GeolocationResponse } from '@react-native-community/geolocation';

type Marker = {
    _id: string,
    userId: string,
    location: { coordinates: LatLng, type: string },
    title: string,
    description: string,
}

const PinDetails = () => {
    return (
        <View style={styles.pinPopup}>
            <Button title='Done' onPress={() => styles.pinPopup.opacity=0}></Button>
        </View>
    );
}

const MapScreen = ({ route, navigation }) => {
    const { colors } = useTheme();
    const [markers, setMarkers] = React.useState<Marker[]>([]);
    const [location, setLocation] = React.useState<GeolocationResponse>();
    const [initialRegion, setInitialRegion] = React.useState<Region>();

    const convertToMarker = (res: any) => {
        let i: any;
        let markers: Marker[] = [];
        
        for (i in res.results)
        {
            let location: LatLng = { longitude: res.results[i].location.coordinates[0], latitude: res.results[i].location.coordinates[1] };
            markers.push({ _id: res.results[i]._id, userId: res.results[i].userCreatedObjectId, location: { coordinates: location, type: "Point" }, title: res.results[i].Title, description: res.results[i].description });
        }

        return markers;
    }

    const searchPins = async (latitude: number, longitude: number) => {
        var obj = { latitude: latitude, longitude: longitude, maximumDist: 1000000 };
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/searchPins'), {
            method: 'POST', body: js, headers: { 'Content-Type': 'application/json' }});

            var res = JSON.parse(await response.text());

            if (res.success)
            {
                // console.log(res);
                let newRes = convertToMarker(res);
                setMarkers(newRes);
            }
            else
            {
                // Alert.alert(res.error);
                // console.log(res.error);
            }
        }
        catch(e: any)
        {
            Alert.alert(e.toString());
            throw e;
        }

    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            Geolocation.getCurrentPosition((info) => {setLocation(info)}, (error: GeolocationError) => { console.log(error) }, { enableHighAccuracy: true });
            searchPins((location?.coords.latitude || 0), (location?.coords.longitude || 0));
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView style={ styles.container }>
            <MapView
                provider={ PROVIDER_GOOGLE }
                style={styles.map}
                onMapReady={() => {
                    Geolocation.getCurrentPosition((info) => {setLocation(info)}, (error: GeolocationError) => { console.log(error) }, { enableHighAccuracy: true });
                    setInitialRegion({ latitude: (location?.coords.latitude || 41.234444), longitude: (location?.coords.longitude || -81.560833), latitudeDelta: 0.0922, longitudeDelta: 0.0421});
                }}
                initialRegion={initialRegion}
                onRegionChange={(region) => searchPins(region.latitude, region.longitude)}
                showsUserLocation={true}
            >
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.location.coordinates}
                        title={marker.title}
                        description={marker.description}
                        pinColor={(marker.userId === route.params.userId ? "red" : "blue")}
                        onPress={() => styles.pinPopup.opacity = 1}
                    />
                ))}
            </MapView>
            <Pressable onPress={() => navigation.navigate('AddPinModal', { userId: route.params.userId, userLocation: location })}>
                <View style={[styles.addButton, { backgroundColor: colors.primary }]}>
                        <Ionicons name='add-outline' size={45} color={"white"}></Ionicons>
                </View>
            </Pressable>
            {/* <PinDetails></PinDetails> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    addButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        // marginBottom: 10,
        // marginRight: 10,
        position: "absolute",
        right: 10,
        top: 650
    },
    pinPopup: {
        height: '30%',
        width: '40%',
        opacity: 0,
        backgroundColor: "white",
        zIndex: 1,
    }
})

export default MapScreen;