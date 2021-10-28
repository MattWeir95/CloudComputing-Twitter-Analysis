

export default function SendTwitterQuery(hashtags, socket){
    socket.emit('hashtags', hashtags)
}