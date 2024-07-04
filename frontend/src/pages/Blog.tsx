import { useParams } from "react-router-dom";
import { useBlogPost } from "../hooks";
import { FullBlog } from "../components/FullBlog";

export const Blog = () =>{
    const { id } = useParams();
    const {loading, BlogPost} = useBlogPost({
        id: id || ""
    })
    if (loading) {
        return (
            <div>...loading</div>
        )
    }
    return(
        <>
        <div>
            <FullBlog blog={BlogPost}/>
        </div>
        </>

    )
}

