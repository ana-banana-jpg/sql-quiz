const quizData = [
    {
        question: 'What does SQL stand for?',
        a: 'Serial Query Language',
        b: 'Semantic Query Language',
        c: 'Structured Query Language',
        d: 'Structure Question Language',
        correct: 'c'
    },
    {
        question: 'What can SQL do?',
        a: 'Update records in a database.',
        b: 'Retrieve data from a database.',
        c: 'Create new tables in a database.',
        d: 'All of the above.',
        correct: 'd'
    },
    {
        question: 'Using SQL, how do you select all the columns from a table named "Items"?',
        a: 'SELECT * FROM Items',
        b: 'SELECT *.Items',
        c: 'RETRIEVE Items',
        d: 'RETRIEVE * Items',
        correct: 'a'
    },
    {
        question: 'Which SQL statement is used to extract data from a database?',
        a: 'GET',
        b: 'EXTRACT',
        c: 'OPEN',
        d: 'SELECT',
        correct: 'd'
    },
    {
        question: 'Which SQL statement is used to return only different values?',
        a: 'SELECT UNIQUE',
        b: 'SELECT DIFFERENT',
        c: 'SELECT DISTINCT',
        d: 'RETRIEVE UNIQUE',
        correct: 'c'
    },
    {
        question: 'Which SQL statement is used to create a database table called "Answers"?',
        a: 'CREATE DATABASE Answers',
        b: 'CREATE DB Answers',
        c: 'CREATE TABLE Answers',
        d: 'NEW DATABASE TABLE Answers',
        correct: 'c'
    }
]

const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const answerEls = document.querySelectorAll(".answer");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");

let currentQuestionIndex = 0;
let score = 0;

loadQuestion();

function loadQuestion() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuestionIndex];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
}

function getSelectedAnswer() {
    let answer = undefined;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answerEl.checked = false;
        }
    });
}

function createConfetti() {
    const types = ['🎊', '🎉', '🎈', '💠', '🔸'];
    const typeOfConfetti = Math.floor(Math.random() * types.length);
    console.log(typeOfConfetti);

    const confetti = document.createElement('div');
    confetti.innerText = types[typeOfConfetti];
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = Math.random() * 2 + 3 + 's';
    confetti.style.fontSize = Math.random() * 3 + 1 + 'rem';

    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 7000)
}

submitButton.addEventListener("click", () => {
    // check the answer
    const answer = getSelectedAnswer();
    if (answer) {
        // check if correct answer
        if (answer === quizData[currentQuestionIndex].correct) {
            score++;
        }

        // move forward to next question
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            setInterval(createConfetti, 200);
            quiz.innerHTML = `
                    <h2 class="complete">You finished the quiz with a score of ${score} / ${quizData.length} !</h2> 
                    <button onclick="location.reload()">Restart !</button>
                `;
        }
    }
});