var startEl = document.getElementById("start");
var conatinerQuestionEl = document.getElementById("question-container");
var formInitials = document.getElementById("initials-form")
var timerEl = document.getElementById("time");
var scoreEl = document.getElementById("scores");
var questionEl = document.getElementById("question");
var answerEl = document.getElementById("answer");
var correctEl = document.getElementById("correct");
var gameResultEl = document.getElementById("game-result");
var finalscoreEl = document.getElementById("final-score");
var gameoverdisplayEl = document.getElementById("gameover-display");
var initialsEl = document.getElementById("initials");
var score = 0;
var QuestionIndex = 0;
var timeleft;
var quizover = false;
timerEl.innerText = 0;



//Questions Array
var questions = [
    { q:'What does HTML stand for?',
      a:'1. Hyper Text Markup Language',
      options: [{option: '1. Hyper Text Markup Language'}, {option: '2. Home Tool Markup Language'}, {option: '3. Hyperlinks and Text Markup Language'}]
    },
    { q: 'Who is making the Web standards?',
      a: '2. The World Wide Web Consortium',
      options: [{option: '1. Microsoft'}, {option: '2. The World Wide Web Consortium'}, {option: '3. Google'}]
    },
    { q: 'What does CSS stand for?',
      a: '1. Cascading Style Sheets',
      options: [{option:'1. Cascading Style Sheets'}, {option: '2. Creative Style Sheets'}, {option: '3. Computer Style Sheets'}]
    },
    { q: 'What is the correct HTML for referring to an external style sheet?',
      a: '2. <link rel="stylesheet" type="text/css" href="mystyle.css">',
      options: [{option: '1. <stylesheet>mystyle.css</stylesheet>'}, {option: '2. <link rel="stylesheet" type="text/css" href="mystyle.css">'}, {option: '3. <style src="mystyle.css">'}]
    } ];


// timer
var setTime = function() {
    timeleft = 10;

    var timercheck = setInterval(function() {
        timerEl.innerText = timeleft;
        timeleft--;

        if (timeleft <= 0 || quizover === true) {
            timerEl.innerText = 0;
            clearInterval(timercheck);
            conatinerQuestionEl.classList.add("hide");
            gameResultEl.innerText = "Quiz Over";
            finalscoreEl.innerText = score;
        }
    }, 1000);
};

var startQuiz = function() {
    setTime(); 
    setQuestion();
}

// display question and options for it
var setQuestion = function() {
    resetOptions();
    displayQuestion(questions[QuestionIndex]);
}

//remove option buttons
var resetOptions = function() {
    while (answerEl.firstChild) {
        answerEl.removeChild(answerEl.firstChild)
    };
};

var displayQuestion = function(index) {
    questionEl.innerText = index.q
    for (var i = 0; i < index.options.length; i++) {
        var answerbutton = document.createElement("button")
        answerbutton.innerText = index.options[i].option
        answerbutton.classList.add('answer-btn')
        answerbutton.addEventListener("click", answerCheck)
        answerEl.appendChild(answerbutton)
    }
};

//check answer
var answerCheck = function(event) {
    var selectedOption = event.target
        if (questions[QuestionIndex].a === selectedOption.innerText) {
        correctEl.textContent = 'Correct'
        score = score + 5;
    }
    else {
        correctEl.textContent ='Wrong'
        score = score - 2;
        timeleft = timeleft - 5;
    }

    scoreEl.innerText = score;
    QuestionIndex++;

    if  (questions.length > QuestionIndex) {
        setQuestion();
    }
    else {
        quizover = true;
    }
};


var gameoverDisplay = function(event) {

  var initials = initialsEl.value;
  
    if ( initials !== ""){
        var highscore = JSON.parse(window.localStorage.getItem("highscore")) || [];
        var newHighScore = {
            score :score, 
            initials:initials
        }
        highscore.push(newHighScore)
        window.localStorage.setItem("highscore",JSON.stringify(highscore))
    }
  
   // localStorage.setItem("player",JSON.stringify(player));
gameoverDisplay();

    
    //event.preventDefault(); 
   // document.querySelector("#initials").value;
    //gameoverdisplayEl.innerText = gameoverDisplay;
};
function renderhighscore() {
    finalscoreEl = JSON.parse(localStorage.getItem("initials"));

}
//console.log(gameoverDisplay);

//execution of the script
startEl.addEventListener("click", startQuiz);
formInitials.addEventListener("submit",gameoverDisplay);






