import React from 'react'
import { useSelector } from "react-redux"

const Notification = () => {

  const notification = useSelector(state =>state.notification)

  const style = {
    display: notification? "": "none",
    border: 'solid',
    padding: 10,
    borderWidth: 1
  } 
  return (
    <div style={style}>
      <p>{notification}</p>
    </div>
  )
}

export default Notification