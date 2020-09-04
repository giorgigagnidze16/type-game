import React, {Component} from 'react';

export class WPM extends React.Component{
    constructor(props) {
        super(props);

    }
    render() {
        let num = Math.round((((this.props.inputIndex - this.props.incorrect) / 5 ) /  (this.props.secondsPassed / 60)));
        if (isNaN(num) || num === Infinity)
            return <div>WPM: 0</div>;

    return (
        <div>WPM:{num}</div>
    )
    }
}