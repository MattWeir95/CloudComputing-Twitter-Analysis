import { useEffect, useState } from "react"
import Loading from "./loading";
import Tweet from "./tweet";


export default function TwitterFeed(props){

    


    useEffect(() => {
        props.socket.on('match', (tweet) => {
            props.setTweets(props.tweets.concat(tweet));
          })
         
    })

    if(props.tweets.length<=0){
        return (
            <div   className="mr-2 border-gray-200 border shadow-md rounded-t-xl w-2/5 pb-6">
                 <div className="w-full bg-blue-200 rounded-t-xl">
                <h1 className="text-center">Live Feed</h1>
                    
                </div>
                <div  id="live-feed" className="h-full overflow-y-scroll bg-gray-200 bg-opacity-25">
                <Loading />
                    </div>
            </div>
            
        )
    }
    else{
        return(
        
       
            <div   className="mr-2 border-gray-200 border shadow-md rounded-bl-lg rounded-t-xl w-2/5 pb-6">
                 <div className="w-full bg-blue-200 rounded-t-xl">
                <h1 className="text-center">Live Feed</h1>
                    
                </div>
                <div  id="live-feed" className="h-full overflow-y-scroll overflow-x-hidden bg-gray-200 bg-opacity-25 text-center">

                    {props.tweets.map((tweet, key) => {
                       
                        return( <Tweet tweet={tweet} key={key} setSelectedTweet={props.setSelectedTweet} />)
                    })}


                    </div>
            </div>
        )
    }


    
}


