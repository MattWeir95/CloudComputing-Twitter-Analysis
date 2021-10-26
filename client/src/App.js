import "./App.css";
import HeaderLogo from "./components/headerLogo";
import SearchBar from "./components/searchBar";
import SearchButton from "./components/searchButton";
import { useEffect, useState } from "react";
import Hashtags from "./components/hashtags";
import TwitterFeed from "./components/twitterFeed";
import Sentiment from "./components/sentiment";
import OthersFeed from "./components/othersFeed";
import socketClient from "socket.io-client";

const API_PORT = 3004
const API_URL = `http://localhost:${API_PORT}`;

const socket = socketClient(API_URL);

function App() {

  const [hashtags, setHashtags] = useState([]);

  //Tweet that has been selected from the twitter feed
  const [selectedTweet, setSelectedTweet] = useState(null);

  const [tweets, setTweets] = useState([])
  const [history, setHistory] = useState([]);

  useEffect(() => {
  
    socket.on('connection', () => {
      console.log('connected with backend');
    })
    
  },[])

  

  
  return (
    <div className="h-screen">
      <HeaderLogo setTweets={setTweets} setHistory={setHistory} setSelectedTweet={setSelectedTweet} setHashtags={setHashtags}  />

      <div className="border border-gray-200 rounded-xl mt-5 mx-10 shadow-xl pb-5">
        <SearchBar hashtags={hashtags} setHashtags={setHashtags} />

        <Hashtags hashtags={hashtags} setHashtags={setHashtags} />
        <SearchButton hashtags={hashtags} socket={socket}/>
      </div>

      <div className="h-1/2 flex flex-row mt-5 mx-10">
        <TwitterFeed socket={socket} setTweets={setTweets} tweets={tweets} setSelectedTweet={setSelectedTweet} tweets={tweets} />

        <Sentiment selectedTweet={selectedTweet} />

        <OthersFeed socket={socket}  setHistory={setHistory} history={history} setSelectedTweet={setSelectedTweet} tweets={history}/>
      </div>
    </div>
  );
  
  

}

export default App;
