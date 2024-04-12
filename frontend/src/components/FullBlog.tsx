import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({ blog } : { blog:Blog }) => {
    return <div>
        <Appbar/>
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className= "text-slate-500 pt-4">
                        Post on 2nd December 2023
                    </div>
                    <div className="pt-2">
                        {blog.content}
                    </div>
                </div>

                <div className=" col-span-4">
                    <div className="text-slate-400 pb-2">
                            Author
                        <div className='flex w-full'>
                            <div className="text-slate-500 pt-4">
                            <Avatar name={blog.author.name || "A"} />
                            </div>
                            <div className="text-slate-800">
                                <div className="pl-3 font-bold text-xl">
                                    {blog.author.name || "Anonyomous"} 
                                </div>
                                <div className="flex  justify-center pl-3 pt-2">
                                Master of mirth,purveyor of puns,and the funniest person in the kingdom.
                                </div>
                            </div>
                        </div>
                    </div>  
                    </div>   
                </div>
            </div>
        </div>
}