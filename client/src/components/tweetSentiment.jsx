import GetSentimentAnalyisis from '../functions/sentiment'
import { GetTokens } from '../functions/sentiment';
import { TagCloud } from 'react-tagcloud'

export default function TweetSentiment(props) {
    var tweet = props.selectedTweet;

    //Data to be passed to the wordcloud
    var data = [];

    if (tweet) {
        //Covert string into array of tokens for sentiment analysis
        var tokens = GetTokens(tweet.text);

        //Add string and its analysis to the data array for the word cloud
        data = tokens.map((item, i) => ({
            value: item,
            count: GetSentimentAnalyisis(item),
            color: color_to_use(GetSentimentAnalyisis(item)),
            i: i
        }))
    }

    if (tweet) {
        //Get sentiment value of the whole tweet to display the correct emoji
        var sentimentValue = GetSentimentAnalyisis(tweet.text);


        return (
            <div className="">
                <div className="flex flex-row items-center ml-4 mt-4 font-bold justify-between" >
                    <div className="flex flex-row items-center">
                        <img src={tweet.user.profile_image_url} alt="" className="" />
                        <div className="ml-5">@{tweet.user.screen_name} </div>
                    </div>

                    <div className="mr-5">
                        {EmojiToUse(sentimentValue)} 
                    </div>


                </div>
                <div className="ml-4">
                {/* I have an idea here, on click it would display a pop up happy/sad/normal face for that individual words ananlysis */}
                {/* Need to figure out how to change the colours, maybe grey for 0, red for -0 and green for +0, the random colours dont hit the same */}
                <TagCloud
                    minSize={20}
                    maxSize={40}
                    tags={data}
                    onClick={tag => alert(`'${tag.value}: ${tag.count}' was selected!`)}
                />
                </div>
               
            </div>



        )
    } else {
        return null;
    }
}

function color_to_use(sentimentValue){
    if (sentimentValue === 0) {
        return "gray"
    }
    if (sentimentValue > 0) {
        return "green"
    }
    else {
        return "red"
    }
}
function EmojiToUse(sentimentValue) {

    if (sentimentValue === 0) {
        return blankEmoji
    }
    if (sentimentValue > 0) {
        return happyEmoji
    }
    else {
        return sadEmoji
    }
}

const happyEmoji = (<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="green" className="bi bi-emoji-smile" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
</svg>);

const sadEmoji = (<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="red" className="bi bi-emoji-frown" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
</svg>);

const blankEmoji = (<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-emoji-neutral" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    <path d="M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5z" />
</svg>);