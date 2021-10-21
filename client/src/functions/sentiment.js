var natural = require('natural');
var Analyzer = natural.SentimentAnalyzer;
var stemmer = natural.PorterStemmer;
var analyzer = new Analyzer("English", stemmer, "afinn");
var tokenizer = new natural.WordTokenizer();

export default function GetSentimentAnalyisis(string){

    var arrayOfStrings = tokenizer.tokenize(string);

    return analyzer.getSentiment(arrayOfStrings);
};

export function GetTokens(string){
    if(string){
        //Remove any links
        var string = string.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
        //Remove ReTweet text
        string = string.replace(/(RT )?/, '');
        //Remove user tags
        string = string.replace(/(^|[^@\w])@(\w{1,15})\b/g, '');
        
        return tokenizer.tokenize(string);
        

    }
}


