

export default function SendTwitterQuery(hashtags, socket){

    var query = [''];
    if (hashtags) {
        query = hashtags.join(',');
    }
    socket.emit('hashtags', hashtags)

}