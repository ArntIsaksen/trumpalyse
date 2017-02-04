function Sentence(input) {
	this.rs = new RiString(input);

	this.words = [];
	this.sentimentWords = [];

	this.nrOfWords;

	this.startAnalysis = function() {
		this.countWords();
		this.fillWordArray();
		
	}
	
	this.countWords = function() {
		return this.rs.words().length;
	}
	
	/*Copy array http://stackoverflow.com/questions/7486085/copying-array-by-value-in-javascript */
	this.fillWordArray = function() {
		this.words = JSON.parse(JSON.stringify(this.rs.words()));
	}
	
	this.startAnalysis();
}