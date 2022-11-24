function addQuiz(event) {
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

window.addEventListener("keypress", addQuiz);
