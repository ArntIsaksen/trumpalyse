function Tweet(tweet) {
	this.tweet = tweet;
	this.tweetUrl;
	
	this.rs;

	this.words = [];
	this.sentences = [];
	this.sentimentWords = [];

	this.nrOfWords;
	this.twitterStormID;
	this.sentimentScore;

	this.startAnalysis = function() {
		console.log('-- startAnalysis');
		
		this.rs = new RiString(tweet);
		this.nrOfWords = this.rs.words().length;
		
		this.createWordObjects();
		this.calculateSentimentScore();
		
		this.createSentences(this.findSentences(this.tweet));

	}
	/*Check to see if the three last characters are periods.*/
	this.isPartOfTwitterStorm = function() {
		var nrOfPeriods = 0;
		for (var i = this.nrOfWords - 1; i >= this.nrOfWords - 3; i--) {
			if (this.rs.words()[i] === '.') {
				nrOfPeriods++;
			};
		};
		return (nrOfPeriods === 3)
	}
	
	/*Calculate the sentiment score of the tweet based on the values of the words found in the AFINN-111 list*/
	this.calculateSentimentScore = function() {
		/*console.log('-- calculateSentimentScore');*/
		var score = 0;
		for (var i = 0; i < this.nrOfWords; i++) {
            /*This code can't find expressions like "not funny".*/
			var word = this.rs.words()[i].toLowerCase();
			if (word === 'not' && i < this.nrOfWords) {
				/*console.log('-- ** Found Not')*/
				/*console.log('-- ** next word is: ' + this.rs.words()[i + 1].toLowerCase());*/
			}
			if (afinn.hasOwnProperty(word)) {
				this.sentimentWords.push(word);
				score += Number(afinn[word]);
			};
		}
		this.sentimentScore = score;
		/*console.log('-- ** sentimentScore: ' + this.sentimentScore);*/
	}

	this.createWordObjects = function() {
		/*console.log('-- createWordObjects');*/
		for (var i = 0; i < this.nrOfWords; i++) {
			this.words[i] = new Word(this.rs.words()[i], this.rs.pos()[i]);
		}
	}
	
	/*Created by the one and only Martin Sjåstad*/
	this.findSentences = function(s) {
		/*console.log('-- findSentences');*/
		var rEx = /[^.!?]*[.!?]+/g;
		var arr = s.match(rEx);
		var trimmed = arr.map(function(item) {
			return item.trim();
		});
		return trimmed;
	}
	
	this.createSentences = function(arr) {
		console.log('-- createSentences');
		for (var s in arr) {
			/*console.log('-- ** s: ' + s);*/
			/*console.log('-- ** sentence: ' + arr.hasOwnProperty(s));*/
			this.sentences.push(new Sentence(arr[s]));
			console.log('-- ** >> sentence added');
		}
		/*console.log(arr[arr.length]);*/
	}
	
	/*Start the tweet analysis*/
	this.startAnalysis();
}