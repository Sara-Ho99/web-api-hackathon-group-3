const quesitons = [];

async function getQuestions() {
  try {
    const response = await axios.get(
      "https://opentdb.com/api.php?amount=3&category=17&difficulty=easy&type=boolean"
    );
    data = response.data.results;
    data.forEach((item) => {
      quesitons.push({
        category: item.category,
        question: item.question,
        correctAnswer: item.correct_answer,
        difficulty: item.difficulty,
        type: item.type,
      });
    });
    /* console.log(quesitons); */
    displayQuestions();
  } catch (error) {
    console.log(error);
  }
}

getQuestions();

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const questionListEl = document.querySelector(".trivia-form");

function displayQuestions() {
  questionListEl.innerHTML = "";

  quesitons.forEach((item, index) => {
    const articleEl = document.createElement("fieldset");
    articleEl.classList.add("quiz-item");
    // question
    const questionEl = document.createElement("h3");
    questionEl.innerText = item.question;
    // true option
    const trueLabelEl = document.createElement("label");
    trueLabelEl.innerText = "True";
    const trueButtonEl = document.createElement("input");
    trueButtonEl.setAttribute("type", "radio"); // Set type="radio"
    trueButtonEl.setAttribute("name", `answer${index}`); // Set name="answer" (grouping radio buttons)
    trueButtonEl.setAttribute("value", "True"); // Set value="true"
    //trueButtonEl.required = true;
    trueLabelEl.appendChild(trueButtonEl);

    const falseLabelEl = document.createElement("label");
    falseLabelEl.innerText = "False";
    const falseButtonEl = document.createElement("input");
    falseButtonEl.setAttribute("type", "radio");
    falseButtonEl.setAttribute("name", `answer${index}`);
    falseButtonEl.setAttribute("value", "False");
    falseLabelEl.appendChild(falseButtonEl);

    articleEl.appendChild(questionEl);
    articleEl.appendChild(falseLabelEl);
    articleEl.appendChild(trueLabelEl);

    questionListEl.append(articleEl);
  });
  const submitButtom = document.createElement("button");
  submitButtom.setAttribute("type", "submit");
  submitButtom.innerText = "submit";
  questionListEl.append(submitButtom);
}

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const formEl = document.querySelector(".trivia-form");
const scoreboardEl = document.querySelector(".scoreboard");

async function submitHandler(event) {
  /* const newJoke = {
    question: event.target.question.value,
    answer: event.target.answer.value,
  }; */
  /* await axios.post(
    "http://developerjokes.herokuapp.com/jokes?api_key=neocat",
    newJoke
  ); */
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  let score = 0;
  //   console.log(event.target);
  //   console.log(event.target.answer0.value);
  //   const userAnswer = event.target.answer0.value;

  quesitons.forEach((item, index) => {
    const userAnswer = event.target[`answer${index}`].value;
    console.log(userAnswer);
    console.log(item.correctAnswer);

    if (userAnswer === item.correctAnswer) {
      console.log(`correct question: ${index}`);
      score++;
    } else {
      console.log(`wrong answer: ${index}`);
    }
  });

  const gameMessage = document.createElement("h3");
  gameMessage.innerText = `Your score is: ${score}/${quesitons.length}`;
  scoreboardEl.append(gameMessage);
});

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
