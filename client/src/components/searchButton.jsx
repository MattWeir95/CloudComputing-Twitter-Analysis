import SendTwitterQuery from "../functions/twitterApi";
import socketClient from "socket.io-client";

const API_PORT = 3004
const API_URL = `http://localhost:${API_PORT}`;

const socket = socketClient(API_URL);

export default function SearchButton(props) {


        
  return (
    <div className="flex justify-center items-center mt-5">
      <button 
      onClick={()=> {
        SendTwitterQuery(props.hashtags, socket);
      }}
      className=" transition duration-500 ease-in-out px-2 py-1 rounded bg-blue-400 text-white text-lg hover:bg-blue-600">Search</button>
    </div>
  );
}
