import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs=() => {
    const {loading,blogs} =useBlogs();

    if(loading){
        return <div>
            <BlogSkeleton />
            <BlogSkeleton />
           
        </div>
    }
 
    return <div>
        <Appbar />
    
    <div className ="flex justify-center">
        <div >
            {blogs.map(blog => <BlogCard
                    id={blog.id}
                  authorName={blog.author.name || "anyonymous"} title={blog.title} content={blog.content} publishedDate={"10-04-2024"} />
   )}
        
        </div>
    </div>
    </div>
}