export default function SendTwitterQuery(hashtags){

    const SERVER_PORT = 3004;
    const API_URL =  `http://localhost:${SERVER_PORT}/api/`;

    if(hashtags && hashtags.length > 0){
        
        var query = hashtags.join(', ');

        fetch(API_URL + query)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((e) =>{
            console.log(e);
        } )
    }

}