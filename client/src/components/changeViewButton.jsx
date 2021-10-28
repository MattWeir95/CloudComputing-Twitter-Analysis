export default function ChangeViewButton(props){


    return (
        <div className="">
        <button 
        onClick={()=> {
        if(props.view === "home"){
            props.setView("pastUsers")
        }else{
            props.setView("home");
        }
        }}
        className="border rounded pb-1 mr-2 border-black px-2 hover:bg-white">{props.view ==="home" ? "Past Users" : "Home"}
      </button>
      </div>
    )
}