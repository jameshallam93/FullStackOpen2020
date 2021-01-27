import React from "react"
import messageStyle from "../utils/styles"

const Notification = (props) =>{
    let message = props.message[1]
    let type = props.message[0]

    if (message === null){
        return null
    }else if (typeof message === "string"){
    const errorStyle = {
        ...messageStyle,
        color:"red"
    }
    console.log(message)
    const styleToUse = (
        type === "Error"?
        errorStyle 
        :
        messageStyle
    )

    return (
        <div style = {styleToUse}>
            <h1>{message}</h1>
        </div>
    )
    
    }
}

export default Notification