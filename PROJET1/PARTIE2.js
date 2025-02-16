let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timer;
let quiz_end = false;
let questions = [];

function fetchQuestions() {
    event.preventDefault();    
    document.getElementById("inputinf").style.display='none';
    document.getElementById("container").style.display='block';    
    const amount = document.getElementById('trivia_amount').value;
    const category = document.querySelector("select[name='trivia_category']").value;
    const difficulty =  document.querySelector("select[name='trivia_difficulty']").value;
    const type = document.querySelector("select[name='trivia_type']").value;
    const url = `https://opentdb.com/api.php?amount=${amount}`;

    if (category !=='any'){
        url+=`&category=${category}`
    };
    if (difficulty !=='any'){
        url+=`&difficulty=${difficulty}`
    };
    if (type !=='any'){
        url+=`&type=${type}`
    };

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.response_code === 0) {
                console.log(1);
                questions = data.results;
            } else {
                alert("No questions found. Please check your filters.");
            }
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            alert("An error occurred while fetching questions.");
        });
    
}

function displayQuestion() {
    console.log(questions);
    if (quiz_end) return;

    const question = questions[currentQuestionIndex];
    console.log(question);
    const questionHTML = `
        <h3 class="q1">${question.question}</h3>
        ${[question.correct_answer, ...question.incorrect_answers].map(answer => `
            <label>
                <input type="radio" name="answer" value="${answer}">
                ${answer}
            </label><br>
        `)}
        <div id="timer${currentQuestionIndex}" class="timer">${timeLeft}</div>
    `;

    const questionElement = document.createElement("div");
    questionElement.innerHTML = questionHTML;

    document.getElementById("questions").appendChild(questionElement);
    startCountdown();
}

function startCountdown() {
    const timerElement = document.getElementById(`timer${currentQuestionIndex}`);
    timeLeft = 15;

    if (timer) {
        clearInterval(timer);
    }

    timer = setInterval(() => {
        timerElement.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            timerElement.textContent = "Time's up!";
            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                valider();
            }
        } else {
            timeLeft--;
        }
    }, 1000);
}

document.getElementById("submit").addEventListener("click", () => {
    if (quiz_end) return;

    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer && selectedAnswer.value === questions[currentQuestionIndex].correct_answer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        valider();
    }
});

function valider() {
    if (quiz_end) return;

    
    while (currentQuestionIndex < questions.length) {
        displayQuestion();
        currentQuestionIndex++;
    };
    quiz_end = true;
    clearInterval(timer);

    window.scrollTo(0, 0);

    document.getElementById('score').style.display = 'block';
    const scoreHTML = `<p class="score1">Score: ${score}/${questions.length}</p>`;
    const scoreElement = document.createElement("div");
    scoreElement.innerHTML = scoreHTML;
    document.getElementById("score").appendChild(scoreElement);
}

function commencer(){
    document.getElementById('start').style.display='none';
    document.getElementById('submit').style.display='block';
    document.getElementById('submit1').style.display='block';
    displayQuestion();
}

