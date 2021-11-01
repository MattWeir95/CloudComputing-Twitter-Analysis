var natural = require('natural');
var tokenizer = new natural.WordTokenizer();

export function GetTokens(string){
    if(string){
        //Remove any links
        string = string.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
        //Remove ReTweet text
        string = string.replace(/(RT )?/, '');
        //Remove user tags
        string = string.replace(/(^|[^@\w])@(\w{1,15})\b/g, '');
        
        return tokenizer.tokenize(string);
        

    }
}

export default function GetSentinmentAnalyisis(query){
    const SERVER_PORT = 3004
    var REACT_APP_IP = process.env.REACT_APP_IP;
    var SERVER_URL = `http://${REACT_APP_IP}:${SERVER_PORT}/sentiment`;
    
   return(fetch(SERVER_URL, {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sentimentQuery: query }),
})
.then((res) => {
    return res.json()
})
.then((data) => {
    return data.sentiment;
})
.catch((e) => {
    console.log(e, e.stack);
}))
} 
