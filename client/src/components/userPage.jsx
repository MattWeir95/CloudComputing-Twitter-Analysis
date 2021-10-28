
import { useEffect, useState } from "react"
import User from "./user"
export default function UserPage(props){

    const [pastUsers, setPastUsers] = useState([]);

    useEffect(() => {
        setPastUsers(prevPastUsers => [...prevPastUsers, Users]);

    },[])

    return (

            <div className="flex flex-wrap">
                {    Users.map((user, i) => {
                    return (<User user={user} />)
                })}
            </div>
     
    )

}

const Users = [{
    
    name: "John",
    picture: "http://pbs.twimg.com/profile_images/1401270630998175744/JHB02zBf_normal.jpg",
    sentiment: 2
},{
    
    name: "Thomas",
    picture: "http://pbs.twimg.com/profile_images/1401270630998175744/JHB02zBf_normal.jpg",
    sentiment: 2
},{
    
    name: "Ben",
    picture: "http://pbs.twimg.com/profile_images/1401270630998175744/JHB02zBf_normal.jpg",
    sentiment: 2
},{
    
    name: "Hello",
    picture: "http://pbs.twimg.com/profile_images/1401270630998175744/JHB02zBf_normal.jpg",
    sentiment: 2
},{
    
    name: "Hello",
    picture: "http://pbs.twimg.com/profile_images/1401270630998175744/JHB02zBf_normal.jpg",
    sentiment: 2
},{
    
    name: "Hello",
    picture: "http://pbs.twimg.com/profile_images/1401270630998175744/JHB02zBf_normal.jpg",
    sentiment: 2
},{
    
    name: "Hello",
    picture: "http://pbs.twimg.com/profile_images/1401270630998175744/JHB02zBf_normal.jpg",
    sentiment: 2
},
]