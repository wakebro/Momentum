const weather = document.querySelector(".js-weather");
const APIKey = "927c50b6832a9450a932e3c5eee34820";
const COORDS = "coords";

// API 사용하여 지역, 기온 정보 받아오기
function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric
        `
  )
    .then((response) => {
      //.then_함수를 호출하지만 로딩되는 데이터가 완전히 들어온 다음 호출
      return response.json();
      //위 feach를 요청하여 받은 데이터는 자바스크립트 오브젝트는 JSON 데이터 이므로 JSON 데이터를 추출
      //response에는 network 정보만 있기 때문
    })
    .then((json) => {
      const temperature = Math.floor(json.main.temp) + "°C";
      const place = json.name;
      weather.innerText = `${temperature} / ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(coordsObj.latitude, coordsObj.longitude);
}

function handleGeoError() {
  console.log("cant access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

// 로컬스토리지 저장된 데이터 불러오기
function loadedCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}

function init() {
  loadedCoords();
}

init();
