import React from 'react';
import Heading from "./Heading"

const Form = (props)=>

    <>
      <form onSubmit = {props.onSubmit}>

        <div>
          Name:
          <input value = {props.valuePers}
          onChange = {props.onPersChange}>
          </input>

          Number:
          <input value = {props.valueNum}
          onChange = {props.onNumChange}></input>
        </div>

        <button type = {"submit"}>create new</button>
        
      </form>
    </>
    


export default Form
