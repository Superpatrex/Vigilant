import React, {Component} from 'react';
import LogoutImage from '../logout.png';

const ButtonStyle = {
    position: 'absolute',
    width: '40px',
    height: '40px',
    right: 15,
    top: 15,
    opacity: 0.5,
    transition: 'opacity 200ms, width 200ms, height 200ms, right 200ms, top 200ms'
};

const ButtonSelectStyle = {
    position: 'absolute',
    width: '50px',
    height: '50px',
    right: 10,
    top: 10,
    opacity: 1,
    transition: 'opacity 200ms, width 200ms, height 200ms, right 200ms, top 200ms'
};
/*

function LoggedInName()
{
	
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.firstName;
    var lastName = ud.lastName;

       

    return(
    <img style={LoggedInStyle} src={SettingsImage}>
        <span id="userName">Logged In As {firstName} {lastName}</span><br />
        <button 
            type="button" 
            id="logoutButton" 
            class="buttons" 
            onClick={doLogout}> 
                Log Out 
        </button>
   </img>
  );
};
*/

class LogOut extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {buttonStyle:ButtonStyle};
    }
    
    render()
    {
        const doLogout = event =>
        {
            event.preventDefault();

            localStorage.removeItem("user_data")
            window.location.href = '/';
        }; 

        return (
            <div>
                <div style={this.state.pageStyle}></div>
                <img src={LogoutImage} style={this.state.buttonStyle} 
                    onMouseEnter={() => {this.setState({buttonStyle:ButtonSelectStyle})}} 
                    onMouseLeave={() => {this.setState({buttonStyle:ButtonStyle})}}
                    onClick={doLogout} />
            </div>
        )
    }
};


export default LogOut;