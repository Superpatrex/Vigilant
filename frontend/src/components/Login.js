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

  const [message, setMessage] = useState('');

  const doLogin = async event => 
  {
      event.preventDefault();

      var obj = {login:loginName.value,password:loginPassword.value};
      var js = JSON.stringify(obj);

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
              window.location.href = '/cards';
          }
      }
      catch(e)
      {
          alert(e.toString());
          return;
      }    
  };


  return(
    <div>
        <div class="formHolder" id="loginHolder">
            <div class="formBox" id="registerBox">
                <h2>Register But it's Real</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbius is sussy among us pellentesque, tempor ante et, pulvinar tellus. Morbius lobortis interdum odio nec finibus. Suspendisse at eros in ligma hendrerit imperdiet eget at lorem. Sus lobortis gluteus maximus. Nunc in nisl in magna bibendum laoreet vel efficitur tellus. Aliquam aliquet, augue estuans interis ira vehementi, deus vult gravida orci, sit amet laoreet lorem ipsum nec metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque cursus turpis sephiroth venenatis vulputate. Nullam tincidunt eget justo ac tincidunt. Cras aliquam molestie eleifend. Mauris blandit gravida odio, sit amet fringilla sapien luctus et. Suspendisse dictum viverra lacus vitae tincidunt.</p>
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
            <div class="overlay">
                <div class="overlay-left" id="passwordBox">
                    <form onSubmit={doLogin}>
                    <span id="inner-title">Register</span><br/><br/>
                    <input type="text" id="loginName" class="loginInput" placeholder="Username" ref={ (c) => loginName = c} /><br />
                    <input type="password" id="loginPassword" class="loginInput" placeholder="Password" ref={ (c) => loginPassword = c} /><br />
                    <a href="#">Forgot your username or password?</a>
                    <button type="submit" id="loginButton" value="Login" onClick={doLogin}>Login</button>
                    </form>
                    <span id="loginResult">{message}</span>
                </div>    
                <div class="overlay-right" id="welcomeBox">
                    <h2>Welcome to Vigilant</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbius is sussy among us pellentesque, tempor ante et, pulvinar tellus. Morbius lobortis interdum odio nec finibus. Suspendisse at eros in ligma hendrerit imperdiet eget at lorem. Sus lobortis gluteus maximus. Nunc in nisl in magna bibendum laoreet vel efficitur tellus. Aliquam aliquet, augue estuans interis ira vehementi, deus vult gravida orci, sit amet laoreet lorem ipsum nec metus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque cursus turpis sephiroth venenatis vulputate. Nullam tincidunt eget justo ac tincidunt. Cras aliquam molestie eleifend. Mauris blandit gravida odio, sit amet fringilla sapien luctus et. Suspendisse dictum viverra lacus vitae tincidunt.</p>
                </div>
            </div>
        </div>
    </div>

  );
};

export default Login;