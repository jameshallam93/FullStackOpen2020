import React from 'react';
import ReactDOM from 'react-dom';
import { nanoid } from "nanoid";
import Course from "./components/Course";



const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: nanoid(),
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: nanoid()
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: nanoid()
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: nanoid()
        },
        {
          name: 'Redux',
          exercises: 11,
          id: nanoid()
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: nanoid(),
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: nanoid()
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: nanoid()
        }
      ]
    }
  ]


  return (
    <div>
      {courses.map(course =>
        <Course key = {course.id} course = {course}/>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

