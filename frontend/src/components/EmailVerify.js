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


function EmailVerify()
{
 
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');


  const [message, setMessage] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [verificationToken, setVerificationToken] = useState('');
  
  const getUserInfo = async event => {
    var obj = { objectId: localStorage.getItem('user_data').id };
    var js = JSON.stringify(obj)

    try
    {
      const response = await fetch(buildPath('api/getAllUserInformation'),
      { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

      var res = JSON.parse(await response.text());

      if (res.success)
      {
        setVerificationToken(res.results.verificationToken);
        setLogin(res.results.userName);
        setEmail(res.results.email);
      }
    }
    catch (e)
    {
      console.log(e);
    }
  }

  const doNewPass = async event =>
  {
    // It's still very late, and I don't know what changing the password endpoint looks like
    // I set this up as best I could once more.
    event.preventDefault();

    if (confirmPassword != newPassword)
    {
      setMessage('Passwords do not match');
      document.getElementById("registerResult").style.setProperty("opacity", 1);
    }

    var obj = {login: login, email: email, token: verificationToken, newPassword: newPassword}
    var js = JSON.stringify(obj);

    try
    {
      const response = await fetch(buildPath('api/changePassword'),
      {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});

      var res = JSON.parse(await response.text());

      if (res.error === 'Password Changed Successfully')
      {
          setRegisterMessage(res.error);
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
            <form id="forgotForm" onSubmit={doNewPass}>
                        <span id="inner-title">Your email address has been verified.<br/>Have a wonderful day.</span><br/><br/>
                        </form>
                        
        </div>
    </div>

  );
};

export default EmailVerify;