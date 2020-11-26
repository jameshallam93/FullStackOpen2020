import React from "react";
import reactDom from "react-dom"
import { nanoid } from "nanoid";

const Header = ({course}) => 

  <>
  <h1>{course.name}</h1>
  </>


const Part = ({name, exercises}) => 
 
    <>
    <p>{name} {exercises}</p>
    </>
  


const Content = ({parts}) => {

    return(
    <>
    {parts.map(part =>
      <Part key = {part.id} name = {part.name} exercises = {part.exercises}/>)}
    </>
    )
}

const Total = ({parts}) => {
  const total = parts.reduce((total, part)=>{
    return (total + part.exercises);
  }, 0)

  return(
  <>
  <h4>Total of {total} exercises</h4>
  </>
  )
}

const Course = ({course}) =>

    <>
    <Header course = {course}/>
    <Content parts = {course.parts}/>
    <Total parts = {course.parts}/>
    </>


export default Course