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

function preload() {
	afinn = loadJSON('afinn-111.json');
	testTweetList = loadJSON('ex-tweets.json');
}

function setup() {
	noCanvas();
	for (var t in testTweetList) {
		var newTweet = new Tweet(testTweetList[t]);
		tweets.push(newTweet);
		/*console.log('--------- Next Tweet ---------')*/
	}
	addTweetsToSite();
}

function addTweetsToSite() {
	for (var i = 0; i < tweets.length; i++) {
		/* Create elements */
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
		wordCount.child(createElement('h4', tweets[1].nrOfWords));

		sents.child(createElement('h5', 'Sentences'));
		sents.child(createElement('h4', tweets[i].sentences.length));

		sentWords.child(createElement('h5', 'Sentiment words'));
		for (var sWord in tweets[1].sentimentWords) {
			if (tweets[1].sentimentWords.hasOwnProperty(sWord))
				sentWords.child(createElement('h4', tweets[i].sentimentWords[sWord]));
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