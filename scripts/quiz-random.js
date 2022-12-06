"use strict";

const singleQuiz = document.querySelector(".singleQuiz");
const nextBtn = document.querySelector(".nextBtn");

const sortByRandom = () => {
  const quizList = JSON.parse(localStorage.getItem("quizList"));

  quizList.sort((a, b) => {
    if (a.id > b.id) {
      return -1;
    } else if (a.id < b.id) {
      return 1;
    } else {
      return 0;
    }
  });

  return quizList;
};

const renderSingleQuiz = (randomArray) => {
  const text = randomArray[0].content;
  singleQuiz.textContent = text;

  nextBtn.addEventListener("click", () => {
    const slicedArray = randomArray.slice(1, randomArray.length + 1);
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

const randomArray = sortByRandom();
renderSingleQuiz(randomArray);
