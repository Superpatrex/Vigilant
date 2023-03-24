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
    
    function rightActive(){
      const formHolder = document.getElementById('loginHolder');
      formHolder.classList.add("right-panel-active")
    }
    function rightInactive(){
      const formHolder = document.getElementById('loginHolder');
      formHolder.classList.remove("right-panel-active")
    }

    function swapForm(){
      // toggle = ~toggle;
      // const loginBox = document.getElementById("loginBox");
      // const welcomeBox = document.getElementById("welcomeBox");
      // const passwordBox = document.getElementById("passwordBox");
      // const registerBox = document.getElementById("registerBox");
      // loginBox.style.setProperty("opacity", toggle);
      // welcomeBox.style.setProperty("opacity", toggle);
      // passwordBox.style.setProperty("opacity", toggle);
      // registerBox.style.setProperty("opacity", toggle);
      

    }

    return(
      <div>
        <div id="background"></div>
        <PageTitle />
        <Login />
        <button class="toggler" id="switch1" onClick={rightActive}>Switch 1</button>
        <button class="toggler" id="switch2" onClick={rightInactive }>Switch 2</button>
      </div>
    );
};

export default LoginPage;