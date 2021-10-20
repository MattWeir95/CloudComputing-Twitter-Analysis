const tweets = 20;

export default function Tweets(){
    
    var tweetArray = [];
    
        for(var i=0; i<tweets; i++) {
            tweetArray.push(
                <button key={i} className="mt-2 mx-1 border border-gray-200 border  bg-white rounded-xl hover:bg-blue-200 hover:cursor-pointer text-left">
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

            return tweetArray;
    
}


const tweet = {
    
    created_at: 'Wed Oct 13 07:11:28 +0000 2021',
    id: 1448184596529549300,
    id_str: '1448184596529549314',
    text: 'Any time I need to do something, i.e  I really want to join an array on a coma? Google is going to be my answer.\n' +
      'So… https://t.co/rzQBcEBnA7',
    source: '<a href="http://twitter.com/download/android" rel="nofollow">Twitter for Android</a>',
    truncated: true,
    in_reply_to_status_id: 1448184593820131300,
    in_reply_to_status_id_str: '1448184593820131332',
    in_reply_to_user_id: 3338757543,
    in_reply_to_user_id_str: '3338757543',
    in_reply_to_screen_name: 'kuchotony',
    user: {
      id: 3338757543,
      id_str: '3338757543',
      name: 'Dave Clinton',
      screen_name: 'kuchotony',
      location: 'Nairobi Kenya ',
      url: 'http://clindavid.co.ke',
      description: 'Web developer and designer with skills in creating logical innovative solutions to complex problems. HTML|CSS|JS|BOOTSTRAP \n' +
        'Visit http://clindavid.co.ke',
      translator_type: 'none',
      protected: false,
      verified: false,
      followers_count: 626,
      friends_count: 798,
      listed_count: 3,
      favourites_count: 10554,
      statuses_count: 2197,
      created_at: 'Sun Jun 21 11:32:42 +0000 2015',
      utc_offset: null,
      time_zone: null,
      geo_enabled: true,
      lang: null,
      contributors_enabled: false,
      is_translator: false,
      profile_background_color: '000000',
      profile_background_image_url: 'http://abs.twimg.com/images/themes/theme1/bg.png',
      profile_background_image_url_https: 'https://abs.twimg.com/images/themes/theme1/bg.png',
      profile_background_tile: false,
      profile_link_color: 'DD2E44',
      profile_sidebar_border_color: '000000',
      profile_sidebar_fill_color: '000000',
      profile_text_color: '000000',
      profile_use_background_image: false,
      profile_image_url: 'http://pbs.twimg.com/profile_images/1433877712444272644/TKGKVU9E_normal.jpg',
      profile_image_url_https: 'https://pbs.twimg.com/profile_images/1433877712444272644/TKGKVU9E_normal.jpg',
      profile_banner_url: 'https://pbs.twimg.com/profile_banners/3338757543/1631252625',
      default_profile: false,
      default_profile_image: false,
      following: null,
      follow_request_sent: null,
      notifications: null,
      withheld_in_countries: []
    },
    geo: null,
    coordinates: null,
    place: null,
    contributors: null,
    is_quote_status: false,
    extended_tweet: {
      full_text: 'Any time I need to do something, i.e  I really want to join an array on a coma? Google is going to be my answer.\n' +
        "So hey devs, we don't need to memorize code.\n" +
        'Everything is documented incredibly well.',
      display_text_range: [ 0, 199 ],
      entities: { hashtags: [], urls: [], user_mentions: [], symbols: [] }
    },
    quote_count: 0,
    reply_count: 0,
    retweet_count: 0,
    favorite_count: 0,
    entities: { hashtags: [], urls: [ [Object] ], user_mentions: [], symbols: [] },
    favorited: false,
    retweeted: false,
    filter_level: 'low',
    lang: 'en',
    timestamp_ms: '1634109088438'
  }
