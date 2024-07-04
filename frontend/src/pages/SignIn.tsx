import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const SignIn = () =>{
    return(
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div>
                    <Auth type={"Signin"}/>
                </div>
                <div className="invisible lg:visible">
                    <Quote />
                </div>

            </div>
        </>


    )
}