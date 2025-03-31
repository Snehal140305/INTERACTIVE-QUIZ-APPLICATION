const questions = [
    { question: "What is the capital of India?", options: ["Mumbai", "Delhi", "Kolkata", "Chennai"], answer: 1 },
    { question: "Who is known as the Father of the Indian Nation?", options: ["Jawaharlal Nehru", "B.R. Ambedkar", "Mahatma Gandhi", "Sardar Patel"], answer: 2 },
    { question: "Which is the national flower of India?", options: ["Rose", "Lotus", "Sunflower", "Marigold"], answer: 1 },
    { question: "Who was the first President of India?", options: ["Dr. Rajendra Prasad", "Dr. S. Radhakrishnan", "Indira Gandhi", "Lal Bahadur Shastri"], answer: 0 },
    { question: "Which festival is known as the 'Festival of Lights'?", options: ["Holi", "Diwali", "Eid", "Christmas"], answer: 1 },
    { question: "Which Indian state is famous for its tea gardens?", options: ["Kerala", "Assam", "Punjab", "Rajasthan"], answer: 1 },
    { question: "What is the national animal of India?", options: ["Tiger", "Lion", "Elephant", "Peacock"], answer: 0 },
    { question: "Which monument is known as the 'Symbol of Love'?", options: ["India Gate", "Qutub Minar", "Taj Mahal", "Red Fort"], answer: 2 },
    { question: "Who wrote the Indian national anthem?", options: ["Rabindranath Tagore", "Bankim Chandra Chatterjee", "Sarojini Naidu", "Subhash Chandra Bose"], answer: 0 },
    { question: "Which river is considered the holiest in India?", options: ["Ganga", "Yamuna", "Brahmaputra", "Godavari"], answer: 0 }
];

let currentQuestion = 0;
let score = 0;
let timer;
const timeLimit = 10;
let timeLeft = timeLimit;

// Elements
const welcomeBox = document.getElementById("welcome-box");
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("time-left");

// Start Test Button Functionality
startBtn.addEventListener("click", () => {
    welcomeBox.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
});

// Load a New Question
function loadQuestion() {
    clearTimeout(timer);
    timeLeft = timeLimit;
    updateTimer();
    timer = setInterval(updateTimer, 1000);

    let q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach((option, index) => {
        let btn = document.createElement("button");
        btn.textContent = option;
        btn.classList.add("option");
        btn.onclick = () => checkAnswer(index);
        optionsEl.appendChild(btn);
    });

    feedbackEl.textContent = "";
    nextBtn.disabled = true;
}

// Check Answer
function checkAnswer(selectedIndex) {
    clearInterval(timer);
    let correctIndex = questions[currentQuestion].answer;
    let options = document.querySelectorAll(".option");

    options.forEach((btn, index) => {
        if (index === correctIndex) btn.classList.add("correct");
        if (index === selectedIndex && index !== correctIndex) btn.classList.add("wrong");
        btn.disabled = true;
    });

    if (selectedIndex === correctIndex) {
        score++;
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
    } else {
        feedbackEl.textContent = "Wrong!";
        feedbackEl.style.color = "red";
    }

    nextBtn.disabled = false; // Enable Next button
}

// Timer Update
function updateTimer() {
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        checkAnswer(-1); // Auto-fail the question if time runs out
    }
    timeLeft--;
}

// Next Button Functionality (Now Works Correctly)
nextBtn.addEventListener("click", () => {
    currentQuestion++; // Move to the next question
    if (currentQuestion < questions.length) {
        loadQuestion(); // Load next question
    } else {
        showResult(); // Show results if all questions are answered
    }
});

// Show Final Score
function showResult() {
    quizContainer.classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreEl.textContent = score;
}

// Restart Quiz
function restartQuiz() {
    location.reload(); // Refresh the page to restart
}
