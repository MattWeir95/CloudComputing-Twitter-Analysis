import "./App.css";
import HeaderLogo from "./components/headerLogo";
import SearchBar from "./components/searchBar";
import SearchButton from "./components/searchButton";
import { useState } from "react";
import Hashtags from "./components/hashtags";
import TwitterFeed from "./components/twitterFeed";
import Sentiment from "./components/sentiment";
function App() {
  const [hashtags, setHashtags] = useState([]);
  const [view, setView] = useState("homepage");

  const [selectedTweet, setSelectedTweet] = useState(null);

  if(view === "homepage"){
    console.log(selectedTweet)
    return (
      <div className="h-screen">
        <HeaderLogo setSelectedTweet={setSelectedTweet} setHashtags={setHashtags} setView={setView} view={view}/>
  
        <div className="border border-gray-200 rounded-xl mt-5 mx-10 shadow-xl pb-5">
          <SearchBar hashtags={hashtags} setHashtags={setHashtags} />
  
          <Hashtags hashtags={hashtags} setHashtags={setHashtags} />
          <SearchButton hashtags={hashtags} />
        </div>
  
        <div className="h-1/2 flex flex-row mt-5 mx-10"> 
        <TwitterFeed setSelectedTweet={setSelectedTweet}/>
        
        <Sentiment selectedTweet={selectedTweet}/>
        
        </div>
      </div>
    );
  }

  if(view === "history"){
    return(
<div className="h-screen">
        <HeaderLogo setHashtags={setHashtags} setView={setView} view={view}/>
  
        
      </div>
    );
  }
  
}

export default App;
