import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signupInput } from "@sharmaji_09/common"
import axios from "axios";
import { BACKEND_URL } from "../config.ts"

export const Auth = ({ type }: { type: "Signup" | "Signin" }) => {
    const [postInputs, setPostInputs] = useState<signupInput>({
        name: "",
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/user/${type === "Signup" ? "signup" : "signin"}`, postInputs)
            console.log(postInputs);
            const jwt = response.data.token
            localStorage.setItem("token", jwt)
            navigate("/blog")
        }catch(e){
            alert("error while signing up")
            console.log("error")
        }
        
    }
    return (
        <>
            <div className="h-screen w-full flex justify-center flex-col items-center">
                <div className="px-10">
                    <div className="font-bold text-3xl text-center">
                        {type === "Signup" ? "Create an account" : "Sign in"}
                    </div>
                    <div className="text-slate-400 text-center">
                        {type === "Signup" ? "Already Have An Account?" : "Create An Account ?"}
                        <Link className="underline pl-1" to={type === "Signup" ? "/signin" : "/signup"}>
                            {type === "Signup" ? "Login" : "Sign up"}
                        </Link>
                    </div>
                </div>
                <div className="py-10 px-40 ">
                    {type === "Signup" ? <LabelledInput label="Name" placeholder="Enter Your Name" type={"text"} onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            name: e.target.value
                        }))
                    }} /> : null}

                    <LabelledInput label="Username" placeholder="pratham@gmail.com" type={"text"} onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            username: e.target.value
                        }))
                    }} />

                    <LabelledInput label="Password" placeholder="12345" type={"password"} onChange={(e) => {
                        setPostInputs(c => ({
                            ...c,
                            password: e.target.value
                        }))
                    }} />

                    <button 
                    type="button" 
                    onClick={sendRequest}
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 ml-3 mt-5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-full"
                    >
                        {type === "Signin" ? "Sign in" : "Sign up"}
                    </button>
                </div>

            </div>
        </>
    )
}

interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

const LabelledInput = ({ label, onChange, placeholder, type }: LabelledInputType) => {
    return (
        <>
            <label className=" m-2 text-sm font-bold text-black py-4 ">{label}</label>
            <input
                onChange={onChange}
                type={type}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 text-left w-full m-3"
                placeholder={placeholder}
                required
            />
        </>
    );
};
