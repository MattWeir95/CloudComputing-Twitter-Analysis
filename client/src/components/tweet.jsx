export default function Tweet(props){
    const tweet = props.tweet;
    return (
        <button 
        onClick={()=> {
          props.setSelectedTweet(tweet);
        }}
        key={props.key} className="mt-2 border border-gray-200 border  bg-white rounded-xl hover:bg-blue-200 hover:cursor-pointer text-left w-11/12">
          <div className="mx-2 my-1">
            <div className="font-semibold">
              <div className="flex flex-row items-center">
                <img src={tweet.user.profile_image_url} alt="" className="" />
  
                <div className="ml-5">@{tweet.user.screen_name} </div>
  
              </div>
            </div>
            <div className="">
              <p className="font-semibold mt-1"></p> {tweet.text}
            </div>
          </div>
  
        </button>
    )
}