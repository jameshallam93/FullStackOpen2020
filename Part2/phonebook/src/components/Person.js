import React from "react";

const Person = ({person, handleDelete}) =>{
    return (
        <>
            <p>{person.name} - {person.number}</p>
            <button onClick = {() => handleDelete(person.id)}>Delete</button>
        </>
    )
}

export default Person