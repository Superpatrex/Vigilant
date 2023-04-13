import React from 'react';
import GoogleMapReact from 'google-map-react';
import '../Map.css'

import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import MapView from '../components/MapView';

const MapPage = () =>
{
    return(
        <div>
            <PageTitle />
            <LoggedInName />
            <MapView />
        </div>
    );
}

export default MapPage;