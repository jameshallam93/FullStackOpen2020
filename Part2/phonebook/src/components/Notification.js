const Notification = ({message}) =>{

    if (message == null){
        return null

    }else
    {
        const messageStyle = {
            color:"green",
            background:"lightgrey",
            fontSize:16,
            borderStyle:"solid",
            borderRadius:5,
            padding:10,
            marginBottom:10
        }
        const errorStyle = {
            ...messageStyle,
            color:"red"
        }
        const styleToUse = (
            message.includes("Error") ?
            errorStyle 
            :
            messageStyle
        )



        return(
            <div style = {styleToUse}>
                {message}
            </div>
        )
    }
}

export default Notification