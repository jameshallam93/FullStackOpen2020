import React from "react"

const LoginForm = ({props}) =>(
    <div>
        <h2>login</h2>
        username
        <input type = "text"
        value = {props.username}
        name = "username"
        onChange = {({target})=>{props.setUsername(target.value)}}>
        </input>
        <input type = "text"
        value = {props.password}
        name = "password"
        onChange = {({target}) =>{props.setPassword(target.value)}}>
        </input>
        <button type = "submit"
        onClick = {props.handleLogin}>
            login
        </button>
    </div>
)


export default LoginForm 