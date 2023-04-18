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


  return(
    <div>
        <div class="formHolder" id="loginHolder">
            <form id="forgotForm">
                        <span id="inner-title">Your email address has been verified.<br/>Have a wonderful day.</span><br/><br/>
                        </form>
                        
        </div>
    </div>

  );
};

export default EmailVerify;