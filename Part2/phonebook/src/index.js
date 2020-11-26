import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from "./App"

//base person objects for ease
const people = [{name:"Ada Lovelace", number: "01235 760906"},
{name: "Tom Laurence", number: "01235 768446"}]


ReactDOM.render(
  <React.StrictMode>
    <App people = {people}/>
  </React.StrictMode>,
  document.getElementById('root')
);

