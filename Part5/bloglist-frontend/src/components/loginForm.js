import React from "react"
import { useState } from "react"

const LoginForm = ({ handleLogin }) =>{

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const clearLoginBox = () =>{
    setUsername("")
    setPassword("")
  }

  const onSubmit = (event) =>{
    event.preventDefault()
    handleLogin(username, password)
    clearLoginBox()

  }

      return(
      <form>
      <div>
          <h2>login</h2>
          username
          <div>
            <input type = "text"
            value = {username}
            name = "username"
            onChange = {({target})=>setUsername(target.value)}>
            </input>
          </div>
          password
          <div>
            <input type = "password"
            value = {password}
            name = "password"
            onChange = {({target}) =>setPassword(target.value)}>
            </input>
          </div>
          <button type = "submit"
          onClick = {onSubmit}>
              login
          </button>
      </div>
      </form>
      )
    
}


export default LoginForm 