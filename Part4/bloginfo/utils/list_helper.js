

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
    const empty = {}
    let favorite = {
        title:"",
        author:"",
        url:"",
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
module.exports = {dummy, totalLikes, favoriteBlog}