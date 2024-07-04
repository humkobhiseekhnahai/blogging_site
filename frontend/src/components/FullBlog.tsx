import { BlogPostProps } from "../hooks"
import { AppBar } from "./AppBar"
import { Avatar } from "./BlogCard"


export const FullBlog = ({ blog }: { blog: BlogPostProps}) => {

    return (
        <>
            <div>
                <AppBar />
            </div>
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-20 pt-10 max-w-screen-2xl w-full">
                    <div className="col-span-8 ">
                        <div className="text-4xl font-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-gray-400 pt-4 font-thin">
                            Published on 12th dec 2024
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4">
                        <div className="text-lg font-small text-slate-600">
                            Author
                        </div>
                        <div className="flex w-full">
                            <div className="flex flex-col justify-center pr-2">
                                <Avatar name={blog.author.name || "Anonymous"} size={"big"} />
                            </div>
                            <div>
                                <div className="font-bold text-lg">
                                    {blog.author.name || "anonymous"}
                                </div>
                                <div className="font-small text-sm text-gray-500">
                                    Random catch phrase for the author mybe by the author
                                </div>
                            </div>
                        </div>

                    </div>


                </div>

            </div>
        </>

    )
}
