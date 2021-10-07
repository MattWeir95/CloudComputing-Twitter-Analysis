export default function ResetButton(props) {

  function resetState(){
    props.setHashtags([]);
    document.getElementById("search-bar").value=""

  }

  
  return (
    <div className="">
      <button 
      onClick={()=> {
        resetState();
      }}
      className="border rounded bg-white border-black px-2 hover:bg-gray-200">Reset</button>
    </div>
  );
}
