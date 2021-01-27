import React from "react"

const LoginForm = (props) =>{

    return(
    <form>
    <div>
        <h2>login</h2>
        username
        <div>
          <input type = "text"
          value = {props.usernameState}
          name = "username"
          onChange = {({target})=>props.usernameFunction(target.value)}>
          </input>
        </div>
        password
        <div>
          <input type = "password"
          value = {props.passwordState}
          name = "password"
          onChange = {({target}) =>props.passwordFunction(target.value)}>
          </input>
        </div>
        <button type = "submit"
        onClick = {props.onSubmit}>
            login
        </button>
    </div>
    </form>
    )
}


export default LoginForm 