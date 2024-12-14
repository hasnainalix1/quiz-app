var questions = [
    {
      number: 1,
      question: "What does JS stand for?",
      correctAnswer: "JavaScript",
      options: [
        "JavaScript",
        "JavaScripting",
        "JScript",
        "JavacScript"
      ]
    },
    {
      number: 2,
      question: "Which of the following is used to declare a variable in JavaScript?",
      correctAnswer: "var",
      options: [
        "var",
        "let",
        "const",
        "all of the above"
      ]
    },
    {
      number: 3,
      question: "Which of the following is the correct syntax for a JavaScript function?",
      correctAnswer: "function myFunction() {}",
      options: [
        "function myFunction() {}",
        "function = myFunction() {}",
        "myFunction() = function {}",
        "function: myFunction() {}"
      ]
    },
    {
      number: 4,
      question: "Which operator is used to assign a value to a variable?",
      correctAnswer: "=",
      options: [
        "=",
        "-",
        "+",
        ":"
      ]
    },
    {
      number: 5,
      question: "Which method is used to find the length of a string in JavaScript?",
      correctAnswer: "length",
      options: [
        "length",
        "size",
        "getLength",
        "count"
      ]
    },
    {
      number: 6,
      question: "How do you write a single-line comment in JavaScript?",
      correctAnswer: "// comment",
      options: [
        "// comment",
        "# comment",
        "/* comment */",
        "&gt;!-- comment --&gt;"
      ]
    },
    {
      number: 7,
      question: "Which method is used to parse a string into an integer in JavaScript?",
      correctAnswer: "parseInt()",
      options: [
        "parseInt()",
        "parseString()",
        "intParse()",
        "parse()"
      ]
    },
    {
      number: 8,
      question: "Which event occurs when the user clicks on an HTML element?",
      correctAnswer: "onclick",
      options: [
        "onmouseover",
        "onclick",
        "onchange",
        "onfocus"
      ]
    },
    {
      number: 9,
      question: "Which of the following will trigger an alert in JavaScript?",
      correctAnswer: "alert('Hello World!')",
      options: [
        "alert('Hello World!')",
        "popUp('Hello World!')",
        "alertBox('Hello World!')",
        "showAlert('Hello World!')"
      ]
    },
    {
      number: 10,
      question: "Which method is used to add an element to the end of an array in JavaScript?",
      correctAnswer: "push()",
      options: [
        "push()",
        "add()",
        "append()",
        "insert()"
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