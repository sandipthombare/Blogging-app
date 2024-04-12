
import { ChangeEvent,  } from "react";
import { Link,useNavigate } from "react-router-dom"
import { signupInput } from "@sandy99-cohort/common"
import { useState } from "react";
import axios from 'axios';
import { BACKEND_URL } from "../config";

export const Auth = ({ type }:{type:"signup" | "signin"}) => {
    const navigate = useNavigate();
    const [postInputs,setPostInputs] = useState<signupInput>({
        name:"",
        email:"",
        password:""
    });

    async function sendRequest(){
        try{
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin":"signup"}`,postInputs);

            const jwt = response.data.jwt;
            localStorage.setItem("token",jwt);
            navigate('/blogs');
        }catch(e) {
            alert("error")
        }
    }
    return <div className= "h-screen flex justify-center flex-col">
        <div className = "flex justify-center">
            <div>
                <div className = "px-10">
            <div className = "text-3xl font-extrabold">
                Create an account
            </div>

            <div className="text-slate-500">
                {type === "signup" ? "Already have an account?" :"Dont have an account?" }
                <Link className="pl-2 underline"to={type ==="signin" ? "/signup" : "/signin"}>{type ==="signin"?"signup":"signin"}</Link>
            </div>
            
           
            </div>

            <div className="px-1">
                {type ==="signup"?<LabelledInput label="Name" placeholder="sandip " onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name: e.target.value
                })
            }}/>:null}

              <LabelledInput label="Username" placeholder="sandip@gmail.com " onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    email: e.target.value
                })
            }}/>
              <LabelledInput label="Password" type={"password"} placeholder="12345 " onChange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    password: e.target.value
                })
            }}/>
            </div>
            <button onClick={sendRequest} type="button" className="mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm block w-full px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4">{type === "signup" ? "Sign up" : "Sign in"}</button>

            </div>
        </div>
    </div>
}

interface LabelledInputType {
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?: string
}
 
function LabelledInput({label,placeholder,onChange}:LabelledInputType){
    return <div>
       
        <label className="block mb-2 text-sm  text-black font-bold pt-2">{label}</label>

        <input onChange={onChange} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
}