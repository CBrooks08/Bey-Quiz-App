'use strict';

const STORE = [
  {
    question: `What is Beyonce's favorite number?`,
    answers:[
      `four`,
      `ten`,
      `eight`,
      `twelve`
    ],
    correctAnswer: `four`
  },
  {
    question: `How many Grammy Awards has Beyonce won?`,
    answers:[
      `twenty-four`,
      `twenty`,
      `twenty-two`,
      `sixty-six`
    ],
    correctAnswer: `twenty-two`
  },
  {
    question: `What is one habit that annoys Jay-Z and Kelly Rowland about Beyonce?`,
    answers: [
      `she talks with food in her mouth`,
      `she can be a bit of a slob`,
      `she snores louder than a freight train`,
      `none of the above`
    ],
    correctAnswer: `she can be a bit of a slob`
  },
  {
    question: 'What is the name of Beyonce philantropic initiative?',
    answers:[
      'beyhive',
      'ivypark',
      'beygood',
      'parkwood'
    ],
    correctAnswer: 'beygood'
  },
  {
    question: `What is one of Beyonce's favorite television shows?`,
    answers:[
      `ozark`,
      `friends`,
      `breaking bad`,
      `game of thrones`
    ],
    correctAnswer: `game of thrones`
  },
  {
    question: `Who is beyonce named after?`,
    answers:[
      `after her paternal grandfather`,
      `after a distant cousin on her mother's side of the family`,
      `her name is derived from her mother's maiden name, beyince`,
      `she's named after her mother's best friend`
    ],
    correctAnswer:`her name is derived from her mother's maiden name, which is beyince`
  },
  {
    question: `What song did Beyonce sing at President Obama's Neighborhood Inaugural Ball?`,
    answers:[
      `listen`,
      `at last`,
      `halo`,
      `love on top`
    ],
    correctAnswer: `at last`
  },
  {
    question: `What is the name of Beyonce's ten piece all female band?`,
    answers: [
      `girl's tyme`,
      `destiny's child part II`,
      `the stingettes`,
      `sugar mama's`
    ],
    correctAnswer: `sugar mama's`
  },
  {
    question: `Beyonce donated her entire salary from what movie to help with housing for homeless and low income families?`,
    answers: [
      `dream girls`,
      `the pink panther`,
      `cadillac records`,
      `obsessed`
    ],
    correctAnswer:`cadillac records`
  },
  {
   question: `Beyonce is set to star in the in upcoming remake of a classic Disney movie. What is the movie and what character will she play?`,
   answers:[
     `the lion king - nahla`,
     `aladdin - princess jasmine`,
     `the little mermaid - ariel`,
     `bambi - bambi`
   ],
   correctAnswer: `the lion king - nahla`
 },
]
//console.log(STORE[0].question);
//start questions and score at zero, should questions be 1?

let questionNumber = 0;
let userScore = 0;

//hide quiz page don't render until start button is clicked

function hideQuiz(){
  $('.scoring').hide();
}

//questions and score should increment by none - 2 functions
function incrementQuestionNumber() {
  questionNumber++;
  $('.js-question-number').text(questionNumber + 1);
}
function incrementScore() {
  userScore++;
  $('.js-user-score').text(userScore);
}

//build quiz and generate form template

function generateQuizForm() {
  return `
    <h3>${STORE[questionNumber].question}</h3>
    <form class>
      <fieldset>
        <legend></legend>
          <input type="radio" id="question-one-answer1" name="options" value="${STORE[questionNumber].answers[0]}" required>
          <label for="question-one-answer1"><span>${STORE[questionNumber].answers[0]}</span></label>
          <input type="radio" id="question-one-answer2" name="options" value="${STORE[questionNumber].answers[1]}" required>
          <label for="question-one-answer2"><span>${STORE[questionNumber].answers[1]}</span></label>
          <input type="radio" id="question-one-answer3" name="options" value=${STORE[questionNumber].answers[2]} required>
          <label for="question-one-answer3"><span>${STORE[questionNumber].answers[2]}</span></label>
          <input type="radio" id="question-one-answer4" name="options" value="${STORE[questionNumber].answers[3]}"" required>
          <label for="question-one-answer4"><span>${STORE[questionNumber].answers[3]}</span></label>
        <button type="submit" id="js-submit-button">Submit</button>
     </fieldset>
  </form>`;
}
//render quiz form with questions

function renderQuestion() {
  //console.log("User clicked on button");
  // console.log(STORE);
  //console.log( generateQuizForm() );
  $('#container').html(generateQuizForm());
}

//what happens when start is pressed? show quiz, header, hide start page, render question, question # 1,

function startQuiz() {
  $('#start-quiz').on('click', '.js-start-button', function(event){
  event.preventDefault;
  $('#start-quiz').fadeOut('slow');
  $('.scoring').fadeIn('slow');
  $('.js-question-number').text(1);
  renderQuestion();
  });
}

//user selects answers and submits answer, provide user feedback based on selected answer

function userSubmitsAnswer() {
  $('#container').on('submit', function(event) {
    event.preventDefault();
    
    let correct = `${STORE[questionNumber].correctAnswer}`;
    let selectedAnswer = $('input[name=options]:checked').val();
    //console.log("correct: ",correct," selectedAnswer: ",selectedAnswer);
    if(selectedAnswer == correct) {
      provideCorrectFeedback();
    }
    else {
      provideIncorrectFeedback();
    }
  });
}

//create feed back// what happens now? feedback and user advances in game? how? create a button update score if correct
function provideCorrectFeedback() {
   $('#container').html(`<section class = "correctFeedback" role="main"><h2>Correct!</h2><img src="https://i.imgur.com/y5wI0Pk.gif alt="Beyonce clapping" class="media">
    <button class ="js-next-button">Next </button></section>`);
    incrementScore();
}

function provideIncorrectFeedback() {
  let correctFeedback = STORE[questionNumber].correctAnswer;
  $('#container').html(`<section class = "incorrectFeedback role="main"><h2> Sorry, that's incorrect.  The correct answer is ${correctFeedback}</h2><img src="https://i.imgur.com/jjp1Yoy.gif" alt="Beyonce looks confused" class="media">
  <button class = "js-next-button"> Next</button>`);
}

function nextQuestion () {
 $('#container').on('click', '.js-next-button', function(event){
  event.preventDefault; 
  if(questionNumber < 9) {
    incrementQuestionNumber();
    renderQuestion();
    }
  else{
    renderResultsPage();
    }
  });
}
function renderResultsPage () {
  $("#container").html(`
  <div class = "results"><h2> Your score is ${userScore} out of 10. Would you like to play again?</h2><button class="js-restart-button">restart</button></div>`);
}
function restartQuiz() {
 $('#container').on('click', '.js-restart-button', function(event){
  event.preventDefault; 
  location.reload();
  });
}


function createQuizApp () {
  hideQuiz();
  startQuiz();
  userSubmitsAnswer();
  nextQuestion();
  restartQuiz();
}
$(createQuizApp);
