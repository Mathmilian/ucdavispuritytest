// IMPORTANT: Write your own list. Don't copy a site's list verbatim.
const QUESTIONS = [
  "Pulled an all-nighter for an exam",
  "Gone to a campus event alone",
  "Joined a club and actually showed up",
  "Taken a spontaneous day trip",
  "Been to a concert",
  "Ate something questionable at 2am",
  "Missed a bus/train and improvised",
  "Had a roommate story you’ll never forget",
  "Attended a party you weren’t sure you’d stay at",
  "Made a new friend in a random place",
];

const STORAGE_KEY = "ucdavis_purity_state_v1";

const listEl = document.getElementById("list");
const scoreEl = document.getElementById("score");
const metaEl = document.getElementById("meta");

function render() {
  listEl.innerHTML = "";
  QUESTIONS.forEach((q, idx) => {
    const li = document.createElement("li");
    li.className = "item";
    li.innerHTML = `
      <input type="checkbox" id="q${idx}" data-i="${idx}">
      <label for="q${idx}">${q}</label>
    `;
    listEl.appendChild(li);
  });
}

function getBoxes() {
  return Array.from(document.querySelectorAll('input[type="checkbox"][data-i]'));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const state = JSON.parse(raw);
    getBoxes().forEach((b, i) => b.checked = !!state[i]);
  } catch {}
}

function saveState() {
  const state = getBoxes().map(b => b.checked);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function calculate() {
  const checked = getBoxes().filter(b => b.checked).length;
  const score = Math.max(0, 100 - checked);
  scoreEl.textContent = String(score);
  metaEl.textContent = `${checked} checked out of ${QUESTIONS.length}`;
  saveState();
  return { score, checked };
}

function setAll(val) {
  getBoxes().forEach(b => b.checked = val);
  calculate();
}

function resetAll() {
  setAll(false);
  localStorage.removeItem(STORAGE_KEY);
  scoreEl.textContent = "—";
  metaEl.textContent = "";
}

document.getElementById("calc").addEventListener("click", calculate);
document.getElementById("checkAll").addEventListener("click", () => setAll(true));
document.getElementById("uncheckAll").addEventListener("click", () => setAll(false));
document.getElementById("reset").addEventListener("click", resetAll);

document.getElementById("copy").addEventListener("click", async () => {
  const { score, checked } = calculate();
  const text = `I got ${score} (${checked}/${QUESTIONS.length} checked) on the UCDavis Purity Test.`;
  try { await navigator.clipboard.writeText(text); alert("Copied!"); }
  catch { prompt("Copy:", text); }
});

document.addEventListener("change", (e) => {
  if (e.target.matches('input[type="checkbox"][data-i]')) calculate();
});

render();
loadState();
calculate();
