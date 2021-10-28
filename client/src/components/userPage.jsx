
import { useEffect, useState } from "react"
import User from "./user"

const SERVER_PORT = 3004;
const SERVER_URL = `http://localhost:${SERVER_PORT}/api/users/`
export default function UserPage(props) {

    const [pastUsers, setPastUsers] = useState([]);

    useEffect(() => {

        //Retrieve past users from S3 via client-server
        fetch(SERVER_URL)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((data) => {
                console.log()
                setPastUsers(data.users);
            })
            .catch((e) => {
                console.log("Error")
                console.log(e);
            })

    }, [])

    return (


        <div className="h-screen w-full flex justify-center">
            <div id="live-feed" className="w-10/12 border border-gray-200 mt-5 h-5/6 overflow-y-scroll overflow-x-hidden ">
                <div className="flex flex-col justify-center items-center ">
                    {pastUsers.map((user, i) => {
                        return (<User key={i} user={user} />)
                    })}
                </div>

            </div>
        </div>

    )

}
