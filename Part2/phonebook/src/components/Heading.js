import React from "react";

const Heading = ({text}) =>{

    const headingStyle = {
        color:"blue",
        textDecoration:"underline"
    }

    return(
    <>
        <h1 style = {headingStyle}>
            {text}
        </h1>
    </>
    )
}
export default Heading