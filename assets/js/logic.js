
let startBtn = document.querySelector('#start');
let timerEl = document.querySelector('#time');
let startScreen = document.querySelector('#start-screen');
let endScreen = document.querySelector('#end-screen');
let questionsScreen = document.querySelector('#questions');
let currentQuestionIndex = 0;
let questionNumber = 0;
let questionsContainer = document.querySelector("#questions");
let choiceButtonEl;
let feedbackAlert = document.querySelector('#feedback');
let questionTitleEl = document.getElementById("question-title")
let timeLeft;
let timeInterval;
let finalScore = document.querySelector("#final-score");


startBtn.addEventListener('click', function (event) {
    // Hide the start screen
    startScreen.classList.add("hide");
    // Display questions screen
    questionsScreen.classList.remove("hide");
    createOptionButton();
    // Call the startQuiz function
    startQuiz();
    displayQuestions();
});


function startQuiz() {
    timeLeft = 59;
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent = timeLeft;
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else {
            // Once `timeLeft` gets to 0, set `timerEl` to an empty string
            timerEl.textContent = 'time up';
            endQuiz();
        }
    }, 1000);
}

// Function to create option buttons
function createOptionButton() {
    // Selecting the parent element where the buttons will be added
    let choicesDiv = document.getElementById("choices");
    // Creating four option buttons inside a loop
    for (let i = 0; i < 4; i++) {
        let button = document.createElement('button');
        // Adding a CSS class to the button for styling
        button.classList.add("choices-button");
        // Appending the button to the choicesDiv
        choicesDiv.appendChild(button);
    }
    // Selecting all the created buttons with the "choices-button" class
    choiceButtonEl = document.querySelectorAll('.choices-button');
    // Adding a click event listener to each button and linking it to the 'buttonsEventList' function
    for (let i = 0; i < choiceButtonEl.length; i++) {
        choiceButtonEl[i].addEventListener('click', buttonsEventList);
    }
    // Logging the selected buttons to the console for debugging
    console.log(choiceButtonEl, "button");
    // Removing the 'hide' class from the feedbackAlert element, making it visible
    feedbackAlert.classList.remove('hide');
}

// Function to display the current question and choices on the screen
function displayQuestions() {
    // Retrieve the current question from the quizQuestions array based on the current index (i)
    currentQuestionIndex = quizQuestions[questionNumber];
    // Update the text content of the question title element 
    // to display the current question number and title
    questionTitleEl.textContent = `Question ${questionNumber + 1}: ${currentQuestionIndex["question-title"]}`;
    console.log(`Question ${questionNumber + 1}: ${currentQuestionIndex["question-title"]}`);
    // Iterate through the choices for the current question
    for (let j = 0; j < currentQuestionIndex.choices.length; j++) {
        // Set the text content of each choice button to display the corresponding choice 
        // for the current question
        choiceButtonEl[j].textContent = currentQuestionIndex.choices[j];
    }
}

function buttonsEventList(event) {
    // Log the text content of the clicked button to the console
    console.log(event.target.textContent);
    // Get the text content of the clicked button (user's selected choice)
    let selectedChoice = event.target.textContent;
    // Get the current question object based on the current index (i)
    let currentQuestion = quizQuestions[questionNumber];
    // Check if the selected choice matches the correct answer for the current question
    if (selectedChoice === currentQuestion.answer) {
        // If correct, display a correct answer message in the feedback alert
        feedbackAlert.textContent = "Your answer is correct!";
        setTimeout(function(){
            feedbackAlert.textContent = ""
            moveToNextQuestion();
        }, 1000)
        // clearTimeout(choiceTimeout)
        
    } else {
        // If incorrect, subtract 5 seconds from the timer and display a wrong answer message
        timeLeft -= 5;
        feedbackAlert.textContent = "Your answer is wrong!";
        setTimeout(function(){
            feedbackAlert.textContent = ""
            moveToNextQuestion();
        }, 1000)
        // clearTimeout(choiceTimeout)
    }
    
}

 // Move to the next question, regardless of whether the answer was correct or not
    // moveToNextQuestion();

// Move to the next question or end the quiz if all questions are answered
function moveToNextQuestion() {
    // Check if there are more questions
    if (questionNumber < quizQuestions.length - 1) {
        // If there are, increment the index (i) and display the next question
        questionNumber++;
        displayQuestions();
    } else {
        // If there are no more questions, end the quiz
        console.log('Quiz completed!');
        // Call the function to end the quiz
        endQuiz();
    }
}

// The quiz should end when all questions are answered or the timer reaches 0.
function endQuiz() {
    // Display score
    displayScore();
    // Stop the timer interval
    clearInterval(timeInterval);
    // Hide the questions screen
    questionsScreen.classList.add("hide");
    // Display the end screen
    endScreen.classList.remove("hide");
    // Hide the feedback alert
    feedbackAlert.classList.add("hide");
}

// Create function to display user total score based on total timeLeft
function displayScore() {
    if (endQuiz) {
        // Add textContent to span final-score from the timeLeft
        finalScore.textContent = timeLeft;
    }
}

// Create eventListener for submit button on the end-screen 
// Select button element from end-screen and store it in a variable 
let submitBtn = document.querySelector("#submit");
let  highscoresArray = [];
// Add eventListener to submitBtn 
submitBtn.addEventListener('click', function(event) {
    // use preventDefault to prevent dafault submit and just save to localStorage
    event.preventDefault();
      // Get the input field value 
      let initials = document.querySelector("#initials").value;
    //   if (initials !== '') {
        finalScore.textContent = timeLeft;
        // Save the trimmed value to local storage
        highscores = { initials: initials, score: timeLeft };
        // localStorage.setItem('highscores', JSON.stringify(highscores));
        let highScoresLocStor = JSON.parse(localStorage.getItem('highscores'));
        // let highScoresLocStor = null;
        if (highScoresLocStor === null) {
            highscoresArray.push(highscores);
            localStorage.setItem('highscores', JSON.stringify(highscoresArray));
        } else {
            highScoresLocStor.push(highscores);
            localStorage.setItem('highscores', JSON.stringify(highScoresLocStor));
        }
    //   }
       // Check if the input value is not empty after removing leading and trailing whitespaces
      
      
      window.location.pathname = '/highscores.html'
});




// let highscores = [];
// let scoreObject = { initials: localStorage.getItem('saved-initials'), score: localStorage.getItem('saved-finalScore')};
// console.log(scoreObject);


// When the game ends, it should display their score and give the user the ability to 
// save their initials and their score 

// Score
// add score when user answers each question 
// store the score in localStorage 
// get the score from Local storage, 
// calculate it 
// and display the total score when the game ends, in endQuiz function

// Initials
// Add 7 more questions

// Correct
// Correct Options for the 3 questions already in the code
// Correct how feedbacks appear, now on the next question, but should be on the current question
// the highscore should be ordered and should save all user data 
// the highscores should be saved to localStorage so that if I refresh, the data stays, and later 
// I can clear the data