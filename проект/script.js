const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const DAY_NAMES = {
  mon: "Понедельник",
  tue: "Вторник",
  wed: "Среда",
  thu: "Четверг",
  fri: "Пятница",
  sat: "Суббота",
  sun: "Воскресенье",
};

// У каждого дня — свои три списка
const schedule = {
  mon: { time: [], hard: [], light: [] },
  tue: { time: [], hard: [], light: [] },
  wed: { time: [], hard: [], light: [] },
  thu: { time: [], hard: [], light: [] },
  fri: { time: [], hard: [], light: [] },
  sat: { time: [], hard: [], light: [] },
  sun: { time: [], hard: [], light: [] },
};
const STORAGE_KEY = "week-planner";

// Загружаем сохранённое, если оно есть
const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
  const parsed = JSON.parse(saved);
  // Подстраховка: если в хранилище нет какого-то дня, берём пустой из schedule
  DAYS.forEach((day) => {
    if (parsed[day]) schedule[day] = parsed[day];
  });
}
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
}
let currentDay = "mon";

const timeList = document.getElementById("timeList");
const hardList = document.getElementById("hardList");
const taskList = document.getElementById("taskList");
const addForm = document.getElementById("addForm");
const taskInput = document.getElementById("task-input");

function renderList(listEl, items) {
  listEl.innerHTML = ""; // очищаем перед перерисовкой — иначе старое остаётся
  items.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    listEl.appendChild(li);
  });
}

function renderDay() {
  const data = schedule[currentDay];
  renderList(timeList, data.time);
  renderList(hardList, data.hard);
  renderList(taskList, data.light);
}

function selectDay(day) {
  currentDay = day;

  document.querySelectorAll(".weekday").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.day === day);
  });
  document.querySelectorAll(".circle").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.day === day);
  });

  renderDay();
}

document.querySelectorAll(".weekday").forEach((btn) =>
  btn.addEventListener("click", () => selectDay(btn.dataset.day)),
);

document.querySelectorAll(".circle").forEach((btn) =>
  btn.addEventListener("click", () => selectDay(btn.dataset.day)),
);

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;

  // Задача попадает в массив именно выбранного дня
  schedule[currentDay].light.push(text);
  
  taskInput.value = "";
  save(); 
  renderDay();
});

selectDay("mon");
