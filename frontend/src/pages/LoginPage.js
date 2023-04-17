import React from 'react';
import '../Login.css';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';

const LoginPage = () =>
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
        <Login />
      </div>
    );
};

export default LoginPage;