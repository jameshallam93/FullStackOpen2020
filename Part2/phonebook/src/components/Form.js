import React from 'react';

const Form = (props)=>{
    return(
    <form onSubmit = {props.handleNewPerson}>
          <div>Name:
            <input value = {props.valuePers}
            onChange = {props.onPersChange}>
            </input>
            Number:
            <input value = {props.valueNum}
            onChange = {props.onNumChange}></input>
          </div>
  
          <button type = {"submit"}>new person</button>
        </form>
    )
}

export default Form
