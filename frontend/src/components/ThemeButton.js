import React, {Component} from 'react';
import LogoutImage from '../logout.png';
import Map, {changeMapTheme} from '../components/Map';

class ThemeButton extends Component
{
    constructor(props)
    {
        super(props);
        this.index = props.index;
        this.image = props.image;
        this.ButtonStyle = {
            position: 'absolute',
            width: '40px',
            height: '40px',
            left: -20 + props.x,
            top: -20 + props.y,
            opacity: 0.5,
            transition: 'opacity 200ms, width 200ms, height 200ms, left 200ms, top 200ms'
        };
        this.ButtonSelectStyle = {
            position: 'absolute',
            width: '50px',
            height: '50px',
            left: -25 + props.x,
            top: -25 + props.y,
            opacity: 1,
            transition: 'opacity 200ms, width 200ms, height 200ms, left 200ms, top 200ms'
        };
        this.state = {style:this.ButtonStyle};
        console.log("---->" + this.state);
    }

    render()
    {
        var style = this.ButtonStyle;
        var select = this.ButtonSelectStyle;
        var index = this.index;
        return (
            <div>
                <img src={this.image} style={this.state.style} 
                    onMouseEnter={() => {this.setState({style:select})}} 
                    onMouseLeave={() => {this.setState({style:style})}}
                    onClick={(e) => {e.preventDefault(); changeMapTheme(index)}} />
            </div>
        )
    }
}

export default ThemeButton;