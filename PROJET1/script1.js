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

let indice = 0;
let score = 0;
let tempsQuestion = 15;
let minuteur;
let quiz_end = false;

function passerQuestion() {
    const question = questions[indice];

    let questionHTML = '<h3 class="q1">' + question.question + "</h3>";

    for (let i = 0; i < question.answers.length; i++) {
        questionHTML += `
            <label>
                <input type="radio" name="answer" value="${question.answers[i]}">
                ${question.answers[i]}
            </label>
        `;
    }
    
    questionHTML += `<div id="minuteur${indice}" class="timer">${tempsQuestion}</div>`;
    const ajouterAUhtml = document.createElement("div");
    ajouterAUhtml.innerHTML = questionHTML;
    
    document.getElementById("questions").appendChild(ajouterAUhtml);
    minuteurStart();
}

var sub = document.getElementById("submit");
sub.addEventListener("click", () => {
    if (quiz_end == true) return;

    const reponse = document.querySelector('input[name="answer"]:checked');
    if (reponse && reponse.value === questions[indice].correctAnswer) {
        score++;
    }

    indice++;

    if (indice < questions.length) {
        passerQuestion();
    } else if (quiz_end === false) {
        valider();
    }
});

function valider() {
    if (quiz_end == true) return;
    while (indice < questions.length) {
        passerQuestion();
        indice++;
    }
    quiz_end = true;
    clearInterval(minuteur);  

    window.scrollTo(0, 0); 
    document.getElementById('score').style.display = 'block';
    let s = '<p class="score1">' + `Score: ${score}/${questions.length}` + '</p>';

    const e = document.createElement("div");
    e.innerHTML = s;
    document.getElementById("score").appendChild(e);
    x = 1;
}

function minuteurStart() {
    const minuteurElement = document.getElementById(`minuteur${indice}`);
    tempsQuestion = 15;

    if (minuteur) {
        clearInterval(minuteur);
    }

    minuteur = setInterval(() => {
        minuteurElement.textContent = tempsQuestion;

        if (tempsQuestion === 0) {
            clearInterval(minuteur);
            minuteurElement.textContent = "Temps écoulé!";
            indice++;

            if (indice < questions.length) {
                passerQuestion();
            } else {
                valider();
            }
        } else {
            tempsQuestion--;
        }
    }, 1000);
}

function commencer() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('submit').style.display = 'block';
    document.getElementById('submit1').style.display = 'block';

    passerQuestion();
}
