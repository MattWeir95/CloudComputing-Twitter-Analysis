import "./App.css";
import HeaderLogo from "./components/headerLogo";
import SearchBar from "./components/searchBar";
import SearchButton from "./components/searchButton";
import { useState } from "react";
import Hashtags from "./components/hashtags";

function App() {
  const [hashtags, setHashtags] = useState([]);

  return (
    <div>
      <HeaderLogo setHashtags={setHashtags} />

      <div className="border border-gray-200 rounded-xl mt-5 mx-10 shadow-xl pb-5">
        <SearchBar hashtags={hashtags} setHashtags={setHashtags} />

        <Hashtags hashtags={hashtags} setHashtags={setHashtags} />
        <SearchButton />
      </div>
    </div>
  );
}

export default App;
