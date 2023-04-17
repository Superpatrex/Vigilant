import React from 'react';
import '../Card.css'

import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import CardUI from '../components/CardUI';
import Map from '../components/Map';

const CardPage = () =>
{
    return(
        <div>
            <PageTitle />
            <Map />
            <LoggedInName />
        </div>
    );
}

export default CardPage;