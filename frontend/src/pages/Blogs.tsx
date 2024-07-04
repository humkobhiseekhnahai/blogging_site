import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import BlogsSkeleton from "../components/BlogsSkeleton"
import { useBlog } from "../hooks"

export const Blogs = () => {
    const {loading,blogs} = useBlog()

    if (loading){
        return <div>
            <AppBar/>
            <div className="flex justify-center flex-col items-center">
            <BlogsSkeleton/>
            <BlogsSkeleton/>
            <BlogsSkeleton/>
            <BlogsSkeleton/>
            <BlogsSkeleton/>
            </div>
        </div>
    }
    return (
        <>
        <div>
            <AppBar/>
        </div>
            <div className="flex justify-center">
                <div>
                    {blogs.map(blog => <BlogCard
                        author={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate="12th dec, 2024" 
                        id={blog.id}                    
                        />)}
                    
                   
                </div>

            </div>
        </>

    )
}