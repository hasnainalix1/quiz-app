var questions = [
  {
    number: 1,
    question: "What does HTML stand for?",
    correctAnswer: "Hyper Text Markup Language",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper text my link"
    ]
  },
  {
    number: 2,
    question: " What does the &lt;title&gt; tag do in HTML?",
    correctAnswer: "Defines the title of the web page",
    options: [
      "Defines the title of the web page",
      "Defines the content of the webpage",
      "Creates a link to the page",
      "Creates a header for the page"
    ]
  },
  {
    number: 3,
    question: "Which tag is used to create a hyperlink in HTML?",
    correctAnswer: "<a>",
    options: [
      "&lt;link&gt;",
      "&lt;href&gt;",
      "&lt;url&gt;",
      "&lt;a&gt;"
    ]
  },
  {
    number: 4,
    question: "Which attribute is used to specify the destination of a hyperlink?",
    correctAnswer: "href",
    options: [
      "src",
      "link",
      "href",
      "target"
    ]
  },
  {
    number: 5,
    question: "What does the &lt;img&gt; tag do in HTML?",
    correctAnswer: "Embeds an image in the webpage",
    options: [
      "Defines an image",
      "Embeds an image in the webpage",
      "Links to an image",
      "Displays text"
    ]
  },
  {
    number: 6,
    question: "Which tag is used for creating a table in HTML?",
    correctAnswer: "<table>",
    options: [
      "&lt;table&gt;",
      "&lt;div&gt;",
      "&lt;tr&gt;",
      "&lt;list&gt;"
    ]
  },
  {
    number: 7,
    question: "How do you make a list in HTML?",
    correctAnswer: "Using <ul> for an unordered list and <ol> for an ordered list",
    options: [
      "&lt;list&gt; tag",
      "Using &lt;ul&gt; for an unordered list and &lt;ol&gt; for an ordered list",
      "Using &lt;li&gt; tag only",
      "Using &lt;dl&gt; tag"
    ]
  },
  {
    number: 8,
    question: "What is the correct HTML tag for inserting a line break?",
    correctAnswer: "<br>",
    options: [
      "&lt;break&gt;",
      "&lt;lb&gt;",
      "&lt;br&gt;",
      "&lt;line&gt;"
    ]
  },
  {
    number: 9,
    question: "Which HTML tag is used to define a paragraph?",
    correctAnswer: "<p>",
    options: [
      "&lt;paragraph&gt;",
      "&lt;para&gt;",
      "&lt;p&gt;",
      "&lt;text&gt;"
    ]
  },
  {
    number: 10,
    question: "What is the purpose of the &lt;head&gt; tag in HTML?",
    correctAnswer: "Contains metadata about the HTML document",
    options: [
      "Contains the main content",
      "Contains metadata about the HTML document",
      "Contains text for the web page",
      "Defines the structure of the webpage"
    ]
  }
];


let mainWrapper = document.querySelector(".main-wrapper");
let container = mainWrapper.querySelector(".container");
let startBtn = mainWrapper.querySelector(".start-quiz-btn");
let quesBox = container.querySelector(".ques-box");
let optionBox = container.querySelector(".option-box");
let nextQuesbtn = container.querySelector(".next-ques-btn");
let noOfQues = container.querySelector(".quiz-top-bar .no-of-ques");
let timertxt = container.querySelector(".quiz-top-bar .clock span");
let timerbox = container.querySelector(".quiz-top-bar .clock");

let quesIndex = 1;
let quescount = 0;

let correcticon = `<div class="icon correct-icon"><i class="fa-solid fa-check"></i></div>`;
let incorrect = `<div class="icon wrong-icon"><i class="fa-solid fa-xmark"></i></div>`;

let userAnswers = [];

startBtn.addEventListener("click", function() {
  startBtn.style.display = "none";
  container.style.display = "block";

  noOfQuestion();
  startQuiz();
  startTimer(100);
});

function nextQuestion() {
  let nextQuesbtn = container.querySelector(".next-ques-btn");

  if (quesIndex < questions.length) {
    quesIndex++; 
    startQuiz(); 
    nextQuesbtn.style.pointerEvents = "none"; 
  } else {
    showFinalResult();
  }
}

function startQuiz() {
  let ques =  `<h3>${questions[quesIndex - 1].number}. ${questions[quesIndex - 1].question}</h3>`;

  let quizOption = 
                          `<div class="option-box">
                              <div class="option">
                                  <div class="option-lett">A</div>
                                  <span class="option-txt">${questions[quesIndex - 1].options[0]} </span>
                              </div>
                              <div class="option">
                                  <div class="option-lett">B</div>
                                  <span class="option-txt">${questions[quesIndex - 1].options[1]}</span>
                              </div>
                              <div class="option">
                                  <div class="option-lett">C</div>
                                  <span class="option-txt">${questions[quesIndex - 1].options[2]}</span>
                              </div>
                              <div class="option">
                                  <div class="option-lett">D</div>
                                  <span class="option-txt">${questions[quesIndex - 1].options[3]}</span>
                              </div>`;

  quesBox.innerHTML = ques; 
  optionBox.innerHTML = quizOption;

  const option = optionBox.querySelectorAll(".option");

  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", 'optionSelected(this)');
  }

  if (quesIndex === questions.length) {
    nextQuesbtn.textContent = "Submit";
  } else {
    nextQuesbtn.textContent = "Next";
  }
}

function optionSelected(userAns) {
  const userAnswer = userAns.querySelector("span").textContent.trim().toLowerCase();
  const correctAns = questions[quesIndex - 1].correctAnswer.trim().toLowerCase();

  userAnswers[quesIndex - 1] = userAnswer;

  if (userAnswer === correctAns) {
    userAns.classList.add("correct");
    userAns.insertAdjacentHTML("beforeend", correcticon);
  } else {
    userAns.classList.add("incorrect");
    userAns.insertAdjacentHTML("beforeend", incorrect);
  }

  let AllOptionTxt = optionBox.querySelectorAll("div span"); 
  for (let i = 0; i < AllOptionTxt.length; i++) {
    if (AllOptionTxt[i].textContent.trim().toLowerCase() === correctAns.trim().toLowerCase()) {
      AllOptionTxt[i].parentElement.classList.add("correct"); 
      AllOptionTxt[i].parentElement.insertAdjacentHTML("beforeend", correcticon); 
    }
  }

  let AllOption = optionBox.querySelectorAll(".option").length;
  for (let i = 0; i < AllOption; i++) {
    optionBox.querySelectorAll(".option")[i].classList.add("disabled");
  }

  nextQuesbtn.style.pointerEvents = "auto";
}

nextQuesbtn.addEventListener("click", function() {
  if (quesIndex < questions.length) {
    nextQuestion();
  } else {
    showFinalResult();
  }
});

function noOfQuestion() {
  noOfQues.innerHTML = `${questions[quesIndex - 1].number} of ${questions.length} Question`;
}

function startTimer(time) {
  let count = setInterval(function() {
    time--;
    timertxt.innerHTML = time;
    timerbox.classList.add("green-timer-box");

    if (time < 20) {
      timertxt.innerHTML = "0" + time;
      timerbox.classList.add("red-timer-box");
    }

    if (time == 0) {
      let AllOptionTxt = optionBox.querySelectorAll("div span"); 
      const correctAns = questions[quesIndex - 1].correctAnswer.trim().toLowerCase();
      
      for (let i = 0; i < AllOptionTxt.length; i++) {
        const optionText = AllOptionTxt[i].textContent.trim().toLowerCase();
        
        if (optionText === correctAns) {
          AllOptionTxt[i].parentElement.classList.add("correct"); 
          AllOptionTxt[i].parentElement.insertAdjacentHTML("beforeend", correcticon); 
        }
      }

      time = 70;
      timertxt.innerHTML = time;

      setTimeout(function() {
        nextQuestion();  
      }, 1000); 
    }
  }, 1000);
}

function showFinalResult() {
  let score = 0;

  userAnswers.forEach((answer, index) => {
    const correctAns = questions[index].correctAnswer.trim().toLowerCase();
    if (answer === correctAns) {
      score++;
    }
  });

  Swal.fire({
    title: "Good job!",
    text: `Quiz Finished! Your score is: ${score} out of ${questions.length}`,
    icon: "success"
  }).then((result) => {
    if (result.isConfirmed) {
      
      window.location.href = "main.html";  
    }
  });

  startBtn.style.display = "block";
  container.style.display = "none";
}