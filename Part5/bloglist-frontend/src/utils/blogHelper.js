import blogService from "../services/blogs"


//for spyOn testing - need to start separating functions like this as standard to allow for better tests
const blogFunctions = {

    async updateLikes (blog) {
        blog.likes = blog.likes + 1
        await blogService.update(blog)
    },
   
}

export default blogFunctions