import Loading from "./loading";
import TweetSentiment from "./tweetSentiment";

export default function Sentiment(props) {

        return (
            <div className=" border-gray-200 border shadow-md rounded-xl h-full w-full bg-gray-200 bg-opacity-25">
                <div className="w-full bg-blue-200 rounded-t-xl">
                    <h1 className="text-center">Sentiment</h1>
                    
                </div>
                {props.selectedTweet ? <TweetSentiment selectedTweet={props.selectedTweet} /> : <Loading text="Select a tweet to see it's sentiment analysis" />}
                
            </div>
        )
    


}