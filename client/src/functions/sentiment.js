var natural = require('natural');
var Analyzer = natural.SentimentAnalyzer;
var stemmer = natural.PorterStemmer;
var analyzer = new Analyzer("English", stemmer, "afinn");
var tokenizer = new natural.WordTokenizer();

export default function GetSentimentAnalyisis(string){

    var arrayOfStrings = tokenizer.tokenize(string);

    return analyzer.getSentiment(arrayOfStrings);
};


