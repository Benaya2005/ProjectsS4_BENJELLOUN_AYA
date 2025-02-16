const questions = [
    {
        question: "What is 2 + 2?",
        answers: ["3", "4", "5"],
        correctAnswer: "4"
    },
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Berlin"],
        correctAnswer: "Paris"
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: ["Earth", "Jupiter", "Mars"],
        correctAnswer: "Jupiter"
    },
    {
        question: "Who wrote 'Hamlet'?",
        answers: ["Shakespeare", "Dickens", "Austen"],
        correctAnswer: "Shakespeare"
    },
    {
        question: "What is the boiling point of water?",
        answers: ["90°C", "100°C", "110°C"],
        correctAnswer: "100°C"
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: ["Au", "Ag", "Fe"],
        correctAnswer: "Au"
    },
    {
        question: "What is the square root of 49?",
        answers: ["6", "7", "8"],
        correctAnswer: "7"
    },
    {
        question: "What is the capital of Japan?",
        answers: ["Seoul", "Beijing", "Tokyo"],
        correctAnswer: "Tokyo"
    },
    {
        question: "What is the longest river in the world?",
        answers: ["Amazon", "Nile", "Yangtze"],
        correctAnswer: "Nile"
    },
    {
        question: "Which element has the atomic number 1?",
        answers: ["Oxygen", "Hydrogen", "Carbon"],
        correctAnswer: "Hydrogen"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;
let quiz_end=false;

function displayQuestion() {
    const question = questions[currentQuestionIndex];

    let questionHTML = '<h3 class="q1">' + question.question + "</h3>";

    for (let i = 0; i < question.answers.length; i++) {
        questionHTML += `
            <label>
                <input type="radio" name="answer" value="${question.answers[i]}">
                ${question.answers[i]}
            </label>
        `;
    }
    
    // Create a timer element for this question
    questionHTML += `<div id="timer${currentQuestionIndex}" class="timer">${timeLeft}</div>`;
    const questionElement = document.createElement("div");
    questionElement.innerHTML = questionHTML;
    
    document.getElementById("questions").appendChild(questionElement);
    startCountdown();
}
// Submit button logic
var sub = document.getElementById("submit");
sub.addEventListener("click", () => {
    if (quiz_end==true) return;

    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer && selectedAnswer.value === questions[currentQuestionIndex].correctAnswer) {
        score++;
    }

    // Move to next question
    currentQuestionIndex++;

    // If there are more questions, display the next one; otherwise, show the score
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else if(quiz_end===false) {
            valider();// End the quiz and show the final score
    }
});

function valider() {
    if (quiz_end==true) return;
    while (currentQuestionIndex < questions.length) {
        displayQuestion();
        currentQuestionIndex++;
    }
    quiz_end=true;
    clearInterval(timer);  

    window.scrollTo(0, 0); 
    document.getElementById('score').style.display = 'block';
    let s = '<p class="score1">' + `Score: ${score}/${questions.length}` + '</p>';

    const e = document.createElement("div");
    e.innerHTML = s;
    document.getElementById("score").appendChild(e);
    x=1;

}

// Countdown timer function
function startCountdown() {
    const timerElement = document.getElementById(`timer${currentQuestionIndex}`);
    timeLeft = 15;  // Reset the timer for each question

    // Clear any existing timer if needed
    if (timer) {
        clearInterval(timer);
    }

    // Set an interval to decrease the time every second
    timer = setInterval(() => {
        timerElement.textContent = timeLeft;  // Update the timer on the page

        if (timeLeft === 0) {
            clearInterval(timer);  // Stop the timer when it reaches 0
            timerElement.textContent = "Time's up!";
            currentQuestionIndex++; // Proceed to next question after time runs out
            
            // If there are more questions, display the next one; otherwise, show the score
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                valider(); // End the quiz
            }
        } else {
            timeLeft--;  // Decrease the time by 1 second
        }
    }, 1000);  // Update every second (1000 ms)
}
function commencer(){
    document.getElementById('start').style.display='none';
    document.getElementById('submit').style.display='block';
    document.getElementById('submit1').style.display='block';

    displayQuestion();
}
    
// Start the quiz by displaying the first question
