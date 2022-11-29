const quizBox = document.querySelector(".quizBox");
const nextBtn = document.querySelector(".nextBtn");
const quizList = JSON.parse(localStorage.getItem("quizList"));

document.addEventListener("DOMContentLoaded", quizInOrder);

function quizInOrder() {
  let i = 0;
  const quiz = document.createElement("p");
  quiz.setAttribute("class", "singleQuiz");

  quiz.textContent = quizList[i];
  quizBox.append(quiz);

  console.log(quiz);

  i++;
  nextBtn.addEventListener("click", (i) => {
    if (i < quizList.length) {
      console.log(i);
      quizInOrder(i);
    }
  });
}

nextBtn.addEventListener("click", () => {
  location.reload();
});

// // 작성 순서대로 퀴즈 보여주기
// function createQuizInOrder(i) {
//   // 퀴즈 담을 p 태그 만들고, class 넣어주기
//   const quiz = document.createElement("p");
//   quiz.setAttribute("class", "singleQuiz");

//   // local storage에서 배열 받아와서 인덱스 순으로 p 태그에 넣어주고, html에 append
//   quiz.textContent = quizList[i];
//   quizBox.append(quiz);

//   console.log(quiz);
//   i++;
//   nextBtn.addEventListener("click", increaseIndex(i));
// }

// function increaseIndex(i) {
//   if (i < quizList.length) {
//     console.log(i);
//   }
//}

// 랜덤으로 퀴즈 보여주기
export function quizRandom() {
  console.log("랜덤으로 보여준다!");
}
