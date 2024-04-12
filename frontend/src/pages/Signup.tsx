import { Quote } from "../components/Quote"
import { Auth } from "../components/Auth"

export const Signup = () => {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="flex justify-center items-center">
            
            <Auth type={"signup"} />
      
        </div>        
        
            <div className = "invisible md:visible">
                <Quote />
            </div>
        </div>
    </div>
}