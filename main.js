// TODO: 이벤트 위임 공부하고 리팩토링 할 것!!

// 엔터 키 누를 시, input 값 브라우저에 보여주기
function addQuizByEnter(event) {
  const inputQuiz = document.querySelector(".inputQuiz");
  const quizContent = inputQuiz.value;
  const quiz = document.createElement("h2");
  quiz.setAttribute("class", "quiz");
  if (event.key == "Enter" && quizContent) {
    quiz.textContent = quizContent;
    document.querySelector(".quizList").appendChild(quiz);
    window.scrollTo(0, document.body.scrollHeight); // 콘텐츠가 길이에 맞춰 아래로 스크롤되도록
    console.log(quizContent); // 나중에 지우기
    inputQuiz.value = null; // input 입력 완료 시, 값 초기화시키도록
  }
}
document.addEventListener("keypress", addQuizByEnter);

// 플러스 버튼 클릭 시, input 값 브라우저에 보여주기
function addQuizByClick() {
  const inputQuiz = document.querySelector(".inputQuiz");
  const quizContent = inputQuiz.value;
  const quiz = document.createElement("h2");
  quiz.setAttribute("class", "quiz");
  if (quizContent) {
    quiz.textContent = quizContent;
    document.querySelector(".quizList").appendChild(quiz);
    window.scrollTo(0, document.body.scrollHeight);
    console.log(quizContent);
    inputQuiz.value = null;
  }
}
const addQuizBtn = document.querySelector(".addQuizBtn");
addQuizBtn.addEventListener("click", addQuizByClick);
