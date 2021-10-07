import { useState } from "react";

export default function SearchBar(props) {
    const [input, setInput] = useState();

    function handleClick(input){
      if(!props.hashtags.includes(input) && input !== null){
        props.setHashtags(props.hashtags.concat(input));
        setInput(null);
        document.getElementById("search-bar").value=""
      }
    }
    
  return (
    <div className="mt-4">
      <h1 className="mr-2 text-center text-xl font-semibold">Search Hashtags</h1>
      <div className="flex justify-center">
        <input
          id="search-bar"
          type="text"
          className="border-black border rounded mt-4 w-2/5"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if(e.key === "Enter") {
              handleClick(input);
            }
          }}
        />
        
        <button onClick={()=> {
            handleClick(input);
        }} 
        
        className="transform mt-4  ml-4 hover:cursor-pointer hover:scale-125">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg text-green-600"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>
        </button>
      </div>

    </div>
  );
}
