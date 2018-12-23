
var pickCandidate = {


    candList: {
      biden: {
        picture: "assets/images/candidates/biden.jpg",
      },
      sanders: {
        picture: "assets/images/candidates/sanders.jpg",
      },
      clinton: {
        picture: "assets/images/candidates/clinton.jpg",
      },
      bush: {
        picture: "assets/images/candidates/bush.png",
      },
      webb: {
        picture: "assets/images/candidates/webb.jpg",
      },
      kasich: {
        picture: "assets/images/candidates/kasich.jpg",
      },
      gilmore: {
        picture: "assets/images/candidates/gilmore.jpg",
      },
      rubio: {
        picture: "assets/images/candidates/rubio.jpg",
      },
      santorum: {
        picture: "assets/images/candidates/santorum.jpg",
      },
      trump: {
        picture: "assets/images/candidates/trump.jpg",
      },

      
    },

  pickedCand: null,
  candLetters: [],
  correctLetters: [],
  userSelection: [],
  remainGuesses: 0,
  sumPicks: 0,
  madeSelection: null,
  wins: 0,


  setupGame: function() {

    var randWord = Object.keys(this.candList);
    this.pickedCand = randWord[Math.floor(Math.random() * randWord.length)];


    this.candLetters = this.pickedCand.split("");

    this.justUnderScores();

    this.setGuesses();
  },


  refreshPage: function(letter) {

    if (this.remainGuesses === 0) {
      this.restartGame();
    }

    else {

      this.updateGuesses(letter);


      this.rightAnswer(letter);


      this.justUnderScores();

      if (this.refCorrect() === true) {
        this.restartGame();
      }
    }

  },


  updateGuesses: function(letter) {

    if ((this.userSelection.indexOf(letter) === -1) && (this.candLetters.indexOf(letter) === -1)) {

      this.userSelection.push(letter);


      this.remainGuesses--;

      document.querySelector("#guessLeft").innerHTML = this.remainGuesses;
      document.querySelector("#pickLet").innerHTML =
      this.userSelection.join(", ");
    }
  },


  setGuesses: function() {

    this.sumPicks = this.candLetters.length + 5;
    this.remainGuesses = this.sumPicks;

    document.querySelector("#guessLeft").innerHTML = this.remainGuesses;
  },


  rightAnswer: function(letter) {

    for (var i = 0; i < this.candLetters.length; i++) {

      if ((letter === this.candLetters[i]) && (this.correctLetters.indexOf(letter) === -1)) {

        this.correctLetters.push(letter);
      }
    }
  },


  justUnderScores: function() {

    var displayWrd = "";

    for (var i = 0; i < this.candLetters.length; i++) {

      if (this.correctLetters.indexOf(this.candLetters[i]) !== -1) {
        displayWrd += this.candLetters[i];
      }

      else {
        displayWrd += "&nbsp;_&nbsp;";
      }
    }


    document.querySelector("#wordNow").innerHTML = displayWrd;

  },

  restartGame: function() {
    document.querySelector("#pickLet").innerHTML = "";
    this.pickedCand = null;
    this.candLetters = [];
    this.correctLetters = [];
    this.userSelection = [];
    this.remainGuesses = 0;
    this.sumPicks = 0;
    this.madeSelection = null;
    this.setupGame();
    this.justUnderScores();
  },


  refCorrect: function() {
    var win;


    if (this.correctLetters.length === 0) {
      win = false;
    }

    else {
      win = true;
    }


    for (var i = 0; i < this.candLetters.length; i++) {
      if (this.correctLetters.indexOf(this.candLetters[i]) === -1) {
        win = false;
      }
    }


    if (win) {


      this.wins = this.wins + 1;

      document.querySelector("#wins").innerHTML = this.wins;

      return true;
    }

    return false;
  }
};


pickCandidate.setupGame();


document.onkeyup = function(event) {

  pickCandidate.madeSelection = String.fromCharCode(event.which).toLowerCase();

  pickCandidate.refreshPage(pickCandidate.madeSelection);
};


