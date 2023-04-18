import React, {Component} from 'react';
import LogoutImage from '../logout.png';
import Map, {changeMapTheme} from '../components/Map';

const divStyle = {
    width: '50px',
    height: '50px',
    display: 'inline-block',
    marginLeft:'2%',
    marginRight:'2%',
    marginBottom:20
}

class ThemeButton extends Component
{
    constructor(props)
    {
        super(props);
        this.index = props.index;
        this.image = props.image;
        this.ButtonStyle = {
            position: 'relative',
            width: '100%',
            height: '100%',
            margin: '5px',
            opacity: 1,
            filter: "drop-shadow(1px 1px 1px rgba(0,0,0, 0.8))",
            transition: 'opacity 200ms, width 200ms, height 200ms, margin 200ms'
        };
        this.ButtonSelectStyle = {
            position: 'relative',
            width: '100%',
            height: '100%',
            margin: '5px',
            opacity: 0.5,
            transition: 'opacity 200ms, width 200ms, height 200ms, margin 200ms'
        };
        this.state = {style:this.ButtonStyle};
    }

    render()
    {
        var style = this.ButtonStyle;
        var select = this.ButtonSelectStyle;
        var index = this.index;
        return (
            <div style={divStyle} onClick={(e) => {e.preventDefault(); changeMapTheme(index)}}>
                <img src={this.props.image} style={this.state.style} 
                    onMouseEnter={() => {this.setState({style:select})}} 
                    onMouseLeave={() => {this.setState({style:style})}}
                     />
            </div>
        )
    }
}

export default ThemeButton;