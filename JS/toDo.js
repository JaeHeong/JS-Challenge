const toDo_form = document.querySelector(".js-toDo"),
  toDo_input = toDo_form.querySelector("input"),
  toDo_ul = document.querySelector(".js-toDo_ul"),
  fin_ul = document.querySelector(".js-fin_ul");

const TODO_LS = "todo_list",
  FIN_LS = "finish_list";

let toDo_list = [],
  fin_list = [];

function saveToDo(list) {
  localStorage.setItem(TODO_LS, JSON.stringify(list));
}

function saveFin(list) {
  localStorage.setItem(FIN_LS, JSON.stringify(list));
}

function handleRes(e) {
  e.preventDefault();
  const target = e.target.parentNode;
  const filter_fin = fin_list.filter(function (fin) {
    return fin.id !== parseInt(target.id);
  });
  fin_list = filter_fin;
  saveFin(fin_list);
  target.onclick = function () {
    const timerDelete = function () {
      fin_ul.removeChild(target);
    };
    this.classList.add("fadeOut");
    setTimeout(timerDelete, 300);
    paintToDo(target.innerText.replace("✖♻", ""));
  };
}

function handleFin(e) {
  e.preventDefault();
  const target = e.target.parentNode;
  const filter_toDo = toDo_list.filter(function (toDo) {
    return toDo.id !== parseInt(target.id);
  });
  toDo_list = filter_toDo;
  target.onclick = function () {
    const timerDelete = function () {
      toDo_ul.removeChild(target);
    };
    this.classList.add("fadeOut");
    setTimeout(timerDelete, 300);
    paintFin(target.innerText.replace("✖✔", ""));
  };
  saveToDo(toDo_list);
}

function deleteToDo(e) {
  e.preventDefault();
  const target = e.target.parentNode;
  if (toDo_ul.contains(target)) {
    target.onclick = function () {
      const timerDelete = function () {
        toDo_ul.removeChild(target);
      };
      this.classList.add("fadeOut");
      setTimeout(timerDelete, 300);
    };
    const filter_toDo = toDo_list.filter(function (toDo) {
      return toDo.id !== parseInt(target.id);
    });
    toDo_list = filter_toDo;
    saveToDo(toDo_list);
  }
  if (fin_ul.contains(target)) {
    target.onclick = function () {
      const timerDelete = function () {
        fin_ul.removeChild(target);
      };
      this.classList.add("fadeOut");
      setTimeout(timerDelete, 300);
    };
    const filter_fin = fin_list.filter(function (fin) {
      return fin.id !== parseInt(target.id);
    });
    fin_list = filter_fin;
    saveFin(fin_list);
  }
}

function paintToDo(toDo) {
  const li = document.createElement("li"),
    span = document.createElement("span"),
    delBtn = document.createElement("button"),
    finBtn = document.createElement("button"),
    newID = Math.floor(Math.random() * 1000);
  delBtn.innerText = "✖";
  delBtn.addEventListener("click", deleteToDo);
  finBtn.innerText = "✔";
  finBtn.addEventListener("click", handleFin);
  span.innerText = toDo;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  li.id = newID;
  toDo_ul.appendChild(li);
  const object = {
    text: toDo,
    id: newID,
  };
  toDo_list.push(object);
  saveToDo(toDo_list);
}

function paintFin(toDo) {
  const li = document.createElement("li"),
    span = document.createElement("span"),
    delBtn = document.createElement("button"),
    restoreBtn = document.createElement("button"),
    newID = Math.floor(Math.random() * 1000);
  delBtn.innerText = "✖";
  delBtn.addEventListener("click", deleteToDo);
  restoreBtn.innerText = "♻";
  restoreBtn.addEventListener("click", handleRes);
  span.innerText = toDo;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(restoreBtn);
  li.id = newID;
  fin_ul.appendChild(li);
  const object = {
    text: toDo,
    id: newID,
  };
  fin_list.push(object);
  saveFin(fin_list);
}

function handleToDo(e) {
  e.preventDefault();
  const value = toDo_input.value;
  paintToDo(value);
  toDo_input.value = "";
}

function loadToDo() {
  const currentToDo = localStorage.getItem(TODO_LS);
  if (currentToDo !== null) {
    const parsedToDo = JSON.parse(currentToDo);
    parsedToDo.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function loadFin() {
  const currentFin = localStorage.getItem(FIN_LS);
  if (currentFin !== null) {
    const parsedFin = JSON.parse(currentFin);
    parsedFin.forEach(function (fin) {
      paintFin(fin.text);
    });
  }
}

function init() {
  loadToDo();
  loadFin();
  toDo_form.addEventListener("submit", handleToDo);
}

init();
