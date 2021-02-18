import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import NoteForm from "./NoteForm"

describe("<NoteForm/>",() =>{
    let component;
    const createNote = jest.fn()

    beforeEach(()=>{
        component = render(
            <NoteForm createNote = {createNote}/>
        )
    })
    test("calls createNote function and updates parent state", ()=>{
        const input = component.container.querySelector("input")
        const form = component.container.querySelector("form")

        fireEvent.change(input, {
            target:{value:"this is hard"}
        })
        fireEvent.submit(form)

        expect(createNote.mock.calls).toHaveLength(1)
        expect(createNote.mock.calls[0][0].content).toBe("this is hard")
    })
})