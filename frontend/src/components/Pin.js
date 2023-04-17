import React, {Component} from 'react';

const PinRadius = 20
const HoverPinRadius = 24

const PinStyle = {
    position: 'absolute',
    width: PinRadius * 2,
    height: PinRadius * 2,
    left: -PinRadius,
    top: -PinRadius,

    border: '5px solid white',
    borderRadius: PinRadius * 2,
    backgroundColor: 'black',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4,
    
    transition: 'width 200ms, height 200ms, left 200ms, top 200ms'
};

const HoverPinStyle = {
    position: 'absolute',
    width: HoverPinRadius * 2,
    height: HoverPinRadius * 2,
    left: -HoverPinRadius,
    top: -HoverPinRadius,

    border: '5px solid white',
    borderRadius: HoverPinRadius * 2,
    backgroundColor: 'black',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 4,

    transition: 'width 200ms, height 200ms, left 200ms, top 200ms'
};

class Pin extends Component
{
    constructor(props)
    {
        super(props);
    }
    
    render()
    { 
        const style = this.props.$hover ? HoverPinStyle : PinStyle;
        return (
        <div style={style} lat={this.props.lat} long={this.props.long}>
            "yeet"
         </div>
        );
    }
};

export default Pin;
export {HoverPinRadius, PinRadius};