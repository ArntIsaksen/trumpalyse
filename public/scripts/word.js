function Word(wordString, pos) {
	this.wordString = wordString;
	this.pos = pos;
	
	this.lowerCaseWord = wordString.toLowerCase();
	this.partOfSpeech;
	this.sentimentValue;
	
	this.setSentimentValue = function(sentimentValue) {
		this.setSentimentValue = sentimentValue;
	}
}