var startEl = document.getElementById("start");
var conatinerQuestionEl = document.getElementById("question-container");
var timerEl = document.getElementById("time");
var scoreEl = document.getElementById("scores");
var questionEl = document.getElementById("question");
var answerEl = document.getElementById("answer");
var correctEl = document.getElementById("correct");
var score = 0;
var QuestionIndex = 0;

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

var  arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5);


var setQuestion = function() {
    displayQuestion(arrayShuffledQuestions[QuestionIndex]);
}

// timer
var setTime = function() {
   var timeleft = 25;

    var timercheck = setInterval(function() {
        timeleft--;
        timerEl.textContent = timeleft;

        if (timeleft < 0) {
            timerEl.textContent = 0;
            clearInterval(timercheck);
        }
    }, 1000);
};

startEl.addEventListener("click", setTime);


// display question and answers
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

setQuestion();

var answerCheck = function(event) {
    var selectedOption = event.target
        if (arrayShuffledQuestions[QuestionIndex].a === selectedOption.innerText) {
        correctEl.textContent = 'true';
        score = score + 2;
    }
    else {
        correctEl.textContent ='false'
        score = score - 1;
        timeleft = timeleft - 2;
    }

    
    QuestionIndex++
      if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
          setQuestion()
      }   
      else {
         
          }
};

var setScore = function() {
    scoreEl.innerText = score
}

setScore()



