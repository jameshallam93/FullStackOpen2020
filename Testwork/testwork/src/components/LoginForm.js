import React from "react"

const LoginForm = (props) =>{
    return(
        <div>
            <form>
            <div>
                username:
                <input type = "text"
                name = "username"
                value = {props.username}
                onChange = {props.handleUsernameChange}>
                </input>
            </div>
            <div>
                password:
                <input type = "text"
                name = "password"
                value = {props.password}
                onChange = {props.handlePasswordChange}>
                </input>
                <button onClick = {props.handleLogin}>
                Login
                </button>
            </div>
            </form>
        </div>
    )
}


export default LoginForm