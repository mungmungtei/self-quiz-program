"use strict";

const inputQuiz = document.querySelector(".inputQuiz");
const addQuizBtn = document.querySelector(".addQuizBtn");
const quizTable = document.querySelector(".quizTable");
const quizBody = document.querySelector(".quizBody");
const deleteAll = document.querySelector(".deleteAll");
const goQuizInOrder = document.querySelector(".inOrder");
const goQuizRandom = document.querySelector(".random");

document.addEventListener("DOMContentLoaded", getSavedQuiz);
inputQuiz.addEventListener("keydown", addQuizByEnter);
addQuizBtn.addEventListener("click", addQuizByClick);
deleteAll.addEventListener("click", deleteAllQuiz);

// Local Storage에 저장된 퀴즈 가져오기
function getSavedQuiz() {
  // event.preventDefault();
  if (localStorage.getItem("quizList")) {
    let quizList = JSON.parse(localStorage.getItem("quizList"));
    quizList.forEach((quiz) => {
      createQuiz(quiz.content);
    });
  }
}

// input 값 미입력 시, 알람 발생
function alertNoInput() {
  alert("퀴즈를 입력해주세요 😃");
  inputQuiz.focus();
}

// 사용자 input 값 화면에 보여주기
function onAdd() {
  // event.preventDefault();
  const quiz = inputQuiz.value;

  const quizRow = createQuiz(quiz);

  quizBody.append(quizRow);

  const tableQuiz = document.querySelector(".table");
  const maxScroll = tableQuiz.scrollHeight - tableQuiz.clientHeight;
  tableQuiz.scrollTo({
    top: maxScroll,
    behavior: "smooth",
  });
  inputQuiz.value = "";
  inputQuiz.focus();

  // renderQuiz(quiz);
  saveQuiz(quiz);
}

// DOM에 퀴즈 추가하기
function createQuiz(quiz) {
  const quizRow = quizBody.insertRow();
  const tdQuiz = document.createElement("td");
  const tdDelete = document.createElement("td");

  tdDelete.addEventListener("click", deleteSingleQuiz);

  tdQuiz.textContent = quiz;
  tdDelete.innerHTML = `<i class="delete fa-solid fa-trash-can"></i>`;
  quizRow.append(tdQuiz, tdDelete);

  return quizRow;
}

// local storage에 저장할 퀴즈 id에 넣을 랜덤 숫자 생성하기
const generateRandomNum = (quizListLength) => {
  if (quizListLength === 0) {
    quizListLength = 1; // 처음 배열 길이를 1로 설정해서 해결
  }
  const randomNumArray = new Uint16Array(quizListLength);
  window.crypto.getRandomValues(randomNumArray);

  for (const num of randomNumArray) {
    return num;
  }
};

// Local Storage에 퀴즈 저장하기
function saveQuiz(quiz) {
  let quizList;
  quizList = localStorage.getItem("quizList")
    ? JSON.parse(localStorage.getItem("quizList"))
    : [];
  let quizListLength = quizList.length;
  const timeStamp = Date.now(); // 현재 시간
  const id = generateRandomNum(quizListLength); // 여기가 문제 였음!! 배열 길이가 0이라서
  quizList.push({
    id: id,
    content: quiz,
    createdAt: timeStamp,
    status: "",
  });

  localStorage.setItem("quizList", JSON.stringify(quizList));
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
    onAdd();
  }
}

// 플러스 버튼 클릭 시, 퀴즈 추가
function addQuizByClick() {
  const content = inputQuiz.value;

  // 입력값 없을 때
  if (!content) {
    alertNoInput();
    return false;
  }

  onAdd();
}

function checkDuplicated(content) {
  const quizList = JSON.parse(localStorage.getItem("quizList"));
  const duplicatedArr = quizList.filter((item) => item.content === content);
  const isDuplicated = duplicatedArr.length > 1 ? true : false;

  console.log(isDuplicated);
  alert("이미 입력된 퀴즈에요 😅");
  inputQuiz.value = "";
  inputQuiz.focus();

  return isDuplicated;
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

    const quizRow = tdDelete.parentNode.parentNode; // <i> -> <td> -> <tr>
    console.log(quizRow);
    quizBody.removeChild(quizRow);

    deleteFromStorage(quiz);
  }
}

// 2. Local Storage에서 삭제하기
function deleteFromStorage(quiz) {
  const quizList = JSON.parse(localStorage.getItem("quizList"));
  const index = quizList.findIndex((item) => item.content === quiz);
  console.log(index);

  quizList.splice(index, 1); // splice : 배열 자체를 수정 (slice : 새로운 배열 반환)
  localStorage.removeItem("quizList");
  localStorage.setItem("quizList", JSON.stringify(quizList));
}

// 퀴즈풀기(입력순) 버튼 클릭 시, 입력 순서대로 퀴즈 풀기
goQuizInOrder.addEventListener("click", () => {
  const item = localStorage.getItem("quizList");
  if (item && JSON.parse(item).length !== 0) {
    location.href = "quiz.html";
  } else {
    alertNoInput();
  }
});

// 퀴즈풀기(무작위) 버튼 클릭 시, 무작위로 퀴즈 풀기
goQuizRandom.addEventListener("click", () => {
  const item = localStorage.getItem("quizList");
  if (item && JSON.parse(item).length !== 0) {
    location.href = "quiz.html";
  } else {
    alertNoInput();
  }
});
