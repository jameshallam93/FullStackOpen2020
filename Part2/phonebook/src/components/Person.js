import React from "react";

const Person = ({person, handleDelete}) =>{
    const personStyle = {
        color:"green",
        fontStyle:"italic",
    }
    return (
        <>
            <p style = {personStyle}><b>{person.name} - {person.number}</b></p>
            <button onClick = {() => handleDelete(person.id)}>Delete</button>
        </>
    )
}

export default Person