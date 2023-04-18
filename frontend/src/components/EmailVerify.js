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
 
  var newPassword;
  var confirmPassword;


  const [message, setMessage] = useState('');
  
  const doNewPass = async event =>
  {
    // It's still very late, and I don't know what changing the password endpoint looks like
    // I set this up as best I could once more.
    event.preventDefault();

     if (confirmPassword.value != newPassword.value)
     {
         setMessage('Passwords do not match');
         document.getElementById("registerResult").style.setProperty("opacity", 1);
    }

    //
     var obj = {pass: newPassword.value}
     var js = JSON.stringify(obj);

    //  try
    //  {
    //     const response = await fetch(buildPath('api/signup'),
    //     {method: 'POST', body: js, headers: {'Content-Type': 'application/json'}});

    //     var res = JSON.parse(await response.text());

    //     if (res.error === 'User Created')
    //     {
    //         setRegisterMessage('User Created');
    //         document.getElementById("registerResult").style.setProperty("opacity", 1);
    //     }
    //     else
    //     {
    //         setRegisterMessage(res.error);
    //         document.getElementById("registerResult").style.setProperty("opacity", 1);
    //     }
    //  }
    //  catch (e)
    //  {
    //     alert(e.toString());
    //     return;
    //  }
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