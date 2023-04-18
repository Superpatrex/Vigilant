import React, {Component} from 'react';
import SettingsImage from '../gear_icon.png';
import ThemeButton from '../components/ThemeButton'

const app_name = 'cop4331-vigilant'

const ButtonStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    opacity: 0.5,
    transition: 'opacity 200ms, width 200ms, height 200ms, left 200ms, bottom 200ms'
};

const ButtonBackgroundStyle = {
    display:'flex',
    position: 'absolute',
    width: '50px',
    height: '50px',
    padding:10,
    borderRadius:100,
    left: 10,
    bottom: 10,
    backgroundColor:'#393939',
    transition: 'opacity 200ms, width 200ms, height 200ms, left 200ms, bottom 200ms'
};

const ButtonSelectStyle = {
    opacity: 1,
    transition: 'opacity 200ms, width 200ms, height 200ms, left 200ms, bottom 200ms'
};

const pageOnStyle = {
    position: 'absolute',
    width: '40vw',
    height: '100vh',
    left: 0,
    bottom: 0,
    backgroundColor: '#393939',
    opacity: '1',
    transition: 'opacity 200ms, width 200ms'
};

const pageOffStyle = {
    position: 'absolute',
    width: '0vw',
    height: '100vh',
    left: 0,
    bottom: 0,
    backgroundColor: '#393939',
    opacity: '0',
    transition: 'opacity 200ms, width 200ms'
};

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

async function getUserInformation(id)
{
    var obj = {objectId:id};
    var js = JSON.stringify(obj);

    try
    {
        const response = await fetch(buildPath('api/getAllUserInformation'), {
        method: 'POST', body: js, headers: { 'Content-Type': 'application/json' }});

        var res = JSON.parse(await response.text());
        console.log(res);

        if (res.success)
        {
            return res.results;
        }
        else
        {
            console.error(res.error);
        }
    }
    catch(e)
    {
        console.error(e.toString());
        throw e;
    }
}

async function updatePassword(password)
{
    console.log(JSON.parse(localStorage.getItem("user_data")));
    var id = (JSON.parse(localStorage.getItem("user_data"))).id;
    var data = getUserInformation(id);
    var obj = {login:data.userName, pass:password, email:data.email};
    var js = JSON.stringify(obj);

    try
    {
        const response = await fetch(buildPath('api/passwordChange'), {
        method: 'POST', body: js, headers: { 'Content-Type': 'application/json' }});

        var res = JSON.parse(await response.text());
        console.log(res);

        if (res.success)
        {
            return;
        }
        else
        {
            console.error(res.error);
        }
    }
    catch(e)
    {
        console.error(e.toString());
        throw e;
    }
}

class Settings extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {buttonStyle:ButtonStyle, pageStyle:pageOffStyle};
        this.password = "";
    }
    
    render()
    {
        return (
            <div>
                <div style={this.state.pageStyle}>
                    <ThemeButton x={50} y={100} image={SettingsImage} index={7}/>
                    <ThemeButton x={100} y={100} image={SettingsImage} index={0}/>
                    <ThemeButton x={50} y={150} image={SettingsImage} index={6}/>
                    <ThemeButton x={100} y={150} image={SettingsImage} index={3}/>
                    <ThemeButton x={50} y={200} image={SettingsImage} index={2}/>
                    <ThemeButton x={100} y={200} image={SettingsImage} index={4}/>
                    <ThemeButton x={50} y={250} image={SettingsImage} index={5}/>
                    <ThemeButton x={100} y={250} image={SettingsImage} index={1}/>
                    <br /><br />
                    <input type="text" id="password" placeholder="Password" ref={ (c) => this.password = c}/>
                    <button type="submit" id="updateButton" class="formButton" value="Update Password" onClick={() => {updatePassword(this.password)}}>Update Password</button>
                </div>
                <div style={ButtonBackgroundStyle}>
                    <img src={SettingsImage} style={this.state.buttonStyle} 
                        onMouseEnter={() => {this.setState({buttonStyle:ButtonSelectStyle})}} 
                        onMouseLeave={() => {this.setState({buttonStyle:ButtonStyle})}}
                        onClick={() => {this.setState({pageStyle:(this.state.pageStyle == pageOnStyle ? pageOffStyle : pageOnStyle)})}} />
                </div>
            </div>
        )
    }
};

export default Settings;