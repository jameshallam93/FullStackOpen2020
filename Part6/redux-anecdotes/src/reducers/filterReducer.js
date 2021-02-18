
const filterReducer = (state = "", action) =>{
    switch (action.type){
        case "UPDATE_FILTER":
            return action.data.value
        default:
            return state
    }
}
export const updateFilter = (value) =>{
    return {
        type:"UPDATE_FILTER",
        data:{
            value,
        }
    }
}
export default filterReducer