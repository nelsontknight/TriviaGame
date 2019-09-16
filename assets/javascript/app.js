var panel = $('#quiz-area');
var countStartNumber = 30;


$(document).on('click', '#start-over', function(e) {
  game.reset();
});

$(document).on('click', '.answer-button', function(e) {
  game.clicked(e);
});

$(document).on('click', '#start', function(e) {
  $('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

// List of Questions

var questions = [{
  question: "Which avenger is known as Tony Stark?",
  answers: ["Ant-Man", "Iron Man", "Thor", "Black Panther"],
  correctAnswer: "Iron Man",
  image:"assets/images/iron-man.gif"
}, {
  question: "Who is Peter Parker's boss at the Daily Bugle?",
  answers: ["Otto Octavius", "Norman Osborn", "Steve Rodgers", "J. Jonah Jameson"],
  correctAnswer: "J. Jonah Jameson",
  image:"assets/images/j-jonah-jameson.gif"
}, {
  question: "What is the name of Thor's hammer?",
  answers: ["Mjolnir", "Hammer Fist", "Hammer", "Storm Breaker"],
  correctAnswer: "Mjolnir",
  image:"assets/images/mjolnir.gif"
}, {
  question: "Before turning to a life of crime, Mysterio was:",
  answers: ["A Stuntman", "A Magician", "A Special Effects Artist", "A Lawyer"],
  correctAnswer: "A Special Effects Artist",
  image:"assets/images/mysterio.gif"
}, {
  question: "Captain America was frozen during which war?",
  answers: ["WW1", "WW2", "Cold War", "The Vietnam War"],
  correctAnswer: "WW2",
  image:"assets/images/cap.gif"
}, {
  question: "What vehicle is the Avenger's primary mode of transportation?",
  answers: ["The Tumbler", "Megazords", "The Quinjet", "The Blackhawk"],
  correctAnswer: "The Quinjet",
  image:"assets/images/quinjet.gif"
}, {
  question: "Doctor Strange is the protector of which infinity stone?",
  answers: ["Soul Stone", "Space Stone", "Reality Stone", "Time Stone"],
  correctAnswer: "Time Stone",
  image:"assets/images/dr-strange.gif"
}, {
  question: "Which group are The Guardians of the Galaxy?",
  answers: ["The Thing, Human Torch, Invisible Women, Mr. Fantastic", "Professer X, Wolverine, Storm, Cyclops", "Drax, Gamora, Rocket, Groot, Star-Lord", "Iron Fist, Dare Devil, Electra, Luke Cage, Jessica Jones"],
  correctAnswer: "Drax, Gamora, Rocket, Groot, Star-Lord",
  image:"assets/images/baby-groot.gif"
}];




var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].correctAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].correctAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};