import { useState } from "react"
import React from "react"
import welcomeMessage from "./WelcomeMessage"

const Togglable = (props) =>{
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible? "none" : ""}
    const showWhenVisible = {display: visible? "": "none"}

    const toggleVisibility = () =>{
        setVisible(!visible)
    }
    const welcome = () =>{
        if (props.buttonLabel === "login"){
            return welcomeMessage
        }else {
            return null
        }
    }
    return(
        <>
        <div style = {hideWhenVisible}>
            {welcome()}
            <div>
            <button onClick = {toggleVisibility}>{props.buttonLabel}</button>
            </div>
        </div>
        <div style = {showWhenVisible}>
            {props.children}
            <button onClick = {toggleVisibility}>
                cancel
            </button>
        </div>
        </>
    )
}
export default Togglable