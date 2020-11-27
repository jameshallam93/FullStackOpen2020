import React from "react"


const SearchResult = ({country, handleClick}) =>{

    
    return(
        <>
        <div>{country.name}
        <button onClick = {() => handleClick(country.name)}>
            Show</button> </div>
        </>
    )
}

export default SearchResult