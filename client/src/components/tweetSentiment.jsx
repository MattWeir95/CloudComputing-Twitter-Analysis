import GetSentimentAnalyisis from '../functions/sentiment'



export default function TweetSentiment(props){
    var tweet = props.selectedTweet;

    if(tweet){

        var sentimentValue = GetSentimentAnalyisis(tweet.text);
        return(
            <div className="">
                <div className="flex flex-row items-center ml-4 mt-4 font-bold">
                    <img src={tweet.user.profile_image_url} alt="" className="" />
                    <div className="ml-5">@{tweet.user.screen_name} </div>
                    </div>
                <div className="my-10">
                    Sentiment Analysis: {sentimentValue}
                </div>
                {tweet.text}
                
            </div>
            
        )
    }else{
        return null;
    }
}