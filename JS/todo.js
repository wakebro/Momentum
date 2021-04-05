const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  //스토리지에 저장된 값은 자바스크립트의 데이터를 저장하지 못한다. 오로지 스트링만 저장
  //원하는 데이터를 저장해주기 위해 JSON.stringify()를 사용
}

function deleteToDo(event) {
  //지우려면 해당 이벤트의 li id를 가진 부모를 알아야 한다
  //dir(event.target)으로 확인 = parentNode
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  //웹에서 지워졌지만 array에는 그대로
  const cleanToDos = toDos.filter(function (toDo) {
    //배열 내 각 요소가 filter에 제공된 함수를 호출해 true값만 가지고 새로운 배열을 생성
    return toDo.id !== parseInt(li.id);
    //parseInt_li.id가 string으로 인식되는 것을 int로 변환
  });
  toDos = cleanToDos;
  saveToDos();
}

function paintToDo(Text) {
  const li = document.createElement("li"); //html 기능 사용하기 위해
  const delbtn = document.createElement("button");
  const span = document.createElement("span"); //span : 한줄로 표현하는 인라인 요소
  const newId = toDos.length + 1;
  //배열 toDos안에 들어 있는 값 + 1
  delbtn.innerText = "❌";
  delbtn.addEventListener("click", deleteToDo);
  span.innerText = Text;
  li.appendChild(delbtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li); //생성한 리스트를 html의 ul로 연결(toDoList를 통해)
  const toDoObj = {
    text: Text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; //submit 처럼 paintToDo 호출 후 빈 값으로
}

//로컬스토리지에 저장된 것을 불러옴
function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    //스토리지에 저장된 값이 문자열인데 이를 자바스크립트에 맞추어 주는 기능
    parsedToDos.forEach(function (toDo) {
      //forEach()_array가 가진 함수로 array에 담긴 값들을 한번씩 실행
      //이 경우 함수 함수를 호출하는 게 아닌, 직접만들어서 실행한다
      paintToDo(toDo.text);
      //함수를 만들어 parsedToDos의 text를 실행
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
