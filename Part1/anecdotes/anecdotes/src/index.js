import React, { useState } from 'react';
import ReactDOM from 'react-dom';



const Heading = ({text}) => 
<>
  <h1>{text}</h1>
</>

const Button = ({onClick, text}) => 
<>
  <button onClick = {onClick}> {text}</button>
</> 

const Display = ({text}) => 
<>
  <p>{text}</p>
</>


const App = () => {

  const anecdotes = [
    "If you're going through hell, keep going",
    "Be the change you want to see in the world",
    "Are you an idiot? No sir, I'm a dreamer",
    "Those are speed holes, they make the car go faster",
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
  ]
  //creates state filled array with indexes corresponding to each anecdote.
  const [votes, setVotes] = useState(
    //creates new empty array of desired length, then using mapping function creates a new array of 
    //equal length by calling a function which returns the primitive value of
    // the number object 0 to each element in the old array
    Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)
  )

  //current anecdote - defaults to index 0 of anecdotes array
  const [selection, setSelection] = useState(anecdotes[0])

  //generates a random number between 0-1, then multiplies it by the number of elements in anecdotes
  //array, and returns the largest integer less than or equal to itself.
  const handleChangeAnecdote = () => {
    setSelection(anecdotes[Math.floor(Math.random() * anecdotes.length)])
  }
  //creates new votes array with the vote count of the current selection 
  const handleUpvote = () => {
    const index = anecdotes.indexOf(selection);
    const votesCopy = [...votes]
    votesCopy[index] += 1;
    setVotes(votesCopy);
  }

  const returnVotes = (anecdote) =>{
    return (
      votes[anecdotes.indexOf(anecdote)]
    )
  }

//might be a better way of doing this..
  const voteStatement = (anecdote) =>{
    return(("Has ").concat(returnVotes(anecdote).toString().concat(" votes")))
  }

//returns the most popular anecdote  
  const mostPopular = () => {
    //keeps track of the highest vote value
    var mostPopular = votes[0];
    //indexes of anecdotes and votes correspond in their individual arrays
    var index = 0;
    for (let i = 0; i < votes.length ; i++){
      if (votes[i] > mostPopular){
        mostPopular = votes[i]
        index = i
      }
    }
    return anecdotes[index]
  }
  

  return(
    <>
    <Heading text = {"Anecdote of the day"}/>
    <Display text = {selection}/>
    <div>
    <Button onClick = {handleChangeAnecdote} text = {"New Quote"}/>
    <Button onClick = {handleUpvote} text = {"Vote for this anecdote"}/>
    </div>
    <Display text = {voteStatement(selection)}/>
    <Heading text = {"Anecdote with most votes"}/>
    <Display text = {mostPopular()}/>
    <Display text = {voteStatement(mostPopular())}/>
    </>

  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
