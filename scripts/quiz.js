"use strict";

const quizBox = document.querySelector(".quizBox");

const sortQuizList = (quizList, sortBy) => {
  // 입력순 정렬
  if (sortBy === "order") {
    console.log("순서대로");
    renderQuiz(quizList);
  }
  // 랜덤 정렬
  if (sortBy === "random") {
    console.log("랜덤으로");

    quizList.sort((a, b) => {
      if (a.id > b.id) {
        return -1;
      } else if (a.id < b.id) {
        return 1;
      } else {
        return 0;
      }
    });
    renderQuiz(quizList);
  }
};

const renderQuiz = (quizList) => {
  console.log("하나씩 보내줄게");
  const singleQuiz = document.createElement("p");
  singleQuiz.setAttribute("class", "singleQuiz");
  singleQuiz.textContent = quizList[0].content;
  console.log(singleQuiz.innerHTML); // ok
  console.log(singleQuiz); // p 태그
  console.log(quizBox);
};

console.log(quizBox);
