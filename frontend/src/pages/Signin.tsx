import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"

export const Signin = () => {
    return <div>
        <div className="grid grid-cols-2">
            <div className="flex justify-center items-center">
            
            <Auth type={"signin"} />
      
        </div>        
        
            <div className = "none lg:block">
                <Quote />
            </div>
        </div>
    </div>
}