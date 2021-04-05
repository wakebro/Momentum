const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault(); //이벤트(이 경우 submit_제출) 동작을 중단
  const currentValue = input.value; //.js-form에 입력한 값
  paintGreeting(currentValue);
  saveName(currentValue); //입력한 값을 스토리지에 저장
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello, ${text}!`;
}

//LocalStorage에서 값 불러오기
function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    // It is not
    askForName();
  } else {
    // It is
    paintGreeting(currentUser);
  }
}

function init() {
  loadName(); //localStorage 정보 가져오기
}

init();
