const user_form = document.querySelector(".js-user"),
  user_input = user_form.querySelector("input"),
  greeting = document.querySelector(".js-greeting"),
  box = document.querySelector(".js-toDo_box");

const USER_LS = "user_name";
const unshowing = "unshowing";

function saveName(name) {
  localStorage.setItem(USER_LS, name);
}

function paintGreeting(name) {
  user_form.classList.add(unshowing);
  greeting.classList.remove(unshowing);
  box.classList.remove(unshowing);
  box.classList.add("toDo_box");
  greeting.innerText = `Hello, ${name}`;
}

function handleUserName(e) {
  e.preventDefault();
  const value = user_input.value;
  saveName(value);
  paintGreeting(value);
}

function askName() {
  box.classList.remove("toDo_box");
  user_form.classList.remove(unshowing);
  greeting.classList.add(unshowing);
  user_form.addEventListener("submit", handleUserName);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
