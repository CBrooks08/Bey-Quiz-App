'use strict';
let questionNumber = 0;
let userScore = 0;
$('#container').hide();

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
    <form>
      <h3>${STORE[questionNumber].question}</h3>
      <fieldset>
        <legend></legend>
        <input type="radio" id="question-one-answer1" 
          name="options" value="${STORE[questionNumber].answers[0]}" required>
        <label for="question-one-answer1">
          <span>${STORE[questionNumber].answers[0]}</span>
        </label>
        <input type="radio" id="question-one-answer2" 
          name="options" value="${STORE[questionNumber].answers[1]}" 
          required>
        <label for="question-one-answer2">
          <span>${STORE[questionNumber].answers[1]}</span>
        </label>
        <input type="radio" id="question-one-answer3" name="options" value="${STORE[questionNumber]  .answers[2]}" 
         required>
        <label for="question-one-answer3">
          <span>${STORE[questionNumber].answers[2]}   </span>
        </label>
        <input type="radio" id="question-one-answer4" 
          name="options" value="${STORE[questionNumber].answers[3]}" 
          required>
        <label for="question-one-answer4">
          <span>${STORE[questionNumber].answers[3]}</span>
        </label>
        <button type="submit" id="js-submit-button">SUBMIT</button>
      </fieldset>
    </form>`;
}
//render quiz form with questions

function renderQuestion() {
  // console.log("User clicked on button");
  // console.log(${STORE[questionNumber].answers});
  // console.log( generateQuizForm() );
  $('#container').fadeIn("slow");
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
    //console.log("Correct Answer: ", correct," selectedAnswer: ",selectedAnswer);
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
   $('#container').html(`<section class="correctFeedback" role="main">
     <h2>Correct!</h2>
     <img src="https://i.imgur.com/y5wI0Pk.gif" alt="Beyonce clapping" class="media">
      <button class="js-next-button">Next</button>
    </section>`);
    incrementScore();
}

function provideIncorrectFeedback() {
  let correctFeedback = STORE[questionNumber].correctAnswer;
  $('#container').html(`<section class="incorrectFeedback role="main">
    <h2>Sorry, that's incorrect. <br >
    The correct answer is ${correctFeedback}</h2>
    <img src="https://i.imgur.com/jjp1Yoy.gif" alt="Beyonce looks confused" class="media">
    <button class="js-next-button">Next</button>
    </section`);
}

function nextQuestion() {
 $('#container').on('click', '.js-next-button', function(event){
  event.preventDefault; 

  var one = `${STORE[questionNumber].image}`;
  console.log(one);

  if(questionNumber < 9) {
    incrementQuestionNumber();
    renderQuestion();
    $('.bkgrnd_img').css("background", `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url( ${one} )`, "background-repeat", 'no-repeat');
    }
  else{
    renderResultsPage();
    }
  });
}

function renderResultsPage() {
  $("#container").css("max-width", "100%");
  $("#container").html(`
  <div class="results"><h2> Your score: ${userScore} out of 10</h2><button class="js-restart-button">Play Again?</button></div>`);
  $('.bkgrnd_img').css("background", `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://www.essence.com/wp-content/uploads/2016/07/1469554143/Screen%20Shot%202016-07-26%20at%201.27.25%20PM.jpg)`);
}

function restartQuiz() {
 $('#container').on('click', '.js-restart-button', function(event){
  event.preventDefault; 
  location.reload();
  });
}

function createQuizApp() {
  hideQuiz();
  startQuiz();
  userSubmitsAnswer();
  nextQuestion();
  restartQuiz();
}

$(createQuizApp);
