import React from "react";
import Heading from "./Heading"


const Filter = ({value, onChange}) =>

    <div>
      <Heading text = {"Search for a name"}/>
      Filter shown with  
          <input value = {value}
            onChange ={onChange}>
          </input>
    </div>


export default Filter