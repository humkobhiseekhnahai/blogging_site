import axios from "axios"
import { AppBar } from "../components/AppBar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"


export const Publish = () => {
    const[title,setTitle]=useState("");
    const[content,setContent]=useState("")
    const navigate= useNavigate();
    
    return (
        <>
            <AppBar />
            <div className="flex justify-center flex-col items-center">
                <div className="max-w-screen-lg w-full">
                    <textarea onChange={(e)=> {
                        setTitle(e.target.value)
                    }} className="flex justify-center flex-col p-1 w-full text-sm text-gray-900 bg-gray-100 m-2" placeholder="Title"></textarea>
                </div>
                <TextEditor onChange={(e)=>{
                    setContent(e.target.value)
                }} content={content} title={title} navigate={navigate}/>
            </div>
        </>
    )
}

function TextEditor({content, title, onChange, navigate}:{content:string,title:string, onChange: (e :ChangeEvent<HTMLTextAreaElement> )=> void , navigate: ReturnType<typeof useNavigate>}) {
    return (
        <>
            <form className="max-w-screen-lg w-full">
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 max-w-screen-lg w-full ml-2">
                    <div className="bg-white rounded-b-lg w-full flex justify-center items-center">
                        <label className="sr-only">Publish post</label>
                        <textarea onChange={onChange} id="editor" rows={10} className="block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2 pt-1" placeholder="Write an article..." required ></textarea>
                    </div>
                </div>
                <button onClick={async()=>{
                    const response= await axios.post(`${BACKEND_URL}/blog`,{
                            title,
                            content
                        },{
                            headers:{
                                "Authorization":localStorage.getItem("token")
                            }
                        }
                    );
                    navigate(`/blog/${response.data.id}`);
                }}type="button" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 ml-2">
                    Publish post
                </button>
            </form>
        </>
    )
}

