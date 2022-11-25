/**To do list
 * 삭제 버튼 클릭하면 퀴즈 삭제
 */

const inputQuiz = document.querySelector(".inputQuiz");
const addQuizBtn = document.querySelector(".addQuizBtn");
const quizAndBtn = document.querySelector(".quizAndBtn");

// 퀴즈 미입력 시, 알람 발생
function alertNoInput() {
  alert("퀴즈를 입력해주세요 ^___^");
  inputQuiz.focus();
}

// 퀴즈 추가
function addQuiz() {
  const content = inputQuiz.value;
  const row = quizAndBtn.insertRow();
  const tdQuiz = document.createElement("td");
  const tdBtn = document.createElement("td");
  tdQuiz.textContent = content;
  tdBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  row.append(tdQuiz, tdBtn);
  inputQuiz.value = "";
  inputQuiz.focus();
}

// 엔터키 누르면 퀴즈 추가
inputQuiz.addEventListener("keypress", addQuizByEnter);
function addQuizByEnter(event) {
  const content = inputQuiz.value;
  if (!content && event.key === "Enter") {
    alertNoInput();
  }
  if (content && event.key === "Enter") {
    addQuiz();
  }
}

// 플러스 버튼을 클릭하면 퀴즈 추가
addQuizBtn.addEventListener("click", addQuizByClick);
function addQuizByClick() {
  const content = inputQuiz.value;
  if (!content) {
    alertNoInput();
    return false;
  }
  addQuiz();
}
