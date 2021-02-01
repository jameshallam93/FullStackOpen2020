import React from "react"
import { useState } from "react"
import userService from "../services/users"

const NewUserForm = ({notification}) =>{
    
    const [newUser, setNewUser] = useState("")
    const [newName, setNewName] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const handleNewUser = async (event) =>{
        event.preventDefault()
        try{
        const userCredentials = {
            username:newUser,
            name:newName,
            password:newPassword
        }
        await userService.newUser(userCredentials)
        notification(["Message",`${newUser} account created`], 3000)
        setNewUser("")
        setNewName("")
        setNewPassword("")
    }catch (exception){
        notification(["Error", `unable to create account`], 3000)
    }
    }
    return (
        <div>
            <p>WARNING - this web app is intended for demonstration purposes only</p>
            <p>Although passwords are hashed and not stored in plain text, it is STRONGLY advised not to enter any username/password that you use on any other site </p>
            <p>username and password must both be at least 3 characters long for heightened security (lol) and username must be unique</p>
            <form>
                <div>
                    Username:
                    <input type = "text"
                    name = "username"
                    value = {newUser}
                    onChange = {({target}) => setNewUser(target.value)}>
                    </input>
                </div>
                <div>
                    Name:
                    <input type = "text"
                    name = "name"
                    value = {newName}
                    onChange = {({target}) =>setNewName(target.value)}>
                    </input>
                </div>
                <div>
                    Password:
                    <input type = "password"
                    name = "password"
                    value = {newPassword}
                    onChange = {({target}) =>setNewPassword(target.value)}>
                    </input>
                </div>
                <button type = "submit"
                onClick = {handleNewUser}>
                    create account
                </button>
            </form>
        </div>
    )

}
export default NewUserForm