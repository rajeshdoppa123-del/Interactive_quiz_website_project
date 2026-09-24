const qs = [
  {
    c: "Technology",
    q: "Which language styles web pages?",
    a: ["HTML", "CSS", "Python", "SQL"],
    x: 1
  },
  {
    c: "Technology",
    q: "What does AI stand for?",
    a: [
      "Automated Internet",
      "Artificial Intelligence",
      "Advanced Input",
      "Applied Interface"
    ],
    x: 1
  },
  {
    c: "Science",
    q: "Which planet is called the Red Planet?",
    a: ["Earth", "Mars", "Venus", "Saturn"],
    x: 1
  },
  {
    c: "Science",
    q: "What gas do humans need to breathe?",
    a: ["Oxygen", "Helium", "Hydrogen", "Carbon"],
    x: 0
  },
  {
    c: "GK",
    q: "Capital of India?",
    a: ["Mumbai", "New Delhi", "Hyderabad", "Pune"],
    x: 1
  },
  {
    c: "GK",
    q: "How many continents are there?",
    a: ["5", "6", "7", "8"],
    x: 2
  },
  {
    c: "Sports",
    q: "How many players are in a cricket team?",
    a: ["9", "10", "11", "12"],
    x: 2
  },
  {
    c: "Sports",
    q: "Which sport uses a shuttlecock?",
    a: ["Tennis", "Badminton", "Hockey", "Football"],
    x: 1
  }
];

const param = new URLSearchParams(location.search).get("cat");
const data = param ? qs.filter((q) => q.c === param) : qs;

let i = 0;
let score = 0;
let chosen = false;
let time = 30;
let interval;

function load() {
  clearInterval(interval);

  time = 30;
  chosen = false;
  timer.textContent = time;

  const q = data[i];

  cat.textContent = q.c;
  count.textContent = `Question ${i + 1} of ${data.length}`;
  question.textContent = q.q;
  progress.style.width = `${((i + 1) / data.length) * 100}%`;

  scoreEl();

  answers.innerHTML = q.a
    .map(
      (answerText, n) => `
        <div class="col-md-6">
          <button class="answer-btn" onclick="answer(${n})">
            ${String.fromCharCode(65 + n)}. ${answerText}
          </button>
        </div>
      `
    )
    .join("");

  next.disabled = true;

  interval = setInterval(() => {
    time--;
    timer.textContent = time;

    if (time <= 0) {
      clearInterval(interval);
      answer(-1);
    }
  }, 1000);
}

function scoreEl() {
  document.getElementById("score").textContent = `Score: ${score}`;
}

function answer(n) {
  if (chosen) {
    return;
  }

  chosen = true;
  clearInterval(interval);

  const q = data[i];
  const buttons = document.querySelectorAll(".answer-btn");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === q.x) {
      button.classList.add("correct");
    }

    if (index === n && n !== q.x) {
      button.classList.add("wrong");
    }
  });

  if (n === q.x) {
    score++;
  }

  scoreEl();
  next.disabled = false;
}

next.onclick = () => {
  i++;

  if (i < data.length) {
    load();
  } else {
    finish();
  }
};

function finish() {
  document.querySelector(".quiz-wrap").classList.add("d-none");
  finished.classList.remove("d-none");

  const pct = Math.round((score / data.length) * 100);

  result.textContent = `${score} / ${data.length} (${pct}%)`;

  message.textContent =
    pct >= 80
      ? "Excellent performance! 🏆"
      : pct >= 50
        ? "Good job! Keep practicing."
        : "Keep learning and try again!";

  const attempts = JSON.parse(localStorage.getItem("attempts") || "0");
  localStorage.setItem("attempts", ++attempts);
}

load();
