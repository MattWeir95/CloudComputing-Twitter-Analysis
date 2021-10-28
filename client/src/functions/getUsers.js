const SERVER_PORT = 3004;
const SERVER_URL = `http://localhost:${SERVER_PORT}/api/users/`

export default function GetUsers(){
    fetch(SERVER_URL)
    .then((res) =>{
        if(res.ok){
            return res.json();
        }
    })
    .then((data)=> {
        console.log(data);
    })
    .catch((e)=>{
        console.log("Error")
        console.log(e);
    })
}