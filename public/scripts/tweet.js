function Tweet(tweet) {
    this.text = tweet;
    this.idStr = '';
    this.source = '';
    this.tweetUrl = '';
    this.createdAt = '';
    this.nrOfWords = '';
    this.retweetCount = '';
    this.favoriteCount = '';
    this.twitterStormID = '';
    this.sentimentScore = '';
    this.rs = '';
    this.urls = [];
    this.words = [];
    this.hashTags = [];
    this.sentences = [];
    this.userMentions = [];
    this.sentimentWords = [];
    this.startAnalysis = function () {
        this.rs = new RiString(this.text);
        this.rs.analyze();
        this.createWordObjects();
        this.calculateNrOfWords();
        this.calculateSentimentScore();
        this.createSentences(this.findSentences(this.text));
        this.colourSentimentWords();
    };
    this.isPartOfTwitterStorm = function () {
        var nrOfPeriods = 0;
        for (var i = this.rs.words().length - 1; i >= this.rs.words().length - 3; i--) {
            if (this.rs.words()[i] === '.') {
                nrOfPeriods++;
            };
        };
        return (nrOfPeriods === 3)
    };
    this.calculateNrOfWords = function () {
        var regEX = /\'?\w+([-']\w+)*\'?/
        var counter = 0;
        for (var w in this.words) {
            if (regEX.test(this.words[w].wordString) && (typeof this.words[w].wordString !== 'undefined')) {
                counter++;
            }
        }
        this.nrOfWords = counter;
    };
    /*Calculate the sentiment score of the tweet based on the values of the words found in the AFINN-111 list*/
    this.calculateSentimentScore = function () {
        var score = 0;
        for (var i = 0; i < this.words.length; i++) {
            var originalCaseWord = this.words[i].wordString;
            var word = this.words[i].wordString.toLowerCase();
            if (word === 'not' && i < this.words.length) {
                var nextWord = this.words[i + 1].wordString.toLowerCase();
                var compundExpression = word + ' ' + nextWord;
                /* If a compound expression exists in afinn-111 */
                if (afinn.hasOwnProperty(compundExpression)) {
                    this.sentimentWords.push(originalCaseWord + ' ' + nextWord);
                    score += Number(afinn[compundExpression]);
                    i++;
                    /* If a sentiment word is preceded by a 'not' its value gets flipped. */
                }
                else if (afinn.hasOwnProperty(nextWord)) {
                    this.sentimentWords.push(originalCaseWord + ' ' + nextWord);
                    score += (-1 * Number(afinn[nextWord]));
                    i++;
                }
            }
            else if (afinn.hasOwnProperty(word)) {
                this.sentimentWords.push(originalCaseWord);
                score += Number(afinn[word]);
            }
        }
        this.sentimentScore = score;
    };
    this.colourSentimentWords = function () {
        var searchIndex = 0;
        var spanAddedTweet = '';
        var searchString = this.text;
        for (var j = 0; j < this.sentimentWords.length; j++) {
            var w = this.sentimentWords[j].toLowerCase();
            var wOriginalCase = this.sentimentWords[j];
            var regEX = new RegExp("(\\b)" + w + "(\\b)", 'i');
            var foundWordIndex = searchString.search(regEX);
            var leftPart = searchString.slice(0, foundWordIndex);
            spanAddedTweet += (leftPart + '<span id=sentimentWord>' + wOriginalCase + '</span>');
            searchIndex = (foundWordIndex + w.length);
            searchString = searchString.slice(searchIndex)
            if (this.sentimentWords.length - 1 === j) {
                spanAddedTweet += searchString;
            }
        };
        this.text = spanAddedTweet;
    };
    this.createWordObjects = function () {
        for (var i = 0; i < this.rs.words().length; i++) {
            this.words[i] = new Word(this.rs.words()[i], this.rs.pos()[i]);
        }
    };
    /*Created by the one and only Martin Sjåstad*/
    this.findSentences = function (s) {
        var regEX = /[^.!?]*[.!?]+/g;
        var arr = s.match(regEX);
        var trimmed = arr.map(function (item) {
            return item.trim();
        });
        return trimmed;
    };
    this.createSentences = function (arr) {
            var regEX = new RegExp('[^.|,|?|!]');
            for (var s in arr) {
                if (arr.hasOwnProperty(s) && regEX.test(arr[s])) {
                    this.sentences.push(new Sentence(arr[s]));
                }
            }
    };
/*Start the tweet analysis*/
    this.startAnalysis();
}