import { useEffect, useState } from "react"
import Loading from "./loading";
import Tweet from "./tweet";
import socketClient from "socket.io-client";

const API_PORT = 3004
const API_URL = `http://localhost:${API_PORT}`;


export default function TwitterFeed(props) {

    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const socket = socketClient(API_URL);

        //Not sure why but we arent catching any 'match' events and re rendering even though its the exact same as
        //the otherFeed component
        
        //Doesnt have anything to do with this component i think, because if you change 'match' to history it works fine.
        socket.on('match', (tweet) => {
            console.log("Match");
            setTweets(prevTweets => [...prevTweets, tweet]);
        })
        socket.open();

        //This is called when the component un-mounts. 
        return () => {
            socket.close();
        }
    });

    return (
        <div className="mr-2 border-gray-200 border shadow-md rounded-bl-lg rounded-t-xl w-2/5 pb-6">
            <div className="w-full bg-blue-200 rounded-t-xl">
                <h1 className="text-center">Live Feed</h1>

            </div>
            <div id="live-feed" className="h-full overflow-y-scroll overflow-x-hidden bg-gray-200 bg-opacity-25 text-center">
                {/* If no tweets, display loading. Otherwise show tweets.*/}
                {tweets <= 0 ? <Loading /> : tweets.map((tweet, i) => {
                    return (<Tweet tweet={tweet} key={i} setSelectedTweet={props.setSelectedTweet} />)
                })}
            
            </div>
        </div>
    )



}


