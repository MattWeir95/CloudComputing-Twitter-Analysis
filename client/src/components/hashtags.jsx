export default function Hashtags(props){


    function handleDelete(i){
        const tempArray = props.hashtags;
        tempArray.splice(i, 1);
        props.setHashtags([...tempArray]);

    }

    const hashtags = props.hashtags.map((hashtag, i) => (
        <button key={i} className="border border-black px-2 py-1 mx-2 rounded shadow mt-2">#{hashtag} 
        <button 
        onClick={() => {
            handleDelete(i);
        }}

        className="text-xs text-right ml-2 text-red-600">X</button> 
        </button>
    ))


    return (
       <div className="flex flex-wrap justify-center items-center mt-4">
           {hashtags}
       </div>
    )
}