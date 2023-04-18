import React from 'react';

const NavStyle = {
    position: 'absolute',
    width: '100vw',
    height: '60px',
    paddingBottom: 10,
    left: 0,
    top: 0,
    backgroundColor: 'black'
};

const HeaderStyle = {
    paddingLeft: 20,
    paddingTop: 12
}

function PageTitle()
{
    return(
        <div style={NavStyle}>
            <h1 style={HeaderStyle}>Vigilant</h1>
        </div>
    );
};

export default PageTitle;