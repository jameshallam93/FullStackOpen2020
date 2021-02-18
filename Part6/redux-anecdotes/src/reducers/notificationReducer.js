import { useDispatch } from "react-redux"



const notificationReducer = (state = "", action) =>{
    switch (action.type){
        case("RESET_NOTIFICATION"):
            return ""
        case("INCREMENT_VOTES"):
            return `You voted for the anecdote "${action.data.content}"`
        case("NEW_ANECDOTE"):
            return `You just added a new anecdote, "${action.data.content}"`
        default:
            return state
    }   
}

export const notificationReset = notification =>{
    return {
        type: "RESET_NOTIFICATION",
        notification,
    }
}


export default notificationReducer