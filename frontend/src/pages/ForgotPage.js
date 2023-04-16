import React from 'react';
import '../Login.css';

import PageTitle from '../components/PageTitle';
import ForgotPassword from '../components/ForgotPassword';

const ForgotPage = () =>
{
    const el= document.body;
    var toggle = 1;
    el.addEventListener("mousemove",(e) =>{
      el.style.setProperty('--x', -e.clientX/10 + "px");
      el.style.setProperty('--y', -e.clientY/20 + "px");
    }, true);
    
    
    return(
      <div>
        <div id="background"></div>
        <PageTitle />
        <ForgotPassword />
      </div>
    );
};

export default ForgotPage;