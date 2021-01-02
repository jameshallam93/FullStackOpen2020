import React from 'react';


const Note = ({note, toggleImportance, handleDelete}) =>{

  const label = note.important ?
  "make not important" : "make important"


  return(
    <>
      <li className = "note">{note.content}</li>
      <button onClick = {toggleImportance}>{label}</button>
      <button onClick = {handleDelete}>Delete </button>
    </>
  )
}
export default Note