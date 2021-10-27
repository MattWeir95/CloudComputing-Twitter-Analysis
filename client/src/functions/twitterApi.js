

export default function SendTwitterQuery(hashtags, socket){
    socket.emit('hashtags', hashtags)
    console.log('emitted tags?');
}