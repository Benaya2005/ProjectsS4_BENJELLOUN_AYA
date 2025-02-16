let indice = 0;
let score = 0;
let tempsQuestion = 15;
let minuteur;
let quiz_end = false;
let questions = [];

function fetchQuestions() {
    event.preventDefault();    
    document.getElementById("inputinf").style.display = 'none';
    const amount = document.getElementById('trivia_amount').value;
    const category = document.querySelector("select[name='trivia_category']").value;
    const difficulty = document.querySelector("select[name='trivia_difficulty']").value;
    const type = document.querySelector("select[name='trivia_type']").value;
    let url = `https://opentdb.com/api.php?amount=${amount}`;

    if (category !== 'any') {
        url += `&category=${category}`;
    };
    if (difficulty !== 'any') {
        url += `&difficulty=${difficulty}`;
    };
    if (type !== 'any') {
        url += `&type=${type}`;
    };

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.response_code === 0) {
                questions = data.results;
                document.getElementById("container").style.display = 'block';    

            } 
            else if (data.response_code === 5){
                alert('Too many requests have occurred');
            }
            else {
                alert("No questions found. Please check your filters.");
            }
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            alert("An error occurred while fetching questions.");
        });
}

function passerQuestion() {
    console.log(questions);
    if (quiz_end) return;

    const question = questions[indice];
    console.log(question);
    const questionHTML = `
        <h3 class="q1">${question.question}</h3>
        ${[question.correct_answer, ...question.incorrect_answers].map(answer => `
            <label>
                <input type="radio" name="answer" value="${answer}">
                ${answer}
            </label><br>
        `)}
        <div id="timer${indice}" class="timer">${tempsQuestion}</div>
    `;

    const ajouterAUhtml = document.createElement("div");
    ajouterAUhtml.innerHTML = questionHTML;

    document.getElementById("questions").appendChild(ajouterAUhtml);
    minuteurStart();
}

function minuteurStart() {
    const minuteurElement = document.getElementById(`timer${indice}`);
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

document.getElementById("submit").addEventListener("click", () => {
    if (quiz_end) return;

    const reponse = document.querySelector('input[name="answer"]:checked');
    if (reponse && reponse.value === questions[indice].correct_answer) {
        score++;
    }

    indice++;

    if (indice < questions.length) {
        passerQuestion();
    } else {
        valider();
    }
});

function valider() {
    if (quiz_end) return;

    while (indice < questions.length) {
        passerQuestion();
        indice++;
    };
    quiz_end = true;
    clearInterval(minuteur);

    window.scrollTo(0, 0);

    document.getElementById('score').style.display = 'block';
    const scoreHTML = `<p class="score1">Score: ${score}/${questions.length}</p>`;
    const scoreElement = document.createElement("div");
    scoreElement.innerHTML = scoreHTML;
    document.getElementById("score").appendChild(scoreElement);
}

function commencer(){
    document.getElementById('start').style.display = 'none';
    document.getElementById('submit').style.display = 'block';
    document.getElementById('submit1').style.display = 'block';
    passerQuestion();
}
