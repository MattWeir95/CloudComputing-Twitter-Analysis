import './App.css';
import HeaderLogo from './components/headerLogo';
import SearchBar from './components/searchBar';
import SearchButton from './components/searchButton';
import { useState } from 'react';
import Hashtags from './components/hashtags';

function App() {
  const [hashtags, setHashtags] = useState([]);
  
  return (
    <div>
    <HeaderLogo setHashtags={setHashtags}/>

    <SearchBar hashtags={hashtags} setHashtags={setHashtags}/>

    <Hashtags hashtags={hashtags} setHashtags={setHashtags} />
    <SearchButton  />

    </div>
  );
}

export default App;
