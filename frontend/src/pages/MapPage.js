import React from 'react';
import '../Card.css'

import PageTitle from '../components/PageTitle';
import LogOut from '../components/LogOut';
import Map from '../components/Map';
import Settings from '../components/Settings';

const CardPage = () =>
{
    return(
        <div width={"100vw"}>
            <Map />
            <Settings />
            <PageTitle />
            <LogOut />
        </div>
    );
}

export default CardPage;