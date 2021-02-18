import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent, act } from "@testing-library/react"
import { prettyDOM } from "@testing-library/dom"
import Blog from "./Blog"
import helper from "../utils/blogHelper"

describe("<Blog/>",()=>{
    let component;
    let blog = {
        title:"Test blog",
        author:"Testo",
        url:"http",
        likes:2
    }

    let mockUpdate = jest.fn()
    let mockNotification = jest.fn()

    beforeEach(()=>{
        component = render(
        <Blog blog = {blog}
            mockUpdate = {mockUpdate}
            mockNotification = {mockNotification}/>
        )
    })

    test("Renders the blogs title", ()=>{
        const blog = component.container.querySelector(".blog")

        expect(blog).toBeDefined()
        expect(blog).toHaveTextContent("Test blog")
    })
    test("Renders the blogs author",()=>{
        const blog = component.container.querySelector(".blog")
        expect(blog).toHaveTextContent("Testo")

    })
    test("Does not render hidden info at the start", ()=>{
        const hidden = component.container.querySelector(".hiddenInfo")
        expect(hidden).toHaveStyle("display:none")
    })
    
    test("After clicking the 'Show info' button, hidden info is displayed", ()=>{
        const hidden = component.container.querySelector(".hiddenInfo")
        const button = component.getByText("Show info")
        fireEvent.click(button)

        expect(hidden).not.toHaveStyle("display:none")
    })
    test("After clicking the 'Hide info' button, hidden info is not displayed", ()=>{
        const hidden = component.container.querySelector(".hiddenInfo")

        const showButton = component.getByText("Show info")
        fireEvent.click(showButton)

        const hideButton = component.getByText("Hide info")
        fireEvent.click(hideButton)

        expect(hidden).toHaveStyle("display:none")
    })

    test("when the like button is pressed, updateLikes function is called once", ()=>{
        const likeSpy = jest.spyOn(helper, "updateLikes")

        const showButton = component.getByText("Show info")
        fireEvent.click(showButton)
        
        const likeButton = component.getByText("Like")
        fireEvent.click(likeButton)

        expect(likeSpy).toHaveBeenCalled()
        act(()=>{likeSpy.mockReset()})
    })
    test("when the like button is pressed twice, updateLikes function is called twice", ()=>{
        const likeSpy = jest.spyOn(helper, "updateLikes")
        
        const showButton = component.getByText("Show info")
        fireEvent.click(showButton)

        const likeButton = component.getByText("Like")
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(likeSpy).toHaveBeenCalledTimes(2)
    })
})