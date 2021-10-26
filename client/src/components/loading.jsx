export default function Loading(props){

    if(props.text){
    return (
        <div className="flex justify-center items-center mt-20">
                    <button className="bg-white rounded-xl p-2 shadow ">{props.text}</button>
                </div>
    )
    }
    else{
        return(
        <div className="flex justify-center items-center mt-20">
                    <button className="bg-white rounded-xl p-2 shadow animate-bounce">Waiting...</button>
                </div>
        )
    }
}