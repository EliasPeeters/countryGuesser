let currentMode = '';
let currentQuestion = '';

function startMode(mode) {
    currentMode = mode;
    document.getElementById('mode-selection').classList.add('hidden');
    document.getElementById('quiz-area').classList.remove('hidden');
    document.getElementById('main-title').classList.add('hidden');
    nextQuestion();
}

function goBack() {
    document.getElementById('quiz-area').classList.add('hidden');
    document.getElementById('mode-selection').classList.remove('hidden');
    document.getElementById('main-title').classList.remove('hidden');
}

function nextQuestion() {
    const questions = Object.keys(data[currentMode]);
    const randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];

    let questionText;
    if (currentMode.includes('ToCode') || currentMode.includes('ToDomain')) {
        questionText = `Welche ${currentMode.includes('Code') ? 'Vorwahl' : 'Domain'} gehört zu ${currentQuestion}?`;
    } else {
        questionText = `Welches Land gehört zu +${currentQuestion}?`;
    }

    document.getElementById('question').innerText = questionText;
    document.getElementById('answer').value = '';
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('submit-button').classList.remove('hidden');
    document.getElementById('next-button').classList.add('hidden');
    document.getElementById('answer').focus();  // Fokus auf das Eingabefeld setzen
}

function submitAnswer() {
    let userAnswer = document.getElementById('answer').value.trim().toLowerCase();
    const correctAnswers = data[currentMode][currentQuestion].map(answer => answer.toLowerCase());
    const correctAnswerWithoutLowerCase = data[currentMode][currentQuestion];

    if (correctAnswers.includes(userAnswer)) {
        document.getElementById('feedback').innerText = 'Richtig!';
        document.getElementById('feedback').style.color = 'green';
    } else {
        document.getElementById('feedback').innerText = `Falsch. Die richtige Antwort ist: ${correctAnswerWithoutLowerCase[0]}`;
        document.getElementById('feedback').style.color = 'red';
    }

    document.getElementById('feedback').classList.remove('hidden');
    document.getElementById('submit-button').classList.add('hidden');
    document.getElementById('next-button').classList.remove('hidden');
    document.getElementById('answer').focus();  // Fokus nach der Antwortprüfung setzen
}