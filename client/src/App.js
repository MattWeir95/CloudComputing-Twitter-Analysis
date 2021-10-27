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
socket.on("connection", () => { console.log("connected"); });
socket.open();

function App() {

  const [hashtags, setHashtags] = useState([]);
  const [selectedTweet, setSelectedTweet] = useState(null);

  return (
    <div className="h-screen">
      <HeaderLogo   />

      <div className="border border-gray-200 rounded-xl mt-2 mx-10 shadow-xl pb-4">
        <SearchBar hashtags={hashtags} setHashtags={setHashtags} />

        <Hashtags hashtags={hashtags} setHashtags={setHashtags} />
        <SearchButton hashtags={hashtags} socket={socket}/>
      </div>

      <div className="h-4/6 flex flex-row mt-5 mx-10 pb-2">
        <TwitterFeed setSelectedTweet={setSelectedTweet} socket={socket} />

        <Sentiment selectedTweet={selectedTweet} />

        <OthersFeed setSelectedTweet={setSelectedTweet} socket={socket} />
      </div>
    </div>
  );
  
  

}

export default App;
