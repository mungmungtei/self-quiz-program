"use strict";

const inputQuiz = document.querySelector(".inputQuiz");
const addQuizBtn = document.querySelector(".addQuizBtn");
const quizTable = document.querySelector(".quizTable");
const quizBody = document.querySelector(".quizBody");
const deleteAll = document.querySelector(".deleteAll");
const goQuizOrder = document.querySelector(".order");
const goQuizRandom = document.querySelector(".random");

document.addEventListener("DOMContentLoaded", getSavedQuiz);
inputQuiz.addEventListener("keydown", addQuizByEnter);
addQuizBtn.addEventListener("click", addQuizByClick);
deleteAll.addEventListener("click", deleteAllQuiz);

// Local Storage에 저장된 퀴즈 가져오기
function getSavedQuiz() {
  if (localStorage.getItem("quizList")) {
    let quizList = JSON.parse(localStorage.getItem("quizList"));
    quizList.forEach((item) => {
      createQuiz(item.content);
    });
  }
}

// 퀴즈를 렌더링하기
function onAdd() {
  const content = inputQuiz.value;
  const quizRow = createQuiz(content);
  quizBody.append(quizRow);

  const tableQuiz = document.querySelector(".table");
  const maxScroll = tableQuiz.scrollHeight - tableQuiz.clientHeight;
  tableQuiz.scrollTo({
    top: maxScroll,
    behavior: "smooth",
  });
  inputQuiz.value = "";
  inputQuiz.focus();

  saveQuiz(content);
}

// DOM에 퀴즈 추가하기
function createQuiz(content) {
  const quizRow = quizBody.insertRow();
  const tdQuiz = document.createElement("td");
  const tdDelete = document.createElement("td");

  tdDelete.addEventListener("click", deleteSingleQuiz);

  tdQuiz.textContent = content;
  tdDelete.innerHTML = `<i class="delete fa-solid fa-trash-can"></i>`;
  quizRow.append(tdQuiz, tdDelete);

  return quizRow;
}

// Local Storage에 퀴즈 저장하기
function saveQuiz(content) {
  let quizList;
  quizList = localStorage.getItem("quizList")
    ? JSON.parse(localStorage.getItem("quizList"))
    : [];
  const quizListLength = quizList.length;
  const timeStamp = Date.now(); // 현재 시간
  const id = generateRandomNum(quizListLength); // 여기가 문제 였음!! 배열 길이가 0이라서
  quizList.push({
    id: id,
    content: content,
    createdAt: timeStamp,
    status: "",
  });

  localStorage.setItem("quizList", JSON.stringify(quizList));
}

// Local Storage에 저장할 퀴즈 id에 넣을 랜덤 숫자 생성하기
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

// 엔터키 누르면 퀴즈 추가
function addQuizByEnter(event) {
  const content = inputQuiz.value;
  const quizList = JSON.parse(localStorage.getItem("quizList"));

  // 한글 입력 시, 2번 출력되는 문제 방지
  if (event.isComposing) {
    return;
  }

  if (!content && event.key === "Enter") {
    alertNoInput();
    return;
  }

  if (quizList !== null && quizList.length > 0 && event.key === "Enter") {
    checkDuplicatedInput(quizList, content);
  } else if (event.key === "Enter") {
    onAdd();
  }
}

// 플러스 버튼 클릭 시, 퀴즈 추가
function addQuizByClick() {
  const content = inputQuiz.value;
  const quizList = JSON.parse(localStorage.getItem("quizList"));

  if (!content) {
    alertNoInput();
    return;
  }

  if (quizList !== null && quizList.length > 0) {
    checkDuplicatedInput(quizList, content);
  } else {
    onAdd();
  }
}

// 퀴즈 미입력 시, 알람 발생
function alertNoInput() {
  alert("퀴즈를 입력해주세요 😃");
  inputQuiz.focus();
}

// 퀴즈 입력 시, 중복 확인
const checkDuplicatedInput = (quizList, content) => {
  const result = quizList.some((item) => item.content === content);
  if (result) {
    alert("이미 입력된 퀴즈에요 😅");
    inputQuiz.value = "";
    inputQuiz.focus();
    return;
  }
  onAdd();
};

// 퀴즈 전체 삭제 버튼 클릭 시, 퀴즈 전체 삭제
function deleteAllQuiz() {
  localStorage.removeItem("quizList");
  location.reload();
}

// 삭제 아이콘 클릭 시, 해당 퀴즈 삭제
function deleteSingleQuiz(event) {
  // 1. DOM Tree에서 끊어내기
  const tdDelete = event.target;
  if (tdDelete.classList.contains("delete")) {
    const tdQuiz = tdDelete.parentNode.previousElementSibling; // tdDelete는 <i> -> 부모 <td> -> 형제 <td>
    const quiz = tdQuiz.textContent;
    const quizRow = tdDelete.parentNode.parentNode; // <i> -> <td> -> <tr>
    quizBody.removeChild(quizRow);

    deleteFromStorage(quiz);
  }
}

// 2. Local Storage에서 삭제하기
function deleteFromStorage(quiz) {
  const quizList = JSON.parse(localStorage.getItem("quizList"));
  const index = quizList.findIndex((item) => item.content === quiz); // 처음에 indexOf로 접근해서 계속 오류남!
  quizList.splice(index, 1);
  localStorage.removeItem("quizList");
  localStorage.setItem("quizList", JSON.stringify(quizList));
}

// 퀴즈풀기(입력순) 버튼 클릭 시, 입력 순서대로 퀴즈 풀기
goQuizOrder.addEventListener("click", () => {
  const quizJSON = localStorage.getItem("quizList");
  const quizList = JSON.parse(quizJSON);
  if (quizJSON && quizList.length !== 0) {
    sortQuizList(quizList, "order");
    //location.href = "quiz.html";
  } else {
    alertNoInput();
  }
});

// 퀴즈풀기(무작위) 버튼 클릭 시, 무작위로 퀴즈 풀기
goQuizRandom.addEventListener("click", () => {
  const quizJSON = localStorage.getItem("quizList");
  const quizList = JSON.parse(quizJSON);
  if (quizJSON && quizList.length !== 0) {
    sortQuizList(quizList, "random");
    location.href = "quiz.html";
  } else {
    alertNoInput();
  }
});
