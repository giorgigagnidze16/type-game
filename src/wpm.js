import React, {Component} from 'react';

export class WPM extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
       let totalInput = this.props.userInput.length;
       let incorrectInputs = this.props.incorrect;
       let secondsPassed = this.props.secondsPassed;
       let wordsPerMin = Math.round(((totalInput/5) - incorrectInputs) / (secondsPassed / 60));
       if (wordsPerMin === Infinity || isNaN(wordsPerMin) || wordsPerMin < 0){
           return (
               <div>
                   WPM: 0
                   <br/>
                   accuracy:{Math.round(((totalInput-incorrectInputs) / totalInput)*100)} %
               </div>
           )
       }
    return (
        <div>
            WPM: {wordsPerMin}
            <br/>
            accuracy:{Math.round(((totalInput-incorrectInputs) / totalInput)*100)} %
        </div>
    )
    }
}