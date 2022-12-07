"use strict";

// 다음 버튼 클릭 시, 새로운 퀴즈 보여주기
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
