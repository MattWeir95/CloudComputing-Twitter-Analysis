export default function FormatQuery(hashtags){
  if(hashtags){
    var query = " ";
    for(var i = 0; i< hashtags.length; i++) {
      query.concat(hashtags[i] + " ,");
    }

    return query;
  }
    
  }