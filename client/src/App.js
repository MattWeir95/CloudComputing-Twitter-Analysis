import "./App.css";
import HeaderLogo from "./components/headerLogo";
import SearchBar from "./components/searchBar";
import SearchButton from "./components/searchButton";
import { useState } from "react";
import Hashtags from "./components/hashtags";
import TwitterFeed from "./components/twitterFeed";
import Sentiment from "./components/sentiment";
import OthersFeed from "./components/othersFeed";



function App() {

  const [hashtags, setHashtags] = useState([]);

  //Tweet that has been selected from the twitter feed
  const [selectedTweet, setSelectedTweet] = useState(null);

  return (
    <div className="h-screen">
      <HeaderLogo   />

      <div className="border border-gray-200 rounded-xl mt-5 mx-10 shadow-xl pb-5">
        <SearchBar hashtags={hashtags} setHashtags={setHashtags} />

        <Hashtags hashtags={hashtags} setHashtags={setHashtags} />
        <SearchButton hashtags={hashtags} />
      </div>

      <div className="h-1/2 flex flex-row mt-5 mx-10">
        <TwitterFeed   setSelectedTweet={setSelectedTweet}/>

        <Sentiment selectedTweet={selectedTweet} />

        <OthersFeed   setSelectedTweet={setSelectedTweet}/>
      </div>
    </div>
  );
  
  

}

export default App;
