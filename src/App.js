import React, {Component} from 'react';
import './App.css';
import {WPM} from './wpm'
class App extends React.Component{
   constructor(props) {
     super(props);
     this.state={
         userInput:[],
         wmp:0,
         incorrect:0,
         inputIndex:0,
         accuracy:0,
         secondsPassed:0,
         startTime:false,
         endTime:false,
         defaultText:[..."California is considered a global trendsetter in popular culture, communication, information, innovation, environmentalism, economics, politics, and entertainment. As a result of the state's diversity and migration, California integrates foods, languages, and traditions from other areas across the country and around the globe. It is considered the origin of the American film industry, the hippie counterculture, barbecue, fast food, beach and car culture, the Internet, and the personal computer, among others."]}
   }
   startTimer = () => {

    if (!this.state.startTime){
        this.setState({startTime:true});
        this.interval = setInterval( () => {
            this.setState(() =>{
                return {secondsPassed: this.state.secondsPassed+1}
            })
        },1000)
    }
       let totalInput = this.state.inputIndex;
       let counterIncorrect =0 ;

       for(let i=0; i <this.state.userInput.length;i++){
           if (this.state.userInput[i] !== this.state.defaultText[i]){
               counterIncorrect++;
           }
       }
       this.setState({wmp:((totalInput/5 -counterIncorrect)/ (this.state.secondsPassed / 60))})
   }
    updateStuff = () => {
        let totalInput = this.state.inputIndex;
        let counterIncorrect =0 ;

        for(let i=0; i <this.state.userInput.length;i++){
            if (this.state.userInput[i] !== this.state.defaultText[i]){
                counterIncorrect++;
            }
        }
        this.setState({wmp:((totalInput/5 -counterIncorrect)/ (this.state.secondsPassed / 60))})

        this.setState({accuracy:Math.floor((totalInput-counterIncorrect)/totalInput*100 )})

     }

   handleChange = (e) => {
     this.setState({userInput:[...e.target.value]})
     this.setState({inputIndex:this.state.inputIndex+1})
       this.startTimer()
       this.onFinish();

   }
   onFinish(){
       if (this.state.inputIndex >= this.state.defaultText.length){
           clearInterval(this.interval);
           this.setState({finished:true})
       }
   }
  render() {


    return (
      <div className={"mainDiv"}>
        {

          this.state.defaultText.map((val,index) => {
            let backColor = '';
            let colorText = '';
            let borderBottom = '';
            if (index< this.state.userInput.length){
                backColor = val === this.state.userInput[index] ? "#e7fbd3" : "pink"
                colorText = val === this.state.userInput[index] ? "#0e630e" : "darkred"
            }

            return <span style={{backgroundColor:backColor,color:colorText,marginRight:3,borderRadius:4,borderRight:0,borderLeft:0,borderTop:0,borderBottom: index === this.state.userInput.length && '3px solid #00416d'}}>{val}</span>
          })


        }

        <textarea onChange={this.handleChange} className={"inputArea"} spellCheck={"false"} unselectable={"on"} onKeyUp={this.updateStuff} readOnly={this.state.finished}>

        </textarea>

       <div className={"wmp-div"}>
           <WPM inputIndex={this.state.inputIndex} incorrect={this.state.incorrect} secondsPassed ={this.state.secondsPassed} />
           <br/>
            <h3>Accuracy: {this.state.accuracy}%</h3>
       </div>
      </div>
    );
  }
}




export default App;
