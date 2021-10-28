export default function Loading(props){

    if(props.text){
    return (
        <div className="flex justify-center items-center mt-20">
                    <div className="bg-white rounded-xl p-2 shadow ">{props.text}</div>
                </div>
    )
    }
    else{
        return(
        <div className="flex justify-center items-center mt-20">
                    <div className="bg-white rounded-xl p-2 shadow animate-bounce">Waiting...</div>
                </div>
        )
    }
}