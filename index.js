"use strict";
let area = document.querySelector(".area");
let box = document.querySelector(".box");
let circle = document.createElement("div");
let scoreBoard = document.createElement("span");
let score = 0;
let counter = 600;
let interval;
area.prepend(scoreBoard);
scoreBoard.style.cssText = `
display: none;
position: absolute;
`;
scoreBoard.appendChild(document.createTextNode(`score: ${score}`));
box.addEventListener("click", theGame);
function getRandomNumber(min, max) {
  let number = Math.floor(Math.random() * (max - min + 1));
  return number;
}
function theGame() {
  box.style.display = "none";
  scoreBoard.style.display = "unset";
  interval = setInterval(createCircle, 600);
}
function createCircle() {
  let newCircle = circle.cloneNode(true);
  area.prepend(newCircle);
  newCircle.classList.add("circle");
  newCircle.setAttribute("name", "circle");
  newCircle.style.cssText = `
  left: ${getRandomNumber(50, document.documentElement.clientWidth)}px;
  top: ${getRandomNumber(50, document.documentElement.clientHeight)}px;
  background-color: rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(
    0,
    255
  )}, ${getRandomNumber(0, 255)});
  `;
  let circles = document.getElementsByName("circle");
  if (circles.length === 100) {
    alert(`GAME OVER\nYour score is ${score}`);
    document.querySelectorAll(".circle").forEach((e) => {
      e.remove();
    });
    location.reload();
  }
}
area.addEventListener("click", (e) => {
  if (e.target.classList == "circle") {
    e.target.remove();
    score += 1;
    counter -= 3;
    scoreBoard.textContent = `score: ${score}`;
    while (counter > 250) {
      clearInterval(interval);
      interval = setInterval(createCircle, counter);
      console.log(counter);
      break;
    }
  }
});
