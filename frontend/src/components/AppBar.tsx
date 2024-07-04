import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const AppBar = () => {
    return (
        <>
            <div className="flex justify-between px-10 py-4 border-b ">
                <Link className="flex justify-center flex-col" to={"/blogs"}>
                    Medium
                </Link>


                <div className="flex justify-between ">
                    <Link className="flex justify-center flex-col" to={"/publish"}>
                    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xs px-3.5 py-2 text-center mr-4 ">
                        New
                    </button>

                    </Link>
                    <div className="flex justify-center flex-col">
                        <Avatar size="big" name="Pratham" />
                    </div>

                </div>
            </div>
        </>
    )
}