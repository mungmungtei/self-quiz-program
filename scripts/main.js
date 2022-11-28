const inputQuiz = document.querySelector(".inputQuiz");
const addQuizBtn = document.querySelector(".addQuizBtn");
const quizAndBtn = document.querySelector(".quizAndBtn");
const deleteAll = document.querySelector(".deleteAll");

document.addEventListener("DOMContentLoaded", getSavedQuiz);
inputQuiz.addEventListener("keydown", addQuizByEnter);
addQuizBtn.addEventListener("click", addQuizByClick);
deleteAll.addEventListener("click", deleteAllQuiz);

// input 값 미입력 시, 알람 발생
function alertNoInput() {
  alert("퀴즈를 입력해주세요 ^___^");
  inputQuiz.focus();
}

// 사용자 input 값을 퀴즈로 추가하기
function addQuiz(event) {
  event.preventDefault();
  const quiz = inputQuiz.value;
  createQuiz(quiz);
  saveQuiz(quiz);
}

// DOM에 퀴즈 추가하기
function createQuiz(quiz) {
  const tableQuiz = document.querySelector(".table");
  const row = quizAndBtn.insertRow();
  const tdQuiz = document.createElement("td");
  const tdDelete = document.createElement("td");
  tdDelete.addEventListener("click", deleteSingleQuiz);

  tdQuiz.textContent = quiz;
  tdDelete.innerHTML = `<i class="delete fa-solid fa-trash-can"></i>`;
  row.append(tdQuiz, tdDelete);
  quizAndBtn.append(row);
  const maxScroll = tableQuiz.scrollHeight - tableQuiz.clientHeight;
  tableQuiz.scrollTo({
    top: maxScroll,
    behavior: "smooth",
  });
  inputQuiz.value = "";
  inputQuiz.focus();
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
  if (localStorage.getItem("quizList")) {
    let quizList = JSON.parse(localStorage.getItem("quizList"));
    quizList.forEach((quiz) => {
      createQuiz(quiz);
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

// 퀴즈 전체 삭제 버튼 클릭 시, 퀴즈 전체 삭제
function deleteAllQuiz() {
  localStorage.removeItem("quizList");
  location.reload();
}

// 삭제 버튼 클릭 시, 해당 퀴즈 삭제
function deleteSingleQuiz(event) {
  // 1. DOM Tree에서 끊어내기
  const tdDelete = event.target;
  if (tdDelete.classList.contains("delete")) {
    const tdQuiz = tdDelete.parentNode.previousElementSibling; // tdDelete는 <i> -> 부모 <td> -> 형제 <td>
    const quiz = tdQuiz.textContent;
    const row = tdDelete.parentNode.parentNode; // <i> -> <td> -> <tr>

    quizAndBtn.removeChild(row);
    deleteFromStorage(quiz);
  }
}

// 2. Local Storage에서 삭제하기
function deleteFromStorage(quiz) {
  const quizList = JSON.parse(localStorage.getItem("quizList"));
  const index = quizList.indexOf(quiz);

  quizList.splice(index, 1); // splice : 배열 자체를 수정 (slice : 새로운 배열 반환)
  localStorage.removeItem("quizList");
  localStorage.setItem("quizList", JSON.stringify(quizList));
}
