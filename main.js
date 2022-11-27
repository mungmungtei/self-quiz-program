const inputQuiz = document.querySelector(".inputQuiz");
const addQuizBtn = document.querySelector(".addQuizBtn");
const quizAndBtn = document.querySelector(".quizAndBtn");
const deleteAll = document.querySelector(".deleteAll");

document.addEventListener("DOMContentLoaded", getSavedQuiz);
inputQuiz.addEventListener("keydown", addQuizByEnter);
addQuizBtn.addEventListener("click", addQuizByClick);
deleteAll.addEventListener("click", deleteQuizList);

// input 값 미입력 시, 알람 발생
function alertNoInput() {
  alert("퀴즈를 입력해주세요 ^___^");
  inputQuiz.focus();
}

// 사용자 input 값을 퀴즈로 추가하기
function addQuiz(event) {
  event.preventDefault();
  const quiz = inputQuiz.value;
  createQuiz(quiz); // 퀴즈 만들고 브라우저에 보여주기
  saveQuiz(quiz); // Local Storage에 퀴즈 저장하기
}

// 퀴즈 만들고 브라우저에 보여주기
function createQuiz(quiz) {
  const tableQuiz = document.querySelector(".table");
  const row = quizAndBtn.insertRow();
  const tdQuiz = document.createElement("td");
  const tdDelete = document.createElement("td");

  tdQuiz.textContent = quiz;
  tdDelete.innerHTML = `<i class="delete fa-solid fa-trash-can"></i>`;

  row.append(tdQuiz, tdDelete);
  quizAndBtn.append(row);
  inputQuiz.value = "";
  inputQuiz.focus();
  const maxScrollLeft = tableQuiz.scrollHeight - tableQuiz.clientHeight;
  console.log(quizAndBtn.lastChild.getBoundingClientRect().y);
  console.log(maxScrollLeft);
  tableQuiz.scrollTo({
    top: maxScrollLeft,
    behavior: "smooth",
  });
}

// Local Storage에 퀴즈 저장하기
function saveQuiz(quiz) {
  let quizList;
  quizList = localStorage.getItem("quizList")
    ? JSON.parse(localStorage.getItem("quizList"))
    : [];
  quizList.push(quiz);
  localStorage.setItem("quizList", JSON.stringify(quizList));
}

// Local Storage에 저장된 퀴즈 가져오기
function getSavedQuiz() {
  let quizzes = localStorage.getItem("quizList");
  if (quizzes) {
    let quizList = JSON.parse(quizzes);
    quizList.forEach((quiz) => {
      createQuiz(quiz); // Local Storage에 저장된 퀴즈 리스트를 브라우저에 보여주기
    });
  }
}

// 엔터키 누르면 퀴즈 추가
function addQuizByEnter(event) {
  const content = inputQuiz.value;
  if (event.isComposing) {
    return;
  }
  if (!content && event.key === "Enter") {
    alertNoInput();
  }
  if (content && event.key === "Enter") {
    addQuiz(event);
  }
}

// 플러스 버튼 클릭 시, 퀴즈 추가
function addQuizByClick(event) {
  const content = inputQuiz.value;
  if (!content) {
    alertNoInput();
    return false;
  }
  addQuiz(event);
}

// 삭제 버튼 클릭 시, 해당 퀴즈 삭제
// tdDelete.addEventListener("click", () => {
//   quizAndBtn.removeChild(row);
// });

// 퀴즈 전체 삭제 버튼 클릭 시, 퀴즈 전체 삭제
function deleteQuizList() {
  localStorage.removeItem("quizList");
}
