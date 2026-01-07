// Replace these with *your* UC Davis questions.
// (I’m keeping these generic as an example starter.)
const QUESTIONS = [
  "Went to a campus event you didn’t have to attend?",
  "Pulled an all-nighter for a deadline?",
  "Missed a class because you overslept?",
  "Got lost trying to find a lecture hall?",
  "Spent way too much on boba or coffee?",
  "Made a friend in a random line (food, club, etc.)?",
  "Changed your major (or seriously considered it)?",
  "Cried or stress-laughed during finals week?",
  "Been to a party you didn’t really want to go to?",
  "Had a ‘this is so college’ moment?"
];

const els = {
  list: document.getElementById("questionList"),
  checkedCount: document.getElementById("checkedCount"),
  totalCount: document.getElementById("totalCount"),
  btnScore: document.getElementById("btnScore"),
  btnCopyLink: document.getElementById("btnCopyLink"),
  btnCheckAll: document.getElementById("btnCheckAll"),
  btnUncheckAll: document.getElementById("btnUncheckAll"),
  result: document.getElementById("result"),
  scoreValue: document.getElementById("scoreValue"),
};

function renderQuestions() {
  els.totalCount.textContent = String(QUESTIONS.length);

  const frag = document.createDocumentFragment();
  QUESTIONS.forEach((text, idx) => {
    const li = document.createElement("li");
    const row = document.createElement("label");
    row.className = "qrow";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.name = `q${idx}`;
    cb.addEventListener("change", updateCount);

    const span = document.createElement("span");
    span.textContent = text;

    row.appendChild(cb);
    row.appendChild(span);
    li.appendChild(row);
    frag.appendChild(li);
  });

  els.list.appendChild(frag);
  updateCount();
}

function getChecked() {
  return [...els.list.querySelectorAll("input[type='checkbox']")]
    .filter(cb => cb.checked).length;
}

function updateCount() {
  els.checkedCount.textContent = String(getChecked());
}

function calcScore() {
  // Classic scoring style: 100 - checked (or use QUESTIONS.length - checked)
  const checked = getChecked();
  const score = Math.max(0, 100 - checked);
  return score;
}

function showScore() {
  const score = calcScore();
  els.scoreValue.textContent = String(score);
  els.result.hidden = false;

  // Put score in URL so you can share
  const url = new URL(window.location.href);
  url.searchParams.set("score", String(score));
  window.history.replaceState({}, "", url);
}

async function copyResultLink() {
  // Copies current URL (which includes ?score=)
  const url = window.location.href;
  try {
    await navigator.clipboard.writeText(url);
    els.btnCopyLink.textContent = "Copied!";
    setTimeout(() => (els.btnCopyLink.textContent = "Copy result link"), 1200);
  } catch {
    // Fallback
    prompt("Copy this link:", url);
  }
}

function setAll(checked) {
  els.list.querySelectorAll("input[type='checkbox']").forEach(cb => {
    cb.checked = checked;
  });
  updateCount();
}

function loadScoreFromUrl() {
  const url = new URL(window.location.href);
  const score = url.searchParams.get("score");
  if (score !== null) {
    els.scoreValue.textContent = score;
    els.result.hidden = false;
  }
}

els.btnScore.addEventListener("click", showScore);
els.btnCopyLink.addEventListener("click", copyResultLink);
els.btnCheckAll.addEventListener("click", () => setAll(true));
els.btnUncheckAll.addEventListener("click", () => setAll(false));

renderQuestions();
loadScoreFromUrl();
