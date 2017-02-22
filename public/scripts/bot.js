console.log("The bot is starting");

var Twit = require("twit");
var keyconfig = require("keyconfig");

var T = new Twit(keyconfig);

var searchParams = { 
	screen_name: 'realDonaldTrump', 
	count: 5 
}

function gotData(err, data, response) {
	/*console.log(data[0].text);*/
	for (var i = 0; i < data.length; i++) {
		console.log(data[i].text + '\n');
	}
}

T.get('statuses/user_timeline', searchParams, gotData);