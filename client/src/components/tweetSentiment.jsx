import GetSentimentAnalyisis from '../functions/sentiment'



export default function TweetSentiment(props){
    if(props.selectedTweet){

        var sentimentValue = GetSentimentAnalyisis(props.selectedTweet.text);
        return(
            <div className="">
                <div className="my-10">
                    Sentiment Analysis: {sentimentValue}
                </div>
                {props.selectedTweet.text}
                
            </div>
            
        )
    }else{
        return null;
    }
}