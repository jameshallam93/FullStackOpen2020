import React from "react"

import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import { prettyDOM } from "@testing-library/dom"
import Note from "./Note"   


test("renders content", () =>{
    const note = {
        content: "This is a new note",
        important: true
    }
    const component = render(
        <Note note = {note}/>
    )
    const li = component.container.querySelector("li")

    console.log(prettyDOM(li))
    component.debug()
        //method 1
    expect(component.container).toHaveTextContent(
        "This is a new note"
    )
        //method 2
    const text = component.getByText(
        "This is a new note"
    )
        //method 3
    const div = component.container.querySelector(".note")
    expect(div).toHaveTextContent("This is a new note")

    expect(text).toBeDefined()
})

test("clicking the button calls event handler once", ()=>{

    const note = {
        content:"event handler fired",
        important:false
    }

    const mockFunction = jest.fn() 

    const component = render(
        <Note note = {note}
        toggleImportance = {mockFunction}/>
    )
    const button = component.getByText("make important")
    fireEvent.click(button)

    console.log(mockFunction.mock.calls);
    

    expect(mockFunction.mock.calls).toHaveLength(1)
    
})