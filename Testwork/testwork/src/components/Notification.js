const Notification = ({message}) =>{
    if (message === null){
        return null
    }else{
        console.log(message)
        return(
            <div className = "error">
                {message}
            </div>
        )
    }
}
export default Notification