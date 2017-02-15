/*
**** AFINN-111 - AFINN is an affective lexicon by Finn Årup Nielsen
**** http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010
-----------------------------------------------------------------------
**** RiTa - a software toolkit for computational literature
**** http://rednoise.org/rita/index.php
*/

var tweets = [];
var afinn;
var testTweetList;
var firebase;

function preload() {
	afinn = loadJSON('data/afinn-111.json');
	testTweetList = loadJSON('data/ex-tweets.json');
}

function setup() {
	noCanvas();
    firebase = new firebaseConnection();
	/*for (var t in testTweetList) {
		var newTweet = new Tweet(testTweetList[t]);
		tweets.push(newTweet);
		console.log('--------- Next Tweet ---------')
	}*/
	for (var t in testTweetList) {
		var newTweet = new Tweet(testTweetList[t]);
		tweets.push(newTweet);
		/*console.log('--------- Next Tweet ---------')*/
	}
	addTweetsToSite();
	addStatisticsToSite();
}

function findWordFrequency() {
	var wordFrequency = [];
	for (var i = 0; i < tweets.length; i++) {
		for (var j = 0; j < tweets[i].words.length; j++) {
			var w = tweets[i].words[j].wordString.toLowerCase();
			if (wordFrequency.hasOwnProperty(w)) {
				wordFrequency[w]++;
			} else {
				wordFrequency[w] = 1;
			}
		}
	}
	return wordFrequency;
}

function avgNrOfSentences() {
	var nrOfSentences = 0;
	for (var i = 0; i < tweets.length; i++) {
		nrOfSentences += tweets[i].sentences.length;
	}
	return nrOfSentences/tweets.length;
}

function avgNrOfWords() {
	var nrWords = 0;
	for (var i = 0; i < tweets.length; i++) {
		nrWords += tweets[i].nrOfWords;
	}
	return nrWords/tweets.length;
}

function avgNrOfWordsPerSentence() {
	var nrWords = 0;
	var nrOfSentences = 0;
	for (var i = 0; i < tweets.length; i++) {
		nrWords += tweets[i].nrOfWords;
		nrOfSentences += tweets[i].sentences.length;
	}
	return nrWords/nrOfSentences;
}

function addStatisticsToSite() {
	var not = createElement('h4', tweets.length);
	var anow = createElement('h4', avgNrOfWords().toFixed(2));
	var anos = createElement('h4', avgNrOfSentences().toFixed(2));
	var anowps = createElement('h4', avgNrOfWordsPerSentence().toFixed(2));
	
	not.parent('nrOfTweets');
	anow.parent('avgNrOfWords');
	anos.parent('avgNrOfSentences');
	anowps.parent('avgNrOfWordsPerSentence');
}

function addTweetsToSite() {
	for (var i = 0; i < tweets.length; i++) {
		/* Create elements, add id and class */
		var tweetText = createElement('p', tweets[i].tweet);
		var blockquote = createElement('blockquote', '').class('columns');
		var cite = createElement('cite', '');
		var link = createElement('a', 'Donald Trump');
		var quoteFooter = createElement ('footer', '');

		var divContainer = createDiv('').class('medium-12 columns');
		var sentScore = createDiv('').id('sentiment-score').class('small-6 medium-3 columns');
		var sentWords = createDiv('').id('sentiment-words').class('small-6 medium-3 columns');
		var wordCount = createDiv('').id('word-count').class('small-6 medium-3 columns');
		var sents = createDiv('').id('sentences').class('small-6 medium-3 columns');
		var article = createElement('article').class('columns');

		/* Nest elements */
		wordCount.child(createElement('h5', 'Word count'));
		wordCount.child(createElement('h4', tweets[i].nrOfWords));

		sents.child(createElement('h5', 'Sentences'));
		sents.child(createElement('h4', tweets[i].sentences.length));

		sentWords.child(createElement('h5', 'Sentiment words'));
		for (var sWord in tweets[i].sentimentWords) {
			if (tweets[i].sentimentWords.hasOwnProperty(sWord))
				sentWords.child(createElement('h4', tweets[i].sentimentWords[sWord].toLowerCase()));
		}

		sentScore.child(createElement('h5', 'Sentiment score'));
		sentScore.child(createElement('h4', tweets[i].sentimentScore));

		divContainer.child(sents);
		divContainer.child(wordCount);
		divContainer.child(sentWords);
		divContainer.child(sentScore);

		cite.child(link);
		quoteFooter.child(cite);
		blockquote.child(tweetText);
		blockquote.child(quoteFooter);

		article.child(blockquote);
		article.child(divContainer);
		
		/* Add tweet to index.html */
		article.parent('tweet-row');
	}
}