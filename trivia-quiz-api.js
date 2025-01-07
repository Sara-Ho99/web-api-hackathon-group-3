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

  quesitons.forEach((item) => {
    const articleEl = document.createElement("article");
    articleEl.classList.add("quiz-item");
    // question
    const questionEl = document.createElement("h3");
    questionEl.innerText = item.question;
    // true option
    const trueLabelEl = document.createElement("label");
    trueLabelEl.innerText = "True";
    const trueButtonEl = document.createElement("input");
    trueButtonEl.setAttribute("type", "radio"); // Set type="radio"
    trueButtonEl.setAttribute("name", "answerTrue"); // Set name="answer" (grouping radio buttons)
    trueButtonEl.setAttribute("value", "true"); // Set value="true"
    // trueButtonEl.required = true;
    trueLabelEl.appendChild(trueButtonEl);

    const falseLabelEl = document.createElement("label");
    falseLabelEl.innerText = "False";
    const falseButtonEl = document.createElement("input");
    falseButtonEl.setAttribute("type", "radio");
    falseButtonEl.setAttribute("name", "answerFalse");
    falseButtonEl.setAttribute("value", "false");
    falseLabelEl.appendChild(falseButtonEl);

    articleEl.appendChild(questionEl);
    articleEl.appendChild(falseLabelEl);
    articleEl.appendChild(trueLabelEl);

    questionListEl.append(articleEl);
  });
  const submitButtom = document.createElement("button");
  falseButtonEl.setAttribute("type", "submit");
  submitButtom.innerText = "submit";
  questionListEl.append(submitButtom);
}

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

const formEl = document.querySelector(".trivia-form");

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
  console.log(event.target);
  const userAnswer = event.target.answerTrue.value;
});
