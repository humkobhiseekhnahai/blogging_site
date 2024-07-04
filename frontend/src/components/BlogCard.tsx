import { Link } from "react-router-dom"

interface BlogCardProps {
    author: string,
    title: string,
    content: string,
    publishedDate: string,
    id: Number
}
export const BlogCard = ({
    author,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps) => {
    return (
        <>
            <Link to={`/blog/${id}`}>
                <div className="border-b border-slate-200 p-4 w-screen max-w-screen-md cursor-pointer">
                    <div className="flex">
                        <div >
                            <Avatar size="small" name={author} />
                        </div>
                        <div className="font-extralight text-sm pl-2 flex justify-center flex-col">
                            {author}
                        </div>
                        <div className="flex justify-center flex-col pt-2 pl-2 ">
                            {/* enter the dot here */}
                            <SmallDot />
                        </div>
                        <div className="pl-2 font-thin text-slate-500 flex justify-center flex-col">
                            {publishedDate}
                        </div>
                    </div>
                    <div className="text-xl font-semibold pt-2">
                        {title}
                    </div>
                    <div className="text-md font-thin">
                        {content.slice(0, 100) + "..."}
                    </div>
                    <div className="text-sm text-slate-500 font-thin pt-4">
                        {`${Math.ceil(content.length / 100)} minutes(s) read`}
                    </div>
                </div>
            </Link>
        </>
    )
}


export function SmallDot() {
    return (
        <>
            <div className="h-1 w-1 rounded-full bg-gray-500">

            </div>
        </>
    )
}

export function Avatar({ name, size }: { name: string, size: "small" | "big" }) {
    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "big" ? "w-10 h-10" : "w-4 h-4"}`}>
            <span className="font-medium text-xs text-gray-600 dark:text-gray-300 ">{name[0]}</span>
        </div>
    )
}
