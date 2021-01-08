const { indexOf } = require("lodash")
const _ = require("lodash")


const dummy = (array) =>{
    return 1
}
const totalLikes = (array) =>{
    
    if (array.length === 0){
        return 0
    }else{
        const reducer = (totalLikes, blogPost) =>{
            return totalLikes + blogPost.likes
        }
        return array.reduce(reducer,0)
    }
}

const favoriteBlog = (array) =>{

    //must be a way of doing this without empty object constant - why does returning empty object (return {})  evaluate to a string?
    const empty = {}
    let favorite = {
        likes:-1
    }
    array.map(blog =>{
        if (blog.likes > favorite.likes){
            favorite = blog
        }
    })
    if (favorite.likes === -1){
        return empty
    }
    return favorite
}

const indexOfGreatest = (array) =>{

     const returnIndex = array.reduce((maxIndex, currentValue, currentIndex, arrayObject) =>{
        return (currentValue > arrayObject[maxIndex]?
            currentIndex :
            maxIndex
        )},0
    )
            console.log(returnIndex)
    return returnIndex
}

const mostBlogs = (array) =>{
    let authors = []
    let numberOfBlogs = []


    array.map(blog =>{
        if (!authors.includes(blog.author)){
            authors.push(blog.author)
            numberOfBlogs.push(1)  

        }else if(authors.includes(blog.author)){
            const index = authors.indexOf(blog.author)
            numberOfBlogs[index] = numberOfBlogs[index] + 1
    }})

    if (authors.length === 0){
        return {error: "List contains no blogs"}

    }else if(authors.length === 1){
        return {
            author: authors[0],
            blogs: numberOfBlogs[0]
        }
    }
    console.log(`number of blogs: ${numberOfBlogs}`)
    const index = indexOfGreatest(numberOfBlogs)
    console.log(index)

    return {
        author: authors[index],
        blogs: numberOfBlogs[index]
    }
}

const mostLikes = (array) =>{
    let authors = []
    let numberOfLikes = []

    array.map(blog =>{
        let author = blog.author
        let likes = blog.likes
        let index = authors.indexOf(author)
        
        if (!(authors.includes(author))){
            authors.push(author)
            numberOfLikes.push(likes)
        }else{
            numberOfLikes[index] = numberOfLikes[index] + likes
        }
    })
    const highestIndex = indexOfGreatest(numberOfLikes)
 
    return {
        author: authors[highestIndex],
        likes: numberOfLikes[highestIndex]
    }
}


const blogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }]
const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
const listWithTwoBlogs =  [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },   
    
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Test blog',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 10,
        __v: 0
      }
  ]
console.log(mostLikes(blogs))
console.log(mostBlogs(blogs))

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}