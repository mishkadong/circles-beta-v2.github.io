"use strict";
const area = document.querySelector("body"),
  box = document.querySelector(".box"),
  boxEnd = document.createElement("button"),
  circle = document.createElement("div"),
  scoreBoard = document.createElement("span"),
  mode_1 = document.createElement("button"),
  mode_2 = document.createElement("button");
let score = 0,
  counter = 600,
  counter_2 = 0,
  interval,
  circles = document.getElementsByName("circle"); // need live collection to use "if"

box.innerHTML = "Гайда шмаляти русню...";

area.append(boxEnd, scoreBoard, mode_1, mode_2);

boxEnd.classList.add("box");
boxEnd.innerHTML = "Почати давити русню спочатку";
boxEnd.hidden = true;

scoreBoard.hidden = true;
scoreBoard.append(`пiдстрелено свинособак: ${score}`);

mode_1.innerHTML = `...як Джиммі Рінго`;
mode_1.classList.add("box-2");
mode_1.hidden = true;

mode_2.innerHTML = `...як Рембо`;
mode_2.classList.add("box-3");
mode_2.hidden = true;

function getRandomNumber(min, max) {
  let number = Math.floor(Math.random() * (max - min + 1)) + min;
  return number;
} //get random number

function theGame_1() {
  createCircle();

  area.addEventListener("click", pop_1);

  if (circles.length == 25) {
    clearInterval(interval);

    area.removeEventListener("click", pop_1);
    alert("Їх тут як лайна! Давай останніх гранатою підірвемо!");

    area.addEventListener("click", popAll);
  }
} //start mode_1 game

function theGame_2() {
  mode_1.hidden = true;
  mode_2.hidden = true;
  scoreBoard.hidden = false;
  // for (let i = 0; i < 100; i++) {
  while (circles.length < 100) createCircle();
  // }
  area.addEventListener("click", pop_2);
} //start mode_2 game

function createCircle() {
  const newCircle = circle.cloneNode(true);
  area.append(newCircle);
  newCircle.classList.add("circle");
  newCircle.setAttribute("name", "circle");
  newCircle.innerHTML = `<img src="./images/pig.webp" class="img" alt="russian pig" />`;
  newCircle.style.cssText = `
  left: ${getRandomNumber(0, document.documentElement.clientWidth - 110)}px;
  top: ${getRandomNumber(0, document.documentElement.clientHeight - 110)}px;
  background-color: rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(
    0,
    255
  )}, ${getRandomNumber(0, 255)});
  `;
} //create circle

function pop_1(e) {
  if (e.target.closest(".circle")) {
    e.target.closest(".circle").classList.add("circle__pop");
    setTimeout(() => {
      e.target.closest(".circle").remove();
    }, 200);
    counter -= 6;
    scoreBoard.textContent = `пiдстрелено свинособак: ${++score}`;
    while (counter >= 200) {
      clearInterval(interval);
      interval = setInterval(theGame_1, counter);
      break;
    }
  }
} //pop circle in mode_1

function pop_2(e) {
  if (e.target.closest(".circle")) {
    e.target.closest(".circle").classList.add("circle__pop-all");
    setTimeout(() => {
      e.target.closest(".circle").remove();
    }, 200);
    scoreBoard.textContent = `пiдстрелено свинособак: ${++score}`;
    counter_2++;
  }
  if (counter_2 === 100) {
    boxEnd.hidden = false;
    scoreBoard.textContent = `ПЕРЕМОГА! Вбито та пiдiрвано свинособак: ${score}!`;
  }
} //pop circle in mode_2

function popAll() {
  circles = document.querySelectorAll(".circle");
  score += circles.length;
  circles.forEach((e) => e.classList.add("circle__pop-all"));
  setTimeout(() => circles.forEach((e) => e.remove()), 150);
  // area.addEventListener("click", () => console.log(123));
  boxEnd.hidden = false;
  scoreBoard.textContent = `ПЕРЕМОГА! Вбито та пiдiрвано свинособак: ${score}!`;
} // pop all circles with animation

box.addEventListener("click", () => {
  box.hidden = true;
  mode_1.hidden = false;
  mode_2.hidden = false;
});

mode_1.addEventListener("click", () => {
  mode_1.hidden = true;
  mode_2.hidden = true;
  scoreBoard.hidden = false;
  interval = setInterval(theGame_1, counter);
});

mode_2.addEventListener("click", theGame_2);

boxEnd.addEventListener("click", () => location.reload());

