import React, { useState } from 'react';
import ReactDOM from 'react-dom';
//uncomment for styling
//import "./App.css";

const Heading = ({message}) => 

    <>
    <h1>{message}</h1>
    </>
  


const Button = ({handleClick, text}) => 

    <>
    <button id = "button" onClick = {handleClick}>{text}</button>
    </>
  


const Statistic = ({value, text}) => 
  <>
  <p>{text} {value}</p>
  </>
  



const Statistics = (props) =>{
  //This doesn't work because there is no way to include the text in the Statistic component
  // const {title, values, texts} = props;
  // return (
  //   <>
  //   {values.map(value => (<>
  //   <Statistic value = {value}/>
  //   </>)
    
//to display if no data yet - i.e. average still refers to NaN
  if (isNaN(props.average)){
    return(
      <>
      <p>No statistics yet</p>
      </>
    )
  }else{
  return(
    <>
    <table>
      <tbody>
      <tr><td><Statistic value = {props.goodFeedback} text = "Good" /></td></tr>
      <tr><td><Statistic value = {props.neutralFeedback} text = "Neutral"/></td></tr>
      <tr><td><Statistic value = {props.badFeedback} text = "Bad"/></td></tr>
      <tr><td><Statistic value = {props.feedback} text = "All" /></td></tr>
      <tr><td><Statistic value = {props.average} text = "Average" /></td></tr>
      <tr><td><Statistic value = {props.positive} text = "Positive"/></td>
      <td><p>%</p></td></tr>
      </tbody>
      </table>
    </>)
  }
}


const App = () => {

//set state for monitoring the amount of each type of feedback
  const [goodFeedback, setGoodFeedback] = useState(0)
  const [neutralFeedback, setNeutralFeedback] = useState(0)
  const [badFeedback, setBadFeedback] = useState(0)
  const [feedback, setFeedback] = useState(0)

  //functions for adding 1 to feedback count for each type of feedback
  const addFeedback = () => {
    setFeedback(feedback + 1)
  }
  const addGoodFeedback = () => {
    setGoodFeedback(goodFeedback +1)
    addFeedback()
    console.log("Good Feedback Registered")
  }
  const addNeutralFeedback = () => {
    setNeutralFeedback(neutralFeedback +1)
    addFeedback()
    console.log("Neutral Feedback Registered")
  }
  const addBadFeedback = () => {
    setBadFeedback(badFeedback + 1)
    addFeedback()
    console.log("Bad Feedback Registered")
  }

  //simple equations for working out average and positive % - could move this to Statistics component
  const average = (goodFeedback - badFeedback) / feedback
  console.log(average)
  const positive = (goodFeedback / feedback) * 100
  console.log(positive)

  return (
    <>
    <Heading  message = "Give Feedback" />

    <div id = "buttons">
      <Button handleClick = {() => addGoodFeedback()}  text = "Good"/>
      <Button handleClick = {() => addNeutralFeedback()} text = "Neutral"/>
      <Button handleClick = {() => addBadFeedback()} text = "Bad" />
    </div>
    
    <Heading message = "Statistics"/>

    <div id = "text">
      <Statistics goodFeedback = {goodFeedback} badFeedback = {badFeedback}
      neutralFeedback = {neutralFeedback} feedback = {feedback} average = {average}
      positive = {positive}/>
    </div>
    </>
  )
}

ReactDOM.render(
  <App />, document.getElementById("root")
);

