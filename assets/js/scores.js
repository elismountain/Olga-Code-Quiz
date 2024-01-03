let scoreObject; 
let highscoresFromStorage = [];

// Create a function to display user initials and score
function displayScoreInitials () {
    let highscoresFromLocalStorage = JSON.parse(localStorage.getItem('highscores'));
    console.log(highscoresFromLocalStorage);
    
    highscoresFromLocalStorage.sort(function scoreOrder(a, b) {
        return b.score - a.score;
    });
    

    // Select parent ol element 
    if (highscoresFromLocalStorage) {
        let olEl = document.querySelector("#highscores");
        // loop through highscores array and create li for each user input
        for (let i = 0; i < highscoresFromLocalStorage.length; i++) {
            // Create li for each result in the ol tag
            let liEl = document.createElement('li');
            // Add content to each ul element from user input: initials and score
            liEl.textContent = highscoresFromLocalStorage[i].initials + ' - ' + highscoresFromLocalStorage[i].score;
            olEl.appendChild(liEl);
};
    }
    // console.log(scoreObject);
}

displayScoreInitials();


// Clear highscores
// Select Clear Highscores button 
let clearBtn = document.querySelector("#clear");
// Add eventListener to a buton
clearBtn.addEventListener('click', function() {
    
     // Clear existing content
     let finalScore = document.querySelector('#highscores');
     localStorage.removeItem("highscores");
     localStorage.removeItem("saved-initials");
     localStorage.removeItem("saved-finalScore");
     finalScore.innerHTML = '';

});