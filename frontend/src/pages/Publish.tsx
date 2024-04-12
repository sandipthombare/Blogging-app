import { Appbar } from "../components/Appbar"
import { useState,ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";


export const Publish =() => {
    
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("")
    const navigate = useNavigate();

    return <div >
        <Appbar />
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
            <input onChange={ (e) => {
                setTitle(e.target.value)
            }}type="text" className = "w-full bg-gray-50 border block w-full p-2.5"placeholder="Title" />

            <TextEditor onChange={(e) => {
                setDescription(e.target.value)
            }}/>

        <div>
            <button onClick={async () => {
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                    title,
                    content:description
                },{
                    headers: {
                        Authorization:localStorage.getItem("token")
                    }
                });
                navigate(`/blog/${response.data.id}`)
            }}
            type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
            Publish post
            </button>
        </div>
        </div>
        </div>

    </div>
}

function TextEditor({onChange}:{onChange: (e:ChangeEvent <HTMLTextAreaElement>) => void}) {

    return <form>
      <div>
       <div className="w-full mb-4 border">

        < div className="flex items-center justify-between border-0">
        
            <label className="sr-only">Publish post</label>

        <textarea onChange={onChange} id="editor" rows={8} className="block w-full px-0 text-sm border  text-gray-800 bg-white focus:outline-none" placeholder="Write an article..." required />

       
       </div>
       </div>
   </div>
</form>
    

}