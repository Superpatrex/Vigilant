import React from 'react';

const NavStyle = {
    position: 'relative',
    width: '100vw',
    height: '50px',
    paddingBottom: 10,
    left: 0,
    top: 0,
    backgroundColor: 'black',
    alignItems:'center',
};

const HeaderStyle = {
    paddingLeft: 20,
    paddingTop:8,
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