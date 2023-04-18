import React, {Component} from 'react';
import SettingsImage from '../gear_icon.png';

const ButtonStyle = {
    position: 'absolute',
    width: '60px',
    height: '60px',
    left: 10,
    bottom: 60,
    opacity: 0.5,
    transition: 'opacity 200ms, width 200ms, height 200ms, left 200ms, bottom 200ms'
};

const ButtonSelectStyle = {
    position: 'absolute',
    width: '70px',
    height: '70px',
    left: 5,
    bottom: 55,
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

class Settings extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {buttonStyle:ButtonStyle, pageStyle:pageOffStyle};
    }
    
    render()
    {
        return (
            <div>
                <div style={this.state.pageStyle}></div>
                <img src={SettingsImage} style={this.state.buttonStyle} 
                    onMouseEnter={() => {this.setState({buttonStyle:ButtonSelectStyle})}} 
                    onMouseLeave={() => {this.setState({buttonStyle:ButtonStyle})}}
                    onClick={() => {this.setState({pageStyle:(this.state.pageStyle == pageOnStyle ? pageOffStyle : pageOnStyle)})}} />
            </div>
        )
    }
};

export default Settings;