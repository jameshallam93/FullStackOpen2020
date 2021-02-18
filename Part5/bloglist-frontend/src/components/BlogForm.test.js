import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import BlogForm from "./BlogForm"

describe("<BlogForm/>",() =>{
    let component;
    const mockNewBlog = jest.fn()
    beforeEach(()=>{
    component = render(
        <BlogForm handleNewBlog = {mockNewBlog}/>
    )
    }
    )
    test("when form is submitted, handleNewBlog function is called once", ()=>{
        const titleInput = component.container.querySelector(".title")
        const authorInput = component.container.querySelector(".author")
        const urlInput = component.container.querySelector(".url")

       // const button = component.container.querySelector(".submit")
        const form = component.container.querySelector("form")

        fireEvent.change(titleInput, {
            target : { value : "Test Title"}
        })
        fireEvent.change(authorInput, {
            target: { value : "Test author"}
        })
        fireEvent.change(urlInput, {
            target : { value : "Test url"}
        })
        //fireEvent.click(button)
        fireEvent.submit(form)

        expect(mockNewBlog).toHaveBeenCalled()
    })
})
