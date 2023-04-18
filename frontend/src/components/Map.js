import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Pin, {HoverPinRadius, PinRadius} from "./Pin";
import Theme, {ThemeCount} from './Themes'

const app_name = 'cop4331-vigilant'
var idinc = 0;
var map;

const MapStyle = {
    position: 'absolute',
    width: '100%',
    height: '100vh',
    left: 0,
    top: 0,
    backgroundColor: 'black'
};

function changeMapTheme(newMap)
{
    map.setState({styles:Theme(newMap)});
}

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
        console.log(res);

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
        pins = pins.concat({
          lng:res.pins[i].location.coordinates[0], 
          lat:res.pins[i].location.coordinates[1],
          title:res.pins[i].title, 
          address:res.pins[i].address, 
          description:res.pins[i].description,
          id:idinc++});
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
        this.state = {pins: [{id:69, lat: 28.60232543238688, lng: -81.20021127139536}], styles:Theme(0)};
        this.initialize();
        map = this;
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
        <div style={MapStyle}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCivx73GpFHnziVqBrL481EFhBJOW3-tdA" , language: 'en'}}
                center = {this.defaultProps.center}
                defaultCenter={this.defaultProps.center}
                defaultZoom={this.defaultProps.zoom}
                options={{styles:this.state.styles}}
                hoverDistance={50 }
            >
                {
                    this.state.pins.map((pin) => (
                        <Pin 
                            key={pin.id} 
                            lat={pin.lat} 
                            lng={pin.lng} 
                            title={pin.title} 
                            address={pin.address} 
                            description = {pin.description}
                        />
                    ))
                }
            </GoogleMapReact>
        </div>
      );
    }
};

export default Map;
export {changeMapTheme};