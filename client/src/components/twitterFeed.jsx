import { useState } from "react"
import Tweets from "./tweetTest"

export default function TwitterFeed(){

    const [loading, setLoading] = useState(false);


    if(loading){
        return (
            <div   className="mr-4 border-gray-200 border shadow-md rounded-t-xl w-2/5 pb-6">
                 <div className="w-full bg-blue-200 rounded-t-xl">
                <h1 className="text-center">Live Feed</h1>
                    
                </div>
                <div  id="live-feed" className="h-full overflow-y-scroll bg-gray-200 bg-opacity-25">
                <div className="flex justify-center items-center mt-20">
                    <button className="bg-white rounded-xl p-2 shadow animate-bounce">Loading...</button>
                </div>
                    </div>
            </div>
            
        )
    }
    else{
        return(
        
       
            <div   className="mr-4 border-gray-200 border shadow-md rounded-t-xl w-2/5 pb-6">
                 <div className="w-full bg-blue-200 rounded-t-xl">
                <h1 className="text-center">Live Feed</h1>
                    
                </div>
                <div  id="live-feed" className="h-full overflow-y-scroll bg-gray-200 bg-opacity-25">
                <Tweets />
                    </div>
            </div>
        )
    }


    
}


