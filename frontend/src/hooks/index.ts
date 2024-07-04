import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";


interface blogtype{
    title: string,
    content: string,
    id: number,
    author: {
        name: string
    }
}
export const useBlog = () => {
        const[loading, setLoading] = useState(true);
        const[blogs, setBlogs] = useState<blogtype[]>([]);
        
        useEffect(()=>{
            axios.get(`${BACKEND_URL}/blog/bulk`,{
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
                .then(response => {
                    setBlogs(response.data.blogs),
                    setLoading(false)
                })
        },[])

        return{
            loading,
            blogs
        }
            

}

export interface BlogPostProps{
    title: string,
    content: string,
    id:Number,
    author:{
        name: string
    }
}


export const useBlogPost = ({ id }:{id: string}) => {
    const[loading, setLoading] = useState(true);
    const[BlogPost, setBlogPost] = useState<BlogPostProps>();
    
    useEffect(()=>{
        axios.get(`${BACKEND_URL}/blog/${id}`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogPost(response.data.blog),
                console.log(BlogPost)
                setLoading(false)
            })
    },[id])

    return{
        loading,
        BlogPost
    }
        

}
