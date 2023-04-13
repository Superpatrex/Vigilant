import React, { useState } from 'react';

const app_name = 'cop4331-vigilant'
function buildPath(route)
{
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:4091/' + route;
    }
}


function Login()
{
  var loginName;
  var loginPassword;
  var registerFName;
  var registerLName;
  var registerEmail;
  var registerUserName;
  var registerPassword;
  var confirmPassword;

  const [message, setMessage] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');

  const doLogin = async event => 
  {
      event.preventDefault();

      var obj = {userName:loginName.value,password:loginPassword.value};
      var js = JSON.stringify(obj);

      console.log(js);
      try
      {
          console.log(buildPath('api/login'));
          const response = await fetch(buildPath('api/login'),
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

          var res = JSON.parse(await response.text());

          if( res.id <= 0 )
          {
              setMessage('Username or Password Incorrect');
              document.getElementById("loginResult").style.setProperty("opacity",1);
          }
          else
          {
              var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
              localStorage.setItem('user_data', JSON.stringify(user));

              setMessage('');
              window.location.href = '/home';
          }
      }
      catch(e)
      {
          alert(e.toString());
          return;
      }    
  };
  
  const doRegister = async event =>
  {
    // Waka waka
    event.preventDefault();

    //  if (confirmPassword.value != registerPassword.value)
    //  {
    //      setMessage('Passwords do not match');
    //      document.getElementById("registerResult").style.setProperty("opacity", 1);
    // }

     var obj = {firstname: registerFName.value, lastname: registerLName.value, login: registerUserName.value, pass: registerPassword.value, email: registerEmail.value, regioncode: 5, countrycode: 5}
     var js = JSON.stringify(obj);

     try
     {
        const response = await fetch(buildPath('api/signup'),
        {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});

        var res = JSON.parse(await response.text());

        if (res.error === 'User Created')
        {
            setRegisterMessage('User Created');
            document.getElementById("registerResult").style.setProperty("opacity", 1);
        }
        else
        {
            setRegisterMessage(res.error);
            document.getElementById("registerResult").style.setProperty("opacity", 1);
        }
     }
     catch (e)
     {
        alert(e.toString());
        return;
     }
  };
  

  return(
    <div>
        <div class="formHolder" id="loginHolder">
            <div class="formBox" id="registerBox">
            <form onSubmit={doRegister}>
                        <span id="inner-title">Register</span><br/><br/>
                        <input type="text" id="registerFName" class="registerInput" placeholder="First Name" ref={ (c) => registerFName = c}/>
                        <input type="text" id="registerLName" class="registerInput" placeholder="Last Name" ref={ (c) => registerLName = c}/><br />
                        <input type="text" id="registerEmail" class="registerInput" placeholder="Email Address" ref={ (c) => registerEmail = c} /><br />
                        <input type="text" id="registerUserName" class="registerInput" placeholder="Username" ref={ (c) => registerUserName = c} /><br />
                        <input type="password" id="registerPassword" class="registerInput" placeholder="Password" ref={ (c) => registerPassword = c} /><br />
                        <input type="password" id="confirmPassword" class="registerInput" placeholder="Confirm Password" ref={ (c) => confirmPassword = c} /><br />
                        <button type="submit" id="registerButton" value="Register" onClick={doRegister}>Register</button>
                        </form>
                        <span id="registerResult">{registerMessage}</span>
            </div>
            <div class="formBox" id="loginBox">
                <form onSubmit={doLogin}>
                <span id="inner-title">Login</span><br/><br/>
                <input type="text" id="loginName" class="loginInput" placeholder="Username" ref={ (c) => loginName = c} /><br />
                <input type="password" id="loginPassword" class="loginInput" placeholder="Password" ref={ (c) => loginPassword = c} /><br />
                <a href="#">Forgot your username or password?</a>
                {/* <input type="submit" id="loginButton" class="buttons" value = "Login" onClick={doLogin} /> */}
                <button type="submit" id="loginButton" value="Login" onClick={doLogin}>Login</button>
                </form>
                <span id="loginResult">{message}</span>
            </div>
            <div id="overlayHolder">
                <div id="overlay">
                    <div class="overlayPanel overlayLeft" id="passwordBox">
                        <h2>Password Requirements</h2>
                        <ul>
                            <li>At least 8 characters</li>
                            <li>1 special character (!#*%$&)</li>
                            <li>1 number</li>
                            <li>1 uppercase letter</li>
                        </ul>
                    </div>    
                    <div class="overlayPanel overlayRight" id="welcomeBox">
                        <h2>Welcome to Vigilant</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbius is sussy among us pellentesque, tempor ante et, pulvinar tellus. Morbius lobortis interdum odio nec finibus. Suspendisse at eros in ligma hendrerit imperdiet eget at lorem. Sus lobortis gluteus maximus. Nunc in nisl in magna bibendum laoreet vel efficitur tellus. Aliquam aliquet, augue estuans interis ira vehementi, deus vult gravida orci, sit amet laoreet lorem ipsum nec metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque cursus turpis sephiroth venenatis vulputate. Nullam tincidunt eget justo ac tincidunt. Cras aliquam molestie eleifend. Mauris blandit gravida odio, sit amet fringilla sapien luctus et. Suspendisse dictum viverra lacus vitae tincidunt.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
};

export default Login;