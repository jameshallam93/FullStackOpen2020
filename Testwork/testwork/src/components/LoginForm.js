import React from 'react'

const LoginForm = ({
   handleLogin,
   handleUsernameChange,
   handlePasswordChange,
   username,
   password, 
   loginVisible,
   toggleLoginForm
  }) => {


    const hideWhenVisible = {display: loginVisible? "none": ""}
    const showWhenVisible = {display: loginVisible? "": "none"}
        
    
  return (
    <div>
        <div style = {hideWhenVisible}>
            <button onClick = {toggleLoginForm}>
                Login?
            </button>
        </div>
        <div style = {showWhenVisible}>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        value={username}
                        onChange={({target}) =>handleUsernameChange(target)}/>
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        onChange={({target}) =>handlePasswordChange(target)}/>
                </div>
                <button type="submit">
                    login
                </button>
            </form>
        </div>
      
    </div>
  )
}
export default LoginForm