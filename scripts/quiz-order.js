"use strict";

const singleQuiz = document.querySelector(".singleQuiz");
const nextBtn = document.querySelector(".nextBtn");

const renderSingleQuiz = (quizList) => {
  const text = quizList[0].content;
  singleQuiz.textContent = text;

  nextBtn.addEventListener("click", () => {
    const slicedArray = quizList.slice(1, quizList.length + 1);
    if (slicedArray.length > 1) {
      renderSingleQuiz(slicedArray);
    } else if (slicedArray.length === 1) {
      renderSingleQuiz(slicedArray);
      nextBtn.textContent = "결과 확인";
      nextBtn.addEventListener("click", () => {
        location.href = "result.html";
      });
    }
  });
};

const quizList = JSON.parse(localStorage.getItem("quizList"));
renderSingleQuiz(quizList);
