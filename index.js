"use strict";
const area = document.querySelector("body"),
  box = document.querySelector(".box"),
  boxEnd = document.createElement("button"),
  circle = document.createElement("div"),
  scoreBoard = document.createElement("span");
let score = 0,
  counter = 600,
  interval,
  circles = document.getElementsByName("circle"); // need live collection to use "if"

box.innerHTML = "Гайда шмаляти русню";

area.append(boxEnd, scoreBoard);

boxEnd.classList.add("box");
boxEnd.innerHTML = "Почати давити русню спочатку";
boxEnd.hidden = true;

scoreBoard.hidden = true;
scoreBoard.append(`пiдстрелено свинособак: ${score}`);

function getRandomNumber(min, max) {
  let number = Math.floor(Math.random() * (max - min + 1));
  return number;
} //get random number

function theGame() {
  box.hidden = true;
  scoreBoard.hidden = false;
  interval = setInterval(createCircle, 600);
} //additional function to change intervals

function createCircle() {
  let newCircle = circle.cloneNode(true);
  area.append(newCircle);
  newCircle.classList.add("circle");
  newCircle.setAttribute("name", "circle");
  newCircle.innerHTML = `<img src="./images/pig.webp" class="img" alt="russian pig" />`;
  newCircle.style.cssText = `
  left: ${getRandomNumber(70, document.documentElement.clientWidth)}px;
  top: ${getRandomNumber(70, document.documentElement.clientHeight)}px;
  background-color: rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(
    0,
    255
  )}, ${getRandomNumber(0, 255)});
  `;

  if (circles.length === 30) {
    clearInterval(interval);

    area.removeEventListener("click", pop);
    alert("Їх тут як лайна! Давай останніх гранатою підірвемо!");

    area.addEventListener("click", popAnimation);
  }
} //create circle

function pop(e) {
  if (e.target.closest(".circle")) {
    e.target.closest(".circle").classList.add("circle__pop");
    let popCircle = () => {
      e.target.closest(".circle").remove();
    };
    setTimeout(popCircle, 200);
    counter -= 3;
    scoreBoard.textContent = `пiдстрелено свинособак: ${++score}`;
    while (counter > 225) {
      clearInterval(interval);
      interval = setInterval(createCircle, counter);
      break;
    }
  }
} //pop circle

function popAllCircles() {
  score += circles.length;
  circles.forEach((e) => e.remove());
  boxEnd.hidden = false;
  scoreBoard.textContent = `ПЕРЕМОГА! Вбито та пiдiрвано свинособак: ${score}!`;
} //pop all circle

function popAnimation() {
  circles = document.querySelectorAll(".circle");
  circles.forEach((e) => e.classList.add("circle__pop-all"));
  setTimeout(popAllCircles, 150);
}

box.addEventListener("click", theGame);
boxEnd.addEventListener("click", () => location.reload());
area.addEventListener("click", pop);
