"use strict";

const goodList = document.querySelector(".goodList");
const confusedList = document.querySelector(".confusedList");
const badList = document.querySelector(".badList");

const sortQuiz = () => {
  const quizList = JSON.parse(localStorage.getItem("quizList"));
  quizList.find((item) => {
    if (item.status === "circle") {
      const quiz = createResult(item);
      goodList.appendChild(quiz);
    }
    if (item.status === "triangle") {
      const quiz = createResult(item);
      confusedList.appendChild(quiz);
    }
    if (item.status === "letterX") {
      const quiz = createResult(item);
      badList.appendChild(quiz);
    }
  });
};

const createResult = (item) => {
  const p = document.createElement("p");
  p.setAttribute("class", "quiz-list");
  p.textContent = item.content;
  return p;
};

const goToMain = document.querySelector(".goToMain");

goToMain.addEventListener("click", () => {
  location.href = "index.html";
});

sortQuiz();
