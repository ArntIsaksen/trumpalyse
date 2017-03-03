console.log("The bot is starting");
var Twit = require("twit");
var keyconfig = require("keyconfig");
var T = new Twit(keyconfig);
var searchParams = {
    screen_name: 'realDonaldTrump'
    , count: 10
};

function gotData(err, data, response) {
    /*console.log(data[0].text);*/
    for (var i = 0; i < data.length; i++) {
        console.log('Time: ' + data[i].created_at);
        console.log('ID_str: ' + data[i].id_str);
        console.log('Text: ' + data[i].text);
        console.log(data[i].entities);
        console.log(data[i].entities.hashtags);
        console.log(data[i].entities.symbols);
        console.log(data[i].entities.user_mentions);
        console.log(data[i].entities.urls);
        console.log('Source: ' + data[i].source);
        console.log('\n');
    };
    /*console.log(data);*/
};
T.get('statuses/user_timeline', searchParams, gotData);