import React, {Component} from 'react';
import LogoutImage from '../logout.png';
import changeMapTheme from '../components/Map';

const ButtonStyle = {
    position: 'absolute',
    width: '40px',
    height: '40px',
    left: -20,
    top: -20,
    opacity: 0.5,
    transition: 'opacity 200ms, width 200ms, height 200ms, left 200ms, top 200ms'
};

const ButtonSelectStyle = {
    position: 'absolute',
    width: '50px',
    height: '50px',
    left: -25,
    top: -25,
    opacity: 1,
    transition: 'opacity 200ms, width 200ms, height 200ms, left 200ms, top 200ms'
};

class ThemeButton extends Component
{
    ThemeButton()
    {

    }

    render()
    {
        return (
            <div>
                <div style={this.state.pageStyle}></div>
                <img id="themebutton" src={LogoutImage} style={this.state.buttonStyle} 
                    onMouseEnter={() => {this.setState({buttonStyle:ButtonSelectStyle})}} 
                    onMouseLeave={() => {this.setState({buttonStyle:ButtonStyle})}}
                    onClick={(e) => {e.preventDefault(); changeMapTheme()}} />
            </div>
        )
    }
}

export default ThemeButton;