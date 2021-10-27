import { useEffect, useState } from "react"
import Loading from "./loading";
import Tweet from "./tweet";


export default function TwitterFeed(props) {

    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        console.log('used effect');
        props.socket.on('match', (tweet) => {
            console.log("Match");
            setTweets(prevTweets => [...prevTweets, tweet]);
        });
    },[]);

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


