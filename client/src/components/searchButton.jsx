import FormatQuery from "../functions/formatQuery";

export default function SearchButton(props) {


        
  var query = FormatQuery(props.hashtags);

  return (
    <div className="flex justify-center items-center mt-5">
      <button 
      onClick={()=> {
        console.log("Send Query to server")
      }}
      className=" transition duration-500 ease-in-out px-2 py-1 rounded bg-blue-400 text-white text-lg hover:bg-blue-600">Search</button>
    </div>
  );
}
