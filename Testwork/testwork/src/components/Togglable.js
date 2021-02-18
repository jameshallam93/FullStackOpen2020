import React from "react"
import { useState } from "react"



const Togglable = React.forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () =>{
        setVisible(!visible)
    }

    const shownWhenVisible = {display: visible? "":"none"}
    const hiddenWhenVisible = {display: visible? "none": ""}

    return (
        <>
            <div style = {hiddenWhenVisible}>
                <button onClick = {toggleVisible}>
                    {props.buttonLabel}
                </button>
            </div>
            <div style = {shownWhenVisible} className = "togglableContent">
                {props.children}
                <button onClick = {toggleVisible}>
                    cancel
                </button>
            </div>
        </>
    )
})

Togglable.displayName = "Togglable"


export default Togglable