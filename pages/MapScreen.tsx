import * as React from 'react';
import MapView, { LatLng, Marker, Region, Callout, Address, MapMarker } from 'react-native-maps';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    Pressable,
    Button,
    SafeAreaView,
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
    street: string,
}

type LocationData = {
    latitude: number,
    longitude: number,
    state: string,
    country: string,
    zipCode: string,
    street: string,
}

const MapScreen = ({ route, navigation }) => {
    const { colors } = useTheme();
    const [markers, setMarkers] = React.useState<Marker[]>([]);
    const [location, setLocation] = React.useState<GeolocationResponse>();
    const [locationData, setLocationData] = React.useState<LocationData>();
    const [address, setAddress] = React.useState<Address>();
    const [initialRegion, setInitialRegion] = React.useState<Region>();
    const [popUpVisible, showPopup] = React.useState(false);
    const [markerDetails, setMarkerDetails] = React.useState<Marker>();
    const mapRef = React.useRef<MapView>();
    const markerRef = React.useRef<MapMarker>();
    const [canDelete, setCanDelete] = React.useState(false);

    const convertToMarker = (res: any) => {
        let i: any;
        let markers: Marker[] = [];
        
        for (i in res.results)
        {
            let location: LatLng = { longitude: res.results[i].location.coordinates[0], latitude: res.results[i].location.coordinates[1] };
            markers.push({ _id: res.results[i]._id, userId: res.results[i].userCreatedObjectId, location: { coordinates: location, type: "Point" }, title: res.results[i].Title, description: res.results[i].description, street: res.results[i].address });
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
        }
        catch(e: any)
        {
            Alert.alert(e.toString());
            throw e;
        }

    }

    const deletePin = async (pinId: string) => {
        var obj = { objectId: pinId }
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/deletePin'),
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            if (!res.success)
            {
                Alert.alert(res.error);
            }
        }
        catch (e: any)
        {
            Alert.alert(e.toString())
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
            {/* When pin is clicked, popUpVisible is set to true and the popup is displayed
            When the done button inside the popup is clicked, popUpVisible is set to false 
            and the popup hides */}
            { popUpVisible ?
                <View style={[styles.pinPopup, { backgroundColor: colors.background, borderColor: colors.border, borderWidth: 3, }]}>
                    <Text style={{ fontSize: 20, color: colors.text, fontWeight: "bold", margin: 5, }}>{markerDetails?.title}</Text>
                    <Text style={[styles.pinPopupText, { color: colors.text }]}>Address: {markerDetails?.street}</Text>
                    <Text style={[styles.pinPopupText, { color: colors.text, marginBottom: 3, }]}>{markerDetails?.description}</Text>
                    <View style={{ justifyContent: "space-evenly", height: 200, alignItems: "center" }}>
                        <Button title='Done' onPress={() => { showPopup(false); setCanDelete(false); }}></Button>
                        <Button title='Edit' disabled={!(markerDetails?.userId == route.params.userId)}></Button>
                        <Button title='Delete' color={colors.notification} disabled={!(markerDetails?.userId == route.params.userId)} onPress={() => {
                            if (canDelete)
                            {
                                deletePin(markerDetails?._id || 'null');
                                setCanDelete(false);
                                showPopup(false)
                            }
                            else
                            {
                                Alert.alert('Are you sure? Press Delete again to delete');
                                setCanDelete(true);
                            }
                        }}></Button>
                    </View>
                </View>
            : null }
            <MapView
                ref={mapRef}
                style={styles.map}
                onMapReady={() => {
                    Geolocation.getCurrentPosition((info) => {setLocation(info)}, (error: GeolocationError) => { console.log(error) }, { enableHighAccuracy: true });
                    setInitialRegion({ latitude: (location?.coords.latitude || 28.6024), longitude: (location?.coords.longitude || -81.2001), latitudeDelta: 0.0922, longitudeDelta: 0.0421});
                    mapRef.current?.addressForCoordinate({ latitude: (location?.coords.latitude || 28.6024), longitude: (location?.coords.longitude || -81.2001) })
                        .then((value) => setAddress(value))
                    setLocationData({ latitude: (location?.coords.latitude || 28.6024), longitude: (location?.coords.longitude || -81.2001), state: (address?.administrativeArea || "FL"), country: (address?.country || "United States"), zipCode: (address?.postalCode || "32816"), street: (address?.thoroughfare || "University Blvd") })
                }}
                initialRegion={initialRegion}
                onRegionChange={(region) => searchPins(region.latitude, region.longitude)}
                showsUserLocation={true}
                onUserLocationChange={() => { 
                    Geolocation.getCurrentPosition((info) => {setLocation(info)});
                    mapRef.current?.addressForCoordinate({ latitude: (location?.coords.latitude || 28.6024), longitude: (location?.coords.longitude || -81.2001) })
                        .then((value) => setAddress(value))
                    setLocationData({ latitude: (location?.coords.latitude || 28.6024), longitude: (location?.coords.longitude || -81.2001), state: (address?.administrativeArea || "FL"), country: (address?.country || "United States"), zipCode: (address?.postalCode || "32816"), street: (address?.thoroughfare || "University Blvd") })
                }}
                >
                {markers.map((marker, index) => (
                    <Marker
                        ref={markerRef}
                        key={index}
                        coordinate={marker.location.coordinates}
                        pinColor={(marker.userId === route.params.userId ? "red" : "pink")}
                        // onPress={() => {showPopup(true); setMarkerDetails(marker)}}
                        // onCalloutPress={() => {showPopup(true); setMarkerDetails(marker)}}
                    >
                        {/* Test this with Sophia later to see if this fires on Android */}
                        <Callout>
                            <Pressable onPress={() => { showPopup(true); setMarkerDetails(marker);}}>
                                <Text>{marker.title}</Text>
                                <Text>{marker.description}</Text>
                            </Pressable>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <Pressable onPress={() => navigation.navigate('AddPinModal', { userId: route.params.userId, userLocation: locationData })}>
                <View style={[styles.addButton, { backgroundColor: colors.primary }]}>
                        <Ionicons name='add-outline' size={45} color={"white"}></Ionicons>
                </View>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"row"
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
        position:"absolute",
        alignSelf:"flex-end",
        right:-180,
        bottom:-340,
    },
    pinPopup: {
        height: '45%',
        width: '60%',
        zIndex:1,
        margin:"auto",
        position:"absolute",
        borderRadius: 15,
        padding: 10,
        flex: 1,
    },
    pinPopupText: {
        fontSize: 17,
        margin: 5,
    },
})

export default MapScreen;