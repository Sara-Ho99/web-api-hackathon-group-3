let apiLink = "";
let questionListEl = document.querySelector(".trivia-form");
let quesitons = [];
const scoreboardEl = document.querySelector(".scoreboard__container");


//-=-=-=-=-=-=-=-=-API Manager=-=-=-=-=-=-=-=-=-=-=-=

const changeSymbols = (str) => {
  const temp = document.createElement("div");
  temp.innerHTML = str;
  return temp.textContent;
};

async function getQuestions(apiLink) {
  quesitons = [];
  try {
    const response = await axios.get(apiLink);
    data = response.data.results;
    data.forEach((item) => {
      quesitons.push({
        category: item.category,
        question: changeSymbols(item.question) ,
        correctAnswer: item.correct_answer,
        difficulty: item.difficulty,
        type: item.type,
      });
      console.log(typeof(item.question));
    });
    
    displayQuestions();
  } catch (error) {
    console.log(error);
  }
}

const difficultyFormEl = document.querySelector(".difficulty-form");
difficultyFormEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const userDifficulty = event.target.difficulty.value;
  
  try {
    if (userDifficulty === "easy") {
      // 3 quesitons, any category, true or false, easy
      apiLink =
        "https://opentdb.com/api.php?amount=3&difficulty=easy&type=boolean";
    } else if (userDifficulty === "medium") {
      apiLink =
        "https://opentdb.com/api.php?amount=3&difficulty=medium&type=boolean";
    } else if (userDifficulty === "hard") {
      apiLink =
        "https://opentdb.com/api.php?amount=2&difficulty=hard&type=boolean";
    }
  } catch (error) {
    console.log(error);
  }
  getQuestions(apiLink);
  difficultyFormEl.reset();

  scoreboardEl.innerHTML = "";
});

//-=-=-=-=-=-=-=-=-Display Questions=-=-=-=-=-=-=-=-=-=-=-=

function displayQuestions() {
  questionListEl.innerHTML = "";
  quesitons.forEach((item, index) => {
    const articleEl = document.createElement("fieldset");
    articleEl.classList.add("trivia-form__item");
    // question
    const questionEl = document.createElement("h3");
    questionEl.classList.add("trivia-form__question");
    questionEl.innerText = item.question;
    // true option
    const trueLabelEl = document.createElement("label");
    trueLabelEl.classList.add("trivia-form__label");
    trueLabelEl.innerText = "True";

    const trueButtonEl = document.createElement("input");
    trueButtonEl.classList.add("trivia-form__input");
    trueButtonEl.setAttribute("type", "radio"); // attribute format type="radio"
    trueButtonEl.setAttribute("name", `answer${index}`);
    trueButtonEl.setAttribute("value", "True");

    trueLabelEl.appendChild(trueButtonEl);

    const falseLabelEl = document.createElement("label");
    falseLabelEl.classList.add("trivia-form__label");
    falseLabelEl.innerText = "False";

    const falseButtonEl = document.createElement("input");
    falseButtonEl.classList.add("trivia-form__input");
    falseButtonEl.setAttribute("type", "radio");
    falseButtonEl.setAttribute("name", `answer${index}`);
    falseButtonEl.setAttribute("value", "False");
    falseLabelEl.appendChild(falseButtonEl);

    articleEl.appendChild(questionEl);
    articleEl.appendChild(falseLabelEl);
    articleEl.appendChild(trueLabelEl);

    questionListEl.append(articleEl);
  });
  const scoreboardLink = document.createElement("a");
  scoreboardLink.setAttribute("href", "#scoreboard-section");

  const submitButtom = document.createElement("button");
  submitButtom.classList.add("trivia-form__button");
  submitButtom.setAttribute("type", "submit");
  submitButtom.innerText = "Submit";

  scoreboardLink.append(submitButtom);
  questionListEl.append(scoreboardLink);
}

//-=-=-=-=-=-=-=-=-Scoreboard Section=-=-=-=-=-=-=-=-=-=-=-=

const formEl = document.querySelector(".trivia-form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  scoreboardEl.innerHTML = "";
  let score = 0;
  const userAnswersArray = [];
  const correctAnswersArray = [];

  quesitons.forEach((item, index) => {
    const userAnswer = event.target[`answer${index}`].value;
    userAnswersArray.push(userAnswer);
    correctAnswersArray.push(item.correctAnswer);

    if (userAnswer === item.correctAnswer) {
      score++;
    } 
  });

  const gameMessage = document.createElement("h3");
  gameMessage.classList.add("scoreboard__score");
  gameMessage.innerText = `Your Score is: ${score}/${quesitons.length}`;

  const showUserAnswer = document.createElement("h3");
  showUserAnswer.classList.add("scoreboard__user-answer");
  showUserAnswer.innerText = `Your Answers are: ${userAnswersArray}`;

  const showCorrectAnswer = document.createElement("h3");
  showCorrectAnswer.classList.add("scoreboard__correct-answer");
  showCorrectAnswer.innerText = `Correct Answers are: ${correctAnswersArray}`;

  scoreboardEl.append(gameMessage);
  scoreboardEl.append(showUserAnswer);
  scoreboardEl.append(showCorrectAnswer);

  formEl.reset();
});
