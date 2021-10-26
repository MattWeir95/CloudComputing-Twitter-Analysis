import { useEffect, useState } from "react"
import Loading from "./loading";
import Tweet from "./tweet";
import socketClient from "socket.io-client";

const API_PORT = 3004
const API_URL = `http://localhost:${API_PORT}`;


export default function TwitterFeed(props) {
    console.log("Twit F");
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const socket = socketClient(API_URL);

        //Not sure why but we arent catching any 'match' events and re rendering even though its the exact same as
        //the otherFeed component
        socket.on('match', (tweet) => {
            setTweets(prevTweets => [...prevTweets, tweet]);
        })
        socket.open();
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
                {tweets <= 0 ? <Loading /> : tweets.map((tweet, key) => {
                    return (<Tweet tweet={tweet} key={key} setSelectedTweet={props.setSelectedTweet} />)
                })}
            </div>
        </div>
    )



}


