"use strict";

// 다음 버튼 클릭 시, 새로운 퀴즈 보여주기
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

// 답변에 대한 버튼 클릭 시, local storage 업데이트 하기
const btns = document.querySelector(".btns");

const updateStatus = (event) => {
  const btn = event.target;
  const text = singleQuiz.textContent;
  const quizList = JSON.parse(localStorage.getItem("quizList"));
  const quiz = quizList.find((item) => item.content === text);

  if (btn.classList.contains("circle")) {
    quiz.status = "circle";
  }
  if (btn.classList.contains("triangle")) {
    quiz.status = "triangle";
  }
  if (btn.classList.contains("letterX")) {
    quiz.status = "letterX";
  }

  localStorage.setItem("quizList", JSON.stringify(quizList));
};

btns.addEventListener("focus", updateStatus, true);
