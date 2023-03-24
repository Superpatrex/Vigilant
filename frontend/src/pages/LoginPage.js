import React from 'react';
import '../Login.css';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';

const LoginPage = () =>
{
    const el= document.body;
    var toggle = 1;
    el.addEventListener("mousemove",(e) =>{
      el.style.setProperty('--x', -e.offsetX/3 + "px");
      el.style.setProperty('--y', -e.offsetY/3 + "px");
    });
    function swapForm(){
      toggle = ~toggle;
      const loginBox = document.getElementById("loginBox");
      const welcomeBox = document.getElementById("welcomeBox");
      const passwordBox = document.getElementById("passwordBox");
      const registerBox = document.getElementById("registerBox");
      loginBox.style.setProperty("opacity", toggle);
      welcomeBox.style.setProperty("opacity", toggle);
      passwordBox.style.setProperty("opacity", toggle);
      registerBox.style.setProperty("opacity", toggle);
      

    }

    return(
      <div>
        <PageTitle />
        <Login />
        <button id="toggler" onClick={swapForm}>Switch</button>
      </div>
    );
};

export default LoginPage;