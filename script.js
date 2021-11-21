let questions = [
  {"category": "Movie",
    "question-list" : [
    {
      "question" : "How many Steven Spielberg films has Tom Hanks starred in?",
      "answer-1" : "Two",
      "answer-2" : "Three",
      "answer-3" : "Four",
      "answer-4" : "Five",
      "right-answer" : 4
    },
    {
      "question" : "How many Academy Awards has Leonardo DiCaprio won?",
      "answer-1" : "One",
      "answer-2" : "Two",
      "answer-3" : "Three",
      "answer-4" : "Four",
      "right-answer" : 1
    },
    {
      "question" : "What year was the first Toy Story film released in cinemas?",
      "answer-1" : "1994",
      "answer-2" : "1995",
      "answer-3" : "1996",
      "answer-4" : "1997",
      "right-answer" : 2
    },
    {
      "question" : "The Magnificent Seven is a remake of which iconic Japanese film?",
      "answer-1" : "No.7 Ramen",
      "answer-2" : "Tokyo Tower",
      "answer-3" : "Seven Samurai",
      "answer-4" : "Sakura Love",
      "right-answer" : 3
    }
  ]},
  {"category": "Sport",
    "question-list": [
    {
      "question" : "How many gold medals has Usain Bolt won?",
      "answer-1" : "6",
      "answer-2" : "7",
      "answer-3" : "8",
      "answer-4" : "9",
      "right-answer" : 3
    },
    {
      "question" : "How long is the total distance of a marathon?",
      "answer-1" : "26.1 miles",
      "answer-2" : "26.2 miles",
      "answer-3" : "26.3 miles",
      "answer-4" : "26.4 miles",
      "right-answer" : 2
    },
    {
      "question" : "What is the only sport to be played on the moon?",
      "answer-1" : "Soccer",
      "answer-2" : "Stoolball",
      "answer-3" : "Cricket",
      "answer-4" : "Golf",
      "right-answer" : 4
    },
    {
      "question" : "What five colours make up the Olympic rings?",
      "answer-1" : "Blue, black, green, red and yellow",
      "answer-2" : "Yellow, orange, blue, red and black",
      "answer-3" : "Red, green, blue, orange and yellow",
      "answer-4" : "Green, blue, orange, blue and black",
      "right-answer" : 1
    }
  ]},
  {"category": "History",
    "question-list": [
    {
      "question" : "In which month of 1914 did the First World War begin?",
      "answer-1" : "July",
      "answer-2" : "August",
      "answer-3" : "June",
      "answer-4" : "May",
      "right-answer" : 2
    },
    {
      "question" : "Which new weapon was introduced in battle in 1916?",
      "answer-1" : "Cannon",
      "answer-2" : "Desert Eagle",
      "answer-3" : "Machine Gun",
      "answer-4" : "Tank",
      "right-answer" : 4
    },
    {
      "question" : "Who was president when the USA entered the first World War?",
      "answer-1" : "Truman",
      "answer-2" : "Harding",
      "answer-3" : "Coolidge",
      "answer-4" : "Hoover",
      "right-answer" : 3
    },
    {
      "question" : "Who was the world’s first woman Prime Minister?",
      "answer-1" : "Sirimavo Bandaranaike",
      "answer-2" : "Margaret Hilda Thatcher",
      "answer-3" : "Yulia Volodymyrivna Tymoshenko",
      "answer-4" : "Angela Dorothea Merkel",
      "right-answer" : 1
    }
  ]}
];

let currentCategory = 0;
let currentQuestionIndex = 0;
let userAnswers = [-1,-1,-1,-1];
let score = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAIL = new Audio('audio/fail.mp3');

/**
 * load qeustion category
 */
function loadStartPage(index) {
  currentCategory = index;
  currentQuestionIndex = 0;
  userAnswers = [-1,-1,-1,-1];
  score = 0;
  let questionCategory = questions[index]["category"];
  resetOptions();
  document.getElementById('question-end').style = "display: none";
  document.getElementById('question-body').style = "display: none";
  document.getElementById('tropy').style = "display: none";
  document.getElementById(`option-${index}`).classList.add('option-active');
  document.getElementById('question-start').style = "";
  document.getElementById('start-btn').style = "";
  document.getElementById('question-category').innerHTML = questionCategory;

}

/**
 * clean unnecesary items
 */
function replay() {
  currentQuestionIndex = 0;
  userAnswers = [-1,-1,-1,-1];
  score = 0;
  document.getElementById('question-end').style = "display: none";
  document.getElementById('question-start').style = "";
  document.getElementById('start-btn').style = "";
  loadStartPage(currentCategory);
}

/**
 * load all the questions according to current category
 */
function showQuestion() {
  resetAnswers();
  let totalQuestions = questions[currentCategory]["question-list"].length;
  let question = questions[currentCategory]["question-list"][currentQuestionIndex];
  document.getElementById('question-start').style = "display: none";
  document.getElementById('start-btn').style = "display: none";
  if (currentQuestionIndex >= totalQuestions) {
    document.getElementById('question-end').style = "";
    document.getElementById('question-body').style = "display: none";

    document.getElementById('correctNumber').innerHTML = score;
    document.getElementById('totoalNumber').innerHTML = totalQuestions;
    if (score >= 3 ) {
      document.getElementById('tropy').style = "";
    }
  } else if (userAnswers[currentQuestionIndex] != -1) {
      document.getElementById('question-text').innerHTML = question["question"];
      document.getElementById('answer-1').innerHTML = question["answer-1"];
      document.getElementById('answer-2').innerHTML = question["answer-2"];
      document.getElementById('answer-3').innerHTML = question["answer-3"];
      document.getElementById('answer-4').innerHTML = question["answer-4"];
      document.getElementById('current-question').innerHTML = currentQuestionIndex + 1;
      document.getElementById('total-questions').innerHTML = totalQuestions;
      judgeResult(question['right-answer'], userAnswers[currentQuestionIndex]);
      disableAnswer();
      document.getElementById('current-question').innerHTML = currentQuestionIndex + 1;
      document.getElementById('total-questions').innerHTML = totalQuestions;
  } else {
    document.getElementById('question-body').style = "";
    document.getElementById('start-btn').style = "display: none";

    document.getElementById('question-text').innerHTML = question["question"];
    document.getElementById('answer-1').innerHTML = question["answer-1"];
    document.getElementById('answer-2').innerHTML = question["answer-2"];
    document.getElementById('answer-3').innerHTML = question["answer-3"];
    document.getElementById('answer-4').innerHTML = question["answer-4"];
    document.getElementById('current-question').innerHTML = currentQuestionIndex + 1;
    document.getElementById('total-questions').innerHTML = totalQuestions;

    enableAnswer();
  }
  if (currentQuestionIndex == (totalQuestions - 1)) {
    document.getElementById('next-question').style = "display: none";
    document.getElementById('submit-button').style = "";
  } else {
    document.getElementById('next-question').style = "";
    document.getElementById('submit-button').style = "display: none";
  }
  if (currentQuestionIndex == 0) {
    document.getElementById('previous-question').style = "visibility:hidden";
  } else {
    document.getElementById('previous-question').style = "";
  }
}

/**
 * record the answer
 * 
 * @param {string} selection   the index of question
 */
function answer(selection) {
  if (userAnswers[currentQuestionIndex] == -1) {
    let question = questions[currentCategory]["question-list"][currentQuestionIndex];
    let currentAnswerNumber = selection;
    let rightAnswerNumber = question['right-answer'];
  
    judgeResult(rightAnswerNumber, currentAnswerNumber);
    userAnswers[currentQuestionIndex] = selection;
    disableAnswer();
  }
}

/**
 * previous button action
 */
function previousQuestion() {
  currentQuestionIndex--;
  showQuestion();
}

/**
 * next button action
 */
function nextQuestion() {
  currentQuestionIndex++;
  showQuestion();
}

/**
 * check if the answet correct or not and show corresponding color
 * 
 * @param {string} rightAnswer index of right answer
 * @param {string} userAnswer user inputed answer
 */
function judgeResult(rightAnswer, userAnswer) {
  if (userAnswer == rightAnswer) {
    if (userAnswers[currentQuestionIndex] == -1) {
      score++;
      AUDIO_SUCCESS.play();
    }
    document.getElementById('answer-' + userAnswer).parentNode.parentNode.classList.add('right-answer-content');
    document.getElementById('answer-' + userAnswer).parentNode.firstElementChild.classList.add('right-answer-label');    
  } else {
    if (userAnswers[currentQuestionIndex] == -1) {
      AUDIO_FAIL.play();
    }
    document.getElementById('answer-' + userAnswer).parentNode.parentNode.classList.add('wrong-answer-content');
    document.getElementById('answer-' + userAnswer).parentNode.firstElementChild.classList.add('wrong-answer-label');
  }
}

/**
 * reset category menu
 */
function resetOptions() {
  document.getElementById('option-0').classList.remove('option-active');
  document.getElementById('option-1').classList.remove('option-active');
  document.getElementById('option-2').classList.remove('option-active');
}

/**
 * rest anwers
 */
function resetAnswers() {
  document.getElementById('answer-click-1').classList.remove('wrong-answer-content');
  document.getElementById('answer-click-1').classList.remove('right-answer-content');
  document.getElementById('answer-1').parentNode.firstElementChild.classList.remove('wrong-answer-label');
  document.getElementById('answer-1').parentNode.firstElementChild.classList.remove('right-answer-label');

  document.getElementById('answer-click-2').classList.remove('wrong-answer-content');
  document.getElementById('answer-click-2').classList.remove('right-answer-content');
  document.getElementById('answer-2').parentNode.firstElementChild.classList.remove('wrong-answer-label');
  document.getElementById('answer-2').parentNode.firstElementChild.classList.remove('right-answer-label');

  document.getElementById('answer-click-3').classList.remove('wrong-answer-content');
  document.getElementById('answer-click-3').classList.remove('right-answer-content');
  document.getElementById('answer-3').parentNode.firstElementChild.classList.remove('wrong-answer-label');
  document.getElementById('answer-3').parentNode.firstElementChild.classList.remove('right-answer-label');

  document.getElementById('answer-click-4').classList.remove('wrong-answer-content');
  document.getElementById('answer-click-4').classList.remove('right-answer-content');
  document.getElementById('answer-4').parentNode.firstElementChild.classList.remove('wrong-answer-label');
  document.getElementById('answer-4').parentNode.firstElementChild.classList.remove('right-answer-label');
}

/**
 * to prevent user second try
 */
function disableAnswer() {
  document.getElementById('answer-click-1').style.pointerEvents = 'none';
  document.getElementById('answer-click-2').style.pointerEvents = 'none';
  document.getElementById('answer-click-3').style.pointerEvents = 'none';
  document.getElementById('answer-click-4').style.pointerEvents = 'none';
}

/**
 * to activate answers
 */
function enableAnswer() {
  document.getElementById('answer-click-1').style.pointerEvents = 'auto';
  document.getElementById('answer-click-2').style.pointerEvents = 'auto';
  document.getElementById('answer-click-3').style.pointerEvents = 'auto';
  document.getElementById('answer-click-4').style.pointerEvents = 'auto';
}