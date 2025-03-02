const AllQuestions = [
    {
        question: "When should you take your Paracetamol?",
        answers: [
            { text: "Before Eating", correct: false},
            { text: "After Eating", correct: false},
            { text: "While Eating", correct: false},
            { text: "When have symtoms", correct: true},
        ]
    },
    {
        question: "How many paracetamol tablets should you not take in 1 day?",
        answers: [
            { text: "six (3000 mg)", correct: false},
            { text: "seven (3500 mg)", correct: false},
            { text: "eight (4000 mg)", correct: true},
            { text: "nine (4500 mg)", correct: false},
        ] 
    },
    {
        question: "How many paracetamol tablets should you take at a time?",
        answers: [
            { text: "two", correct: true},
            { text: "five", correct: false},
            { text: "one", correct: false},
            { text: "three", correct: false},
        ] 
    },
    {
        question: "Do you think it is important to take certain medications with food and others on an empty stomach?",
        answers: [
            { text: "Yes, it can affect how the medicine works.", correct: true},
            { text: "I'm not sure, I take them as I feel is best.", correct: false},
            { text: "No, I don’t think it matters.", correct: false},
            { text: "I don't think it's important.", correct: false},
        ] 
    },
    {
        question: "Can taking certain medications with drinks like coffee or alcohol affect how the medicine is absorbed by your body?",
        answers: [
            { text: "No, it doesn’t matter what I drink.", correct: false},
            { text: "It might have a small effect.", correct: false},
            { text: "I’m not sure, I usually drink coffee with my medication.", correct: false},
            { text: "Yes, it can reduce the effectiveness.", correct: true},
        ] 
    },
    {
        question: "Does taking medicine at the wrong time, like after the recommended time, affect how well it works?",
        answers: [
            { text: "It doesn't really matter when you take it.", correct: false},
            { text: "Taking medicine late may reduce its effectiveness.", correct: true},
            { text: "The timing is only important for specific medicines.", correct: false},
            { text: "Delaying medicine can cause side effects.", correct: false},
        ] 
    },
    {
        question: "Can continuous use of certain medications lead to dependence or addiction?",
        answers: [
            { text: "Medications usually don't lead to addiction.", correct: false},
            { text: "Some medications can cause dependency if used too long.", correct: true},
            { text: "Dependency happens only with strong painkillers.", correct: false},
            { text: "Addiction is rare, even with long-term medication use.", correct: false},
        ] 
    },
    {
        question: "Should you avoid taking expired medication?",
        answers: [
            { text: "Expired medication still works as well as fresh ones.", correct: false},
            { text: "Only some medicines lose effectiveness after expiration.", correct: false},
            { text: "Expired medicine is still safe if it looks normal.", correct: false},
            { text: "Expired medicine may not work or could be harmful.", correct: true},
        ] 
    },
];

let questions = [];

function getRandomQuestions(num){
    const shuffled = AllQuestions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    questions = getRandomQuestions(3);
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;        
    }else{
        selectedBtn.classList.add("incorrect");       
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    // console.log("Answer selected, showing Next button...");
    nextButton.style.display = "block";
}

function showScore(){
    resetState();

    saveLatestScore(score);

    let latestScore = getLatestScore();

    questionElement.innerHTML = `You scored ${latestScore} out of ${questions.length}!`;;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

function saveLatestScore(score) {
    localStorage.setItem("latestScore", score);
}

function getLatestScore() {
    return localStorage.getItem("latestScore") || 0;
}

startQuiz();

console.log("Latest Score:", getLatestScore());



