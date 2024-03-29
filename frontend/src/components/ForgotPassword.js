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

  var newUserPassword;
  // const [newUserPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [message, setMessage] = useState('example message');
  // const [userName, setUserName] = useState('');
  // const [userEmail, setUserEmail] = useState('');
  // var userName;
  // var userEmail;

  const getUserInfo = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    var obj = { objectId: userId };
    var js = JSON.stringify(obj)

    try
    {
      const response = await fetch(buildPath('api/getAllUserInformation'),
      { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

      var res = JSON.parse(await response.text());
      console.log(res);

      if (res.success)
      {
        // setUserName(res.results.userName);
        // setUserEmail(res.results.email);
        // userName = res.results.userName;
        // userEmail = res.results.email;
        doNewPass(res.results.userName, res.results.email);
      }
    }
    catch(e) {
      console.log(e.toString());
      console.log('Something went wrong in getUserInfo');
    }
  }

  const doNewPass = async (userName, userEmail) =>{
    const urlParams = new URLSearchParams(window.location.search);
    const verifTok = urlParams.get('token');
    // alert('userName is ' + userName);
    // alert('email is ' + userEmail);
    let hash = md5(newUserPassword.value);
    var obj = { login: userName, email: userEmail, token: verifTok, newPassword: hash };
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath('api/changePassword'),
      { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } }); 
      
      var res = JSON.parse(await response.text());

      if (res.error=='Password Changed successfully'){
        console.log(res.error);
        setMessage(res.error);
        document.getElementById('registerResult').style.opacity=1;
      }
      else {
        console.log(res.error);
        setMessage(res.error);
        document.getElementById('registerResult').style.opacity=1;      
      }
    }
    catch(e) {
      console.log(e.toString());
      console.log('Something went wrong in doNewPass');
    }
  }
    
  return(
    <div>
        <div class="formHolder" id="loginHolder">
            <form id="forgotForm" onSubmit={() => {getUserInfo(); doNewPass();}}>
                        <span id="inner-title">Create New Password</span><br/><br/>
                        <input type="password" id="newPassword" class="registerInput" placeholder="New Password" ref={ (c) => newUserPassword = c} /><br />
                        <input type="password" id="confirmPassword" class="registerInput" placeholder="Confirm New Password" ref={ (c) => setConfirmPassword(c)} /><br />
                        <button type="submit" id="registerButton" value="Register" onClick={ async (e) => {
                          e.preventDefault(); 
                          getUserInfo();
                          // doNewPass();
                          // setTimeout(() => {
                          //   doNewPass();
                          // }, 500);
                        }}>Create</button><br/>
                        <span id="registerResult">{message}</span>
                        </form>
                        
        </div>
    </div>

  );
};

export default ForgotPassword;