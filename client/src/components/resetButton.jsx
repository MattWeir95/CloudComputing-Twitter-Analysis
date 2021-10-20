export default function ResetButton(props) {

  function resetState(){
    props.setHashtags([]);
    document.getElementById("search-bar").value=""

  }

  if(props.view === "homepage"){
    return (
      <div className="">
        <button 
        onClick={()=> {
          resetState();
        }}
        className="border rounded py-1 border-black px-2 hover:bg-white"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-counterclockwise text-red-600" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
        <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
      </svg></button>
      </div>
    );
  }else{
    return null;
  }
  
  
}
