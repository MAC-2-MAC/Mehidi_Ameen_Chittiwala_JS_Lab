function Quiz(question) {
  this.score = 0;
  this.question = question;
  this.questionIndex = 0;
}
Quiz.prototype.getQuestionByIndex = function () {
  return this.question[this.questionIndex];
};

Quiz.prototype.checkOptionWithAnswer = function (answer) {
  if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
};

Quiz.prototype.isEnded = function () {
  return this.questionIndex === this.question.length;
};

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}
Question.prototype.isCorrectAnswer = function (choice) {
  return this.answer === choice;
};
let question = [
  new Question(
    "To style all the p tags and div tags with the same properties, what will be the appropriate way of selector declaration?",
    ["p div{}", "div p{}", "div, p{}", "div. p{}"],
    "div, p{}"
  ),
  new Question(
    "Where do we specify the link tag in html?",
    ["Style", "Head", "Body", "None of the above"],
    "Head"
  ),
  new Question(
    "Javascript is an -----Language?",
    ["Object Oriented", "Procedural", "Object-Based", "None"],
    "Object Oriented"
  ),
  new Question(
    "We can access the names of css classes attached to a html element in js using-",
    ["classList", "listClass", "Classes", "None of the above"],
    "classList"
  ),
  new Question(
    "Which below options can be used to query a document for an element or elements?",
    [
      "With a specified id attribute",
      "Matching the specified CSS selector",
      "With the specified tag name",
      "All of the mentioned",
    ],
    "All of the mentioned"
  ),
];

function loadQuestions() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionByIndex().text;

    var choices = quiz.getQuestionByIndex().choices;
    for (let i = 0; i < choices.length; i++) {
      var choice = document.getElementById("choice" + i);
      choice.innerHTML = choices[i];
      handleOptionButton("btn" + i, choices[i]);
    }
    showProgress();
  }
}

function showScores() {
  var gameOverHtml = "<h1>Result</h1>";
  gameOverHtml +=
    "<h2 id='score'> Your Score is:  " +
    quiz.score +
    " . And Percentage is: " +
    (quiz.score / question.length) * 100 +
    "%" +
    "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHtml;
}

function showProgress() {
  let currentQuestionNumber = quiz.questionIndex + 1;
  let element = document.getElementById("progress");
  element.innerHTML =
    "Question " + currentQuestionNumber + " of " + quiz.question.length;
}

function handleOptionButton(id, choice) {
  let button = document.getElementById(id);
  button.onclick = function () {
    quiz.checkOptionWithAnswer(choice);
    loadQuestions();
  };
}

var quiz = new Quiz(question);
loadQuestions();
