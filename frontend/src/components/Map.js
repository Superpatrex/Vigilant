import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Pin, {HoverPinRadius, PinRadius} from "./Pin";

const app_name = 'cop4331-vigilant'
var idinc = 0;

function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:4091/' + route;
    }
}

async function searchPins(latitude, longitude)
{
    var obj = { latitude: latitude, longitude: longitude, maximumDist: 1000000 };
    var js = JSON.stringify(obj);

    try
    {
        const response = await fetch(buildPath('api/searchPins'), {
        method: 'POST', body: js, headers: { 'Content-Type': 'application/json' }});

        var res = JSON.parse(await response.text());

        if (res.success)
        {
            return convertToPins(res);
        }
        else
        {
            console.error(res.error);
            // console.log(res.error);
        }
    }
    catch(e)
    {
        console.error(e.toString());
        throw e;
    }
}

function convertToPins(res)
{
    var i;
    var pins = [];

    for (i in res.pins)
    {
        pins = pins.concat({lng:res.pins[i].location.coordinates[0], lat:res.pins[i].location.coordinates[1], id:idinc++});
    }

    return pins;
};

class Map extends Component
{
    constructor(props)
    {
        super(props);
        this.defaultProps = {
            center: {
              lat: 28.60232543238688,
              lng: -81.20021127139536
            },
            zoom: 15
        };
        this.state = {pins: [{id:69, lat: 28.60232543238688, lng: -81.20021127139536}]};
        this.initialize();
    }

    async initialize()
    {
        var p = await searchPins(this.defaultProps.center.lat, this.defaultProps.center.lng);
        this.setState({pins:p});
        console.log("done");
    }
    
    render()
    { 
        console.log(this.state.pins);
        console.log("rendering");
        return (
        <div style={{ height: '100vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCivx73GpFHnziVqBrL481EFhBJOW3-tdA" , language: 'en'}}
                center = {this.defaultProps.center}
                defaultCenter={this.defaultProps.center}
                defaultZoom={this.defaultProps.zoom}
                options={this.getDefaultOptions()}
                hoverDistance={HoverPinRadius}
            >
                {
                    this.state.pins.map((pin) => (
                        <Pin key={pin.id} lat={pin.lat} lng={pin.lng}/>
                    ))
                }
            </GoogleMapReact>
        </div>
      );
    }

    getDefaultOptions()
    {
        return {styles:[
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#212121"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#181818"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#1b1b1b"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#2c2c2c"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#8a8a8a"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#373737"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#3c3c3c"
                }
              ]
            },
            {
              "featureType": "road.highway.controlled_access",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#4e4e4e"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#000000"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#3d3d3d"
                }
              ]
            }
          ]
        }
    }
};

export default Map;