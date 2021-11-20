import "./App.css";
import HeaderLogo from "./components/headerLogo";
import SearchBar from "./components/searchBar";
import SearchButton from "./components/searchButton";
import {  useState } from "react";
import Hashtags from "./components/hashtags";
import TwitterFeed from "./components/twitterFeed";
import Sentiment from "./components/sentiment";
import OthersFeed from "./components/othersFeed";
import socketClient from "socket.io-client";
import UserPage from "./components/userPage";

//Server constants
const API_PORT = 3004

//CLIENT SERVER PORT
var REACT_APP_IP = process.env.REACT_APP_IP;
const API_URL = `http://${REACT_APP_IP}:${API_PORT}`;

//Create socket with server and open
const socket = socketClient(API_URL);
socket.open();

function App() {

  //Hashtags to be used as queries
  const [hashtags, setHashtags] = useState([]);

  //Selected tweet used by sentiment component
  const [selectedTweet, setSelectedTweet] = useState(null);

  //Changes the view depending on the state ("home" || "pastUsers")
  const [view, setView] = useState("home");

  if(view === "home"){
    return (
      <div className="h-screen">
        <HeaderLogo   view={view} setView={setView}/>
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
  else if(view === "pastUsers"){

    return (
      <div className="h-screen">
        <HeaderLogo view={view} setView={setView}/>
        <div className="flex justify-center items-center">
          <UserPage />
        </div>
      </div>
    )
  }
  
  

}

export default App;
