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
		this.rs.analyze();
		
		this.createWordObjects();
		this.calculateNrOfWords();
		this.calculateSentimentScore();
		this.createSentences(this.findSentences(this.tweet));

	}
	/*Check to see if the three last characters are periods.*/
	this.isPartOfTwitterStorm = function() {
		var nrOfPeriods = 0;
		for (var i = this.rs.words().length - 1; i >= this.rs.words().length - 3; i--) {
			if (this.rs.words()[i] === '.') {
				nrOfPeriods++;
			};
		};
		return (nrOfPeriods === 3)
	}
	
	this.calculateNrOfWords = function() {
		/*console.log('-- calculateNrOfWords')*/
		var regEX = /\'?\w+([-']\w+)*\'?/
		var counter = 0;
		for	(var w in this.words) {
			if (regEX.test(this.words[w].wordString) && (typeof this.words[w].wordString !== 'undefined')) {
				counter++;
			}
		}
		this.nrOfWords = counter;
	}
	
	/*Calculate the sentiment score of the tweet based on the values of the words found in the AFINN-111 list*/
	this.calculateSentimentScore = function() {
		/*console.log('-- calculateSentimentScore');*/
		var score = 0;
		for (var i = 0; i < this.words.length; i++) {
			var word = this.words[i].wordString.toLowerCase();
			if (word === 'not' && i < this.words.length) {
				var nextWord = this.words[i + 1].wordString.toLowerCase();
				var compundExpression = word + ' ' + nextWord;
				/*This code finds expressions like "not funny" and flips the value of the next word if it's not in AFINN-111.*/
				if (afinn.hasOwnProperty(compundExpression)) {
					this.sentimentWords.push(compundExpression);
					score += Number(afinn[compundExpression]);
					i++;
				} else if (afinn.hasOwnProperty(nextWord)) {
					this.sentimentWords.push(compundExpression);
					score += (-1 * Number(afinn[nextWord]));
					i++;
				}
			} else if (afinn.hasOwnProperty(word)) {
				this.sentimentWords.push(word);
				score += Number(afinn[word]);
			}
		}
		this.sentimentScore = score;
	}

	this.createWordObjects = function() {
		/*console.log('-- createWordObjects');*/
		for (var i = 0; i < this.rs.words().length; i++) {
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
		/*console.log('-- createSentences');*/
		var regEX = new RegExp('[^.|,|?|!]');
		for (var s in arr) {
			if (arr.hasOwnProperty(s) && regEX.test(arr[s])) {
				this.sentences.push(new Sentence(arr[s]));
			}
		}
	}
	/*Start the tweet analysis*/
	this.startAnalysis();
}