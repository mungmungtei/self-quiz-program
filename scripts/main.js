"use strict";

const inputQuiz = document.querySelector(".inputQuiz");
const addQuizBtn = document.querySelector(".addQuizBtn");
const quizTable = document.querySelector(".quizTable");
const quizBody = document.querySelector(".quizBody");
const deleteAll = document.querySelector(".deleteAll");
const goQuizOrder = document.querySelector(".order");
const goQuizRandom = document.querySelector(".random");

const getSavedQuiz = () => {
  if (localStorage.getItem("quizList")) {
    let quizList = JSON.parse(localStorage.getItem("quizList"));
    quizList.forEach((item) => {
      createQuiz(item.content);
    });
  }
};

const createQuiz = (content) => {
  const quizRow = quizBody.insertRow();
  const tdQuiz = document.createElement("td");
  const tdDelete = document.createElement("td");

  tdDelete.addEventListener("click", deleteSingleQuiz);

  tdQuiz.textContent = content;
  tdDelete.innerHTML = `<i class="delete fa-solid fa-trash-can"></i>`;
  quizRow.append(tdQuiz, tdDelete);

  return quizRow;
};

const onAdd = () => {
  const content = inputQuiz.value;
  const quizRow = createQuiz(content);
  quizBody.append(quizRow);

  quizRow.scrollIntoView({ block: "center" });
  inputQuiz.value = "";
  inputQuiz.focus();

  saveQuiz(content);
};

const saveQuiz = (content) => {
  let quizList;
  quizList = localStorage.getItem("quizList")
    ? JSON.parse(localStorage.getItem("quizList"))
    : [];
  const quizListLength = quizList.length;
  const timeStamp = Date.now();
  const id = generateRandomNum(quizListLength);

  quizList.push({
    id: id,
    content: content,
    createdAt: timeStamp,
    status: "",
  });

  localStorage.setItem("quizList", JSON.stringify(quizList));
};

const generateRandomNum = (quizListLength) => {
  if (quizListLength === 0) {
    quizListLength = 1;
  }
  const randomNumArray = new Uint8Array(quizListLength);
  window.crypto.getRandomValues(randomNumArray);

  for (const num of randomNumArray) {
    return num;
  }
};

const addQuizByEnter = (event) => {
  const content = inputQuiz.value;
  const quizList = JSON.parse(localStorage.getItem("quizList"));

  // ?????? ?????? ???, 2??? ???????????? ?????? ??????
  if (event.isComposing) {
    return;
  }

  if (!content && event.key === "Enter") {
    alertNoInput();
    return;
  }

  if (quizList !== null && quizList.length > 0 && event.key === "Enter") {
    checkDuplicatedInput(quizList, content);
  } else if (event.key === "Enter") {
    onAdd();
  }
};

const addQuizByClick = () => {
  const content = inputQuiz.value;
  const quizList = JSON.parse(localStorage.getItem("quizList"));

  if (!content) {
    alertNoInput();
    return;
  }

  if (quizList !== null && quizList.length > 0) {
    checkDuplicatedInput(quizList, content);
  } else {
    onAdd();
  }
};

const alertNoInput = () => {
  alert("????????? ?????????????????? ????");
  inputQuiz.focus();
};

const alertOneInput = () => {
  alert("????????? 2??? ?????? ?????????????????? ????");
  inputQuiz.focus();
};

const checkDuplicatedInput = (quizList, content) => {
  const result = quizList.some((item) => item.content === content);
  if (result) {
    alert("?????? ????????? ???????????? ????");
    inputQuiz.value = "";
    inputQuiz.focus();
    return;
  }
  onAdd();
};

const deleteAllQuiz = () => {
  localStorage.removeItem("quizList");
  location.reload();
};

const deleteSingleQuiz = (event) => {
  const tdDelete = event.target;
  if (tdDelete.classList.contains("delete")) {
    const tdQuiz = tdDelete.parentNode.previousElementSibling; // tdDelete??? <i> -> ?????? <td> -> ?????? <td>
    const quiz = tdQuiz.textContent;
    const quizRow = tdDelete.parentNode.parentNode; // <i> -> <td> -> <tr>
    quizBody.removeChild(quizRow);

    deleteFromStorage(quiz);
  }
};

const deleteFromStorage = (quiz) => {
  const quizList = JSON.parse(localStorage.getItem("quizList"));
  const index = quizList.findIndex((item) => item.content === quiz);
  quizList.splice(index, 1);
  localStorage.removeItem("quizList");
  localStorage.setItem("quizList", JSON.stringify(quizList));
};

document.addEventListener("DOMContentLoaded", getSavedQuiz);
inputQuiz.addEventListener("keydown", addQuizByEnter);
addQuizBtn.addEventListener("click", addQuizByClick);
deleteAll.addEventListener("click", deleteAllQuiz);

goQuizOrder.addEventListener("click", () => {
  const quizJSON = localStorage.getItem("quizList");
  const quizList = JSON.parse(quizJSON);
  if (quizJSON && quizList.length > 1) {
    location.href = "quiz-order.html";
  } else if (quizJSON && quizList.length === 1) {
    alertOneInput();
  } else {
    alertNoInput();
  }
});

goQuizRandom.addEventListener("click", () => {
  const quizJSON = localStorage.getItem("quizList");
  const quizList = JSON.parse(quizJSON);

  if (quizJSON && quizList.length > 1) {
    location.href = "quiz-random.html";
  } else if (quizJSON && quizList.length === 1) {
    alertOneInput();
  } else {
    alertNoInput();
  }
});
