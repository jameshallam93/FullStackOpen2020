import { useState } from "react"
import React from "react"
import welcomeMessage from "./WelcomeMessage"
import PropTypes from "prop-types"

const Togglable = React.forwardRef((props,ref) =>{
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible? "none" : ""}
    const showWhenVisible = {display: visible? "": "none"}

    const toggleVisibility = () =>{
        setVisible(!visible)
    }
    //this is hacky - fix
    //separate into welcomemessage component - no reason for it to be here
    const welcome = () =>{
        if (props.buttonLabel === "Login"){
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
})
Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = "Togglable"
export default Togglable