let timerEl = document.getElementById("time");
let startScreen = document.getElementById("start-screen");
let startBtn = document.getElementById("start");
let questionsContainer = document.getElementById("questions");
let questionTitleEl = document.getElementById("question-title");
let questionsChoices = document.getElementById("choices");
let endScreen = document.getElementById("end-screen");
let finalScore = document.getElementById("final-score");
let initials = document.getElementById("initials");
let submitBtn = document.getElementById("submit");
let feedbackAlert = document.getElementById("feedback");



// Define the questions and the choices and the answers, put it in a variable in questions.js file


startBtn.addEventListener('click', function (event) {
    // Hide the start screen
    startScreen.classList.add("hide");
    // Display questions screen
    questionsContainer.classList.remove("hide");
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

function createOptionButton() {
    let choicesDiv = document.getElementById("choices");
    for (let i = 0; i < 4; i++) {
        let button = document.createElement('button')
        button.classList.add("choices-button");
        choicesDiv.appendChild(button)
    }
    choiceButtonEl = document.querySelectorAll('.choices-button')
    for (let i = 0; i < choiceButtonEl.length; i++) {
        choiceButtonEl[i].addEventListener('click', buttonsEventList)
    }
    console.log(choiceButtonEl, "button")
    feedbackAlert.classList.remove('hide');
}

function displayQuestions() {
    currentQuestionIndex = quizQuestions[i];
    questionTitleEl.textContent = `Question ${i + 1}: ${currentQuestionIndex["question-title"]}`;
    console.log(`Question ${i + 1}: ${currentQuestionIndex["question-title"]}`);
    for (let j = 0; j < currentQuestionIndex.choices.length; j++) {
        choiceButtonEl[j].textContent = currentQuestionIndex.choices[j];
    }
}

function buttonsEventList(event) {
    console.log(event.target.textContent)
    let selectedChoice = event.target.textContent;
    let currentQuestion = quizQuestions[i];

    if (selectedChoice === currentQuestion.answer) {
        feedbackAlert.textContent = "Your answer is correct!";
    } else {
        timeLeft -= 5;
        feedbackAlert.textContent = "Your answer is wrong!";
    }
    moveToNextQuestion();
}

function moveToNextQuestion() {
    if (i < quizQuestions.length - 1) {
        i++;
        displayQuestions();
    } else {
        // When the game ends, it should display their score and give the user the ability to 
        // save their initials and their score 
        console.log('Quiz completed!');
        endQuiz();
    }
}

// The quiz should end when all questions are answered or the timer reaches 0.
function endQuiz() {
    clearInterval(timeInterval);
    questionsScreen.classList.add("hide");
    endScreen.classList.remove("hide");
    feedbackAlert.classList.add("hide");
}