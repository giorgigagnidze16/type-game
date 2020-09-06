import React, {Component} from 'react';
import './App.css';
import {WPM} from './wpm'




class App extends React.Component{
   constructor(props) {
     super(props);
     this.state={
         userInput:[],
         incorrect:0,
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
        this.updateStuff();
   }
    updateStuff = () => {
        let counterIncorrect =0 ;

        for(let i=0; i <this.state.userInput.length;i++){
            if (this.state.userInput[i] !== this.state.defaultText[i]){
                counterIncorrect++;
            }
        }
        this.setState({incorrect:counterIncorrect})
     }

   handleChange = (e) => {
     this.setState({userInput:[...e.target.value]})
       this.startTimer()
       this.onFinish();

   }
   onFinish(){
       if (this.state.userInput.length >= this.state.defaultText.length){
           clearInterval(this.interval);
           this.setState({finished:true})
       }
   }
  render() {

    return (
      <div className={"mainDiv"}>
        {

          this.state.defaultText.map((val,index) => {

           return <Letter key = {index}
                          Symbol={val}
                          isCorrect={val === this.state.userInput[index]}
                          isCurrent={index === this.state.userInput.length}
                          hasTyped={index < this.state.userInput.length}
           />
          })
        }

        <textarea onChange={this.handleChange} className={"inputArea"} spellCheck={"false"} unselectable={"on"} onKeyUp={this.updateStuff} readOnly={this.state.finished}>

        </textarea>

       <div className={"wmp-div"}>
           <WPM userInput={this.state.userInput} incorrect={this.state.incorrect} secondsPassed ={this.state.secondsPassed} />

       </div>
      </div>
    );
  }

}
const Letter = React.memo(({isCorrect,hasTyped,Symbol,isCurrent}) => {
    let backgroundColor = '';
    let color = '';
    if (hasTyped){
        backgroundColor = isCorrect ? "#e7fbd3" : "pink"
        color = isCorrect ? "#0e630e" : "darkred"
    }
    return <span style={{backgroundColor:backgroundColor,color:color,marginRight:3,borderRadius:4,borderRight:0,borderLeft:0,borderTop:0,borderBottom: isCurrent && '3px solid #00416d'}}>{Symbol}</span>
})



export default App;
