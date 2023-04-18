import React, {Component} from 'react';
import SettingsImage from '../gear_icon.png';
import Sponge from '../SpongebobTheme.png';
import Dark from '../DarkTheme.png';
import Light from '../LightTheme.png';
import Purple from '../PurpleTheme.png';
import Blue from '../BlueTheme.png';
import Green from '../GreenTheme.png';
import Orange from '../OrangeTheme.png';
import Red from '../RedTheme.png';
import Pegasus from '../UCF Pegasus Crest.png'

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
    width: '27vw',
    height: '100vh',
    left: 0,
    bottom: 0,
    display:'inline-block',
    backgroundColor: '#393939',
    opacity: '1',
    transition: 'opacity 200ms, width 200ms',
    display:'block',
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:"1%",
};

const pageOffStyle = {
    position: 'absolute',
    width: '0vw',
    height: '100vh',
    left: 0,
    bottom: 0,
    backgroundColor: '#393939',
    opacity: '0',
    transition: 'opacity 200ms, width 200ms',
    display:'block',
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
    console.log(password);
    var id = (JSON.parse(localStorage.getItem("user_data"))).id;
    var data = await getUserInformation(id);
    console.log(data);
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
        this.password = document.getElementById("password");
    }
    
    render()
    {
        this.password = document.getElementById("password");
        return (
            <div>
                <div style={this.state.pageStyle}>
                    <div style={{width:'100%', height:75}}></div>
                    <h2>Change Password</h2>
                    <input type="password" id="password" placeholder="Password"/>
                    <button type="submit" id="updateButton" class="formButton" value="Update Password" onClick={() => {updatePassword(this.password.value)}}>Update Password</button>
                    <br /><br />
                    <h2>Themes</h2>
                    <div style={{margin:'auto'}}>
                        <ThemeButton image={Dark} index={7}/>
                        <ThemeButton image={Light} index={0}/>
                        <ThemeButton image={Purple} index={6}/>
                        <ThemeButton image={Blue} index={3}/>
                        <ThemeButton image={Green} index={2}/>
                        <ThemeButton image={Orange} index={4}/>
                        <ThemeButton image={Red} index={5}/>
                        <ThemeButton image={Sponge} index={1}/>
                        <ThemeButton image={Pegasus} index={8}/>

                    </div>
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