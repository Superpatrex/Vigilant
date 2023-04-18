import React, {Component} from 'react';
import CrimeIcon from '../CrimeIcon.png';
import MiscIcon from '../MiscIcon.png';
import AccidentIcon from '../AccidentIcon.png';
import DisasterIcon from '../DisasterIcon.png';
import GasLeakIcon from '../GasLeakIcon.png';
import FireIcon from '../FireIcon.png';


const PinRadius = 20;
const HoverPinRadius = 24;
const enclosingHeight = 400;
const enclosingWidth = 250;
const padding = 4;

const PinStyle = {
    position: 'absolute',
    width: PinRadius * 2,
    height: PinRadius * 3,
    left: enclosingWidth/2 - PinRadius - padding,
    top: HoverPinRadius - PinRadius*3,

    borderRadius: PinRadius * 2,
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: padding,
    
    transition: 'width 200ms, height 200ms, left 200ms, top 200ms'
};

const HoverPinStyle = {
    position: 'absolute', 
    width: HoverPinRadius * 2,
    height: HoverPinRadius * 3,
    left: enclosingWidth/2 - HoverPinRadius - padding,
    top: HoverPinRadius - PinRadius*3,

    borderRadius: HoverPinRadius * 2,
    backgroundColor: 'black',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: padding,

    transition: 'width 200ms, height 200ms, left 200ms, top 200ms'
};

const EnclosingStyle = {
    position: 'absolute',
    width: enclosingWidth,
    height: enclosingHeight,
    left: -enclosingWidth/2,
    top: -HoverPinRadius,
}

const InfoBoxStyle = {
    position: 'absolute',
    width: enclosingWidth,
    height: 1,
    left: 0,
    top: 0,
    borderRadius: PinRadius * 2,
    backgroundColor: 'black',
    opacity: 0,
    transition: 'opacity 300ms, height 450ms, top 450ms',
    textAlign: 'center'
}

const HoverInfoBoxStyle = {
    position: 'absolute',
    width: enclosingWidth,
    height: enclosingHeight - HoverPinRadius * 2,
    left: 0,
    top: HoverPinRadius + padding,
    // border: '5px solid white',
    borderRadius: PinRadius * 2,
    backgroundColor: 'black',
    opacity: 1,
    transition: 'opacity 300ms, height 450ms, top 450ms',
    textAlign: 'center'
}

const TitleStyle = {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    transition: 'color 450ms'
}

const HoverTitleStyle = {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    transition: 'color 450ms'
}

const BodyStyle = {
    color: 'black',
    fontSize: 16,
    transition: 'color 450ms'
}

const HoverBodyStyle = {
    color: 'white',
    fontSize: 16,
    transition: 'color 450ms'
}

const PinImageStyle={
    width:'7vh',
    bottom:10 ,
    position:'absolute',
    left:5
}

class Pin extends Component
{
    constructor(props)
    {
        super(props);
    }
    
    render()
    { 
        const pinStyle = this.props.$hover ? HoverPinStyle : PinStyle;
        const infoBoxStyle = this.props.$hover ? HoverInfoBoxStyle : InfoBoxStyle;
        const titleStyle = this.props.$hover ? HoverTitleStyle : TitleStyle;
        const bodyStyle = this.props.$hover ? HoverBodyStyle : BodyStyle;
        return (
        <div style={EnclosingStyle} lat={this.props.lat} lng={this.props.lng}>
            <div style={infoBoxStyle}>
                <br />
                <p style={titleStyle}>
                    {this.props.title}
                </p>
                <p style={bodyStyle}>
                    {this.props.address + ": " + this.props.description}
                </p>
            </div>
                <img src={this.props.title == "Disaster" ? DisasterIcon: this.props.title == "Crime" ? CrimeIcon: this.props.title == "Fire" ? FireIcon:this.props.title == "Accident" ? AccidentIcon:this.props.title == "Gas Leak" ? GasLeakIcon:MiscIcon} style={pinStyle}/>
        </div>
        );
    }
};

export default Pin;
export {HoverPinRadius, PinRadius};