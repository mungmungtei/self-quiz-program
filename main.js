/**To do list
 * 우선 순서대로 퀴즈풀기 먼저
 * 퀴즈 풀기(순서대로) 버튼 클릭 시, 알람 발생 -> 퀴즈에 말로 대답하면서 무엇을 알고, 무엇을 모르는지 정확히 확인해 보세요!
 * 알람 확인 누르면, 첫번째 퀴즈가 화면에 큰 글씨로 보여짐
 * hhml, css 먼저 만들고 거기에 맞춰서 DOM 추가하기 (엘리쌤처럼)
 * 우선 퀴즈 섹션을 묶을 article? section?
 * 그 안에는 p 태그로 퀴즈 넣고 / 체크박스 밑에 넣고 / 다음 버튼
 * 넘겨질 때 애니메이션 주기
 */

const inputQuiz = document.querySelector(".inputQuiz");
const addQuizBtn = document.querySelector(".addQuizBtn");
const quizAndBtn = document.querySelector(".quizAndBtn");

// 퀴즈 미입력 시, 알람 발생
function alertNoInput() {
  alert("퀴즈를 입력해주세요 ^___^");
  inputQuiz.focus();
}

// 퀴즈 추가 (+삭제 이벤트)
function addQuiz() {
  const content = inputQuiz.value;
  saveQuiz(content); // Local Storage에 퀴즈 저장

  const row = quizAndBtn.insertRow();
  const tdQuiz = document.createElement("td");
  const tdBtn = document.createElement("td");

  tdQuiz.textContent = content;
  tdBtn.innerHTML = `<i class="delete fa-solid fa-trash-can"></i>`;

  // 삭제 버튼 클릭 시, 해당 퀴즈 삭제
  tdBtn.addEventListener("click", () => {
    quizAndBtn.removeChild(row);
  });

  row.append(tdQuiz, tdBtn);
  quizAndBtn.append(row);
  inputQuiz.value = "";
  inputQuiz.focus();
}

// Local Storage에 퀴즈 저장하기
function saveQuiz(content) {
  let quizList;
  quizList = localStorage.getItem("quizList")
    ? JSON.parse(localStorage.getItem("quizList"))
    : [];
  quizList.push(content);
  localStorage.setItem("quizList", JSON.stringify(quizList));
}

// 엔터키 누르면 퀴즈 추가
inputQuiz.addEventListener("keydown", addQuizByEnter);
function addQuizByEnter(event) {
  const content = inputQuiz.value;
  if (event.isComposing) {
    return;
  }
  if (!content && event.key === "Enter") {
    alertNoInput();
  }
  if (content && event.key === "Enter") {
    addQuiz();
  }
}

// 플러스 버튼 클릭 시, 퀴즈 추가
addQuizBtn.addEventListener("click", addQuizByClick);
function addQuizByClick() {
  const content = inputQuiz.value;
  if (!content) {
    alertNoInput();
    return false;
  }
  addQuiz();
}

// // Local Storage에 퀴즈 저장하기
// function saveQuiz(content) {
//   localStorage.setItem("key", content);
// }

// // Local Storage에서 퀴즈 가져오기
// function getSavedQuiz() {
//   const quizJSON = localStorage.getItem("quiz");
//   try {
//     return quizJSON ? JSON.parse(quizJSON) : [];
//   } catch (error) {
//     return [];
//   }
// }

// let quiz = getSavedQuiz();
