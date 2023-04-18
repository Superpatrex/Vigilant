import React from 'react';
import '../Map.css'

import PageTitle from '../components/PageTitle';
import LogOut from '../components/LogOut';
import Map from '../components/Map';
import Settings from '../components/Settings';
import ThemeButton from '../components/ThemeButtons'

const MapPage = () =>
{
    return(
        <div width={"100vw"}>
            <Map />
            <Settings />
            <PageTitle />
            <LogOut />
            <ThemeButton />
        </div>
    );
}

export default MapPage;