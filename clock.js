const clockContainer = document.querySelector(".js-clock"),
    clockTitle = document.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    //불러온 h1에 innterText를 이용하여 실시간을 덮어쓰기
    //if문의 삼항연산자를 이용하여 출력
    clockTitle.innerText = `${hours<10 ? `0${hours}`:hours
        }:${minutes<10 ? `0${minutes}`:minutes
        }:${seconds<10 ? `0${seconds}`:seconds}`;
}

function init(){
    getTime();
    //1000ms 마다 함수 콜
    setInterval(getTime,1000);
}
init();