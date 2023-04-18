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


function ForgotPassword()
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
        setLogin(res.login);
        setVerificationToken(res.token);
        setEmail(res.email);
      }
    }
    catch(e){
      console.log(e);
    }
  }

  const doNewPass = async event =>{
    var obj = {login:login, email:email, token:verificationToken, newPassword: newPassword}
    var js = JSON.stringify(obj)

    try{
      const response = await fetch(buildPath('api/changePassword'),
      { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }); 
      
      var res = JSON.parse(await response.text());
      
      if(res.error=='Password Changed successfully'){
        setMessage(res.error);
        document.getElementById('registerResult').style.opacity=1;
      }

      else{
        setMessage(res.error);
        document.getElementById('registerResult').style.opacity=1;      
      }
    }
    catch(e){
      console.log(e);
    }
  }
    
  return(
    <div>
        <div class="formHolder" id="loginHolder">
            <form id="forgotForm" onSubmit={doNewPass}>
                        <span id="inner-title">Create New Password</span><br/><br/>
                        <input type="password" id="newPassword" class="registerInput" placeholder="New Password" ref={ (c) => setNewPassword(c)} /><br />
                        <input type="password" id="confirmPassword" class="registerInput" placeholder="Confirm New Password" ref={ (c) => setConfirmPassword(c)} /><br />
                        <button type="submit" id="registerButton" value="Register" onClick={() => {
                          getUserInfo();
                          doNewPass();
                        }}>Create</button><br/>
                        <span id="registerResult">{message}</span>
                        </form>
                        
        </div>
    </div>

  );
};

export default ForgotPassword;