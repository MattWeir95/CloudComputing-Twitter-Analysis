import { useEffect, useState } from "react"
import Loading from "./loading";
import Tweet from "./tweet";
import socketClient from "socket.io-client";

const API_PORT = 3004
const API_URL = `http://localhost:${API_PORT}`;


export default function OthersFeed(props) {
    console.log("Other F");

    const [history, setHistory] = useState([]);

    useEffect(() => {
        const socket = socketClient(API_URL);

        socket.on('history', (tweet) => {
            setHistory(prevHistory => [...prevHistory, tweet]);
        })
        socket.open();
        return () => {
            socket.close();
        }
    });

    return (


        <div className="ml-2 border-gray-200 border shadow-md rounded-bl-lg rounded-t-xl w-2/5 pb-6">
            <div className="w-full bg-blue-200 rounded-t-xl">
                <h1 className="text-center">Other People's Feed</h1>

            </div>
            <div id="live-feed" className="h-full overflow-y-scroll overflow-x-hidden bg-gray-200 bg-opacity-25 text-center">
                {history <= 0 ? <Loading /> : history.map((tweet, key) => {
                    return (<Tweet tweet={tweet} key={key} setSelectedTweet={props.setSelectedTweet} />)
                })}
            </div>
        </div>
    )




}

