document.querySelectorAll(".cps-area").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";

    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

let miliSec = document.querySelector(".miliSec");
let sec = document.querySelector(".sec");
let cpsArea = document.querySelector(".cps-area");
let btns = document.querySelectorAll(".btn");
let count = document.querySelector(".count");
let text = document.querySelector(".cps-text");
let startTime;
let counterTimer = [5000, 10000, 15000, 30000, 60000];
let miliSecArr = ["00", "00", "00", "00", "00"];
let secArr = ["05", "10", "15", "30", "60"];
let minArr = ["00", "00", "00", "00", "00"];
let idx = 0;
let counter = 0;
let timerStarted = true;
let cps;
let a = 0;
let tryAgain = document.querySelectorAll(".sc-btn");
let rankImg = document.querySelector("#img");
let rank = document.querySelector(".rank-name");
let finalCPS = document.querySelectorAll(".line-2");
let finalCPSDesc = document.querySelectorAll(".line-3");
let scoreCard = document.querySelector(".score-card");
let rankQuote = document.querySelector(".quote");

function startTimer() {
  startTime = setInterval(() => {
    miliSec.textContent -= 1;
    if (miliSec.textContent < 10) {
      miliSec.textContent = String(miliSec.textContent).padStart(2, "0");
    }
    if (sec.textContent < 10) {
      sec.textContent = String(sec.textContent).padStart(2, "0");
    }
    if (miliSec.textContent < 0) {
      sec.textContent -= 1;
      miliSec.textContent = 99;
    }
    if (sec.textContent == 0 && miliSec.textContent == 0) {
      stopTimer();
      cps = counter / Number(secArr[a]);
      uiUpdate();
      resetCounter();
      resetTimer();
    }
  }, 10);
}

tryAgain.forEach((el) => {
  el.addEventListener("click", () => {
    scoreCard.style.display = "none";
    rankImg.style.height = "180px";
    cps = 0;
  });
});

function uiUpdate() {
  finalCPS.forEach((el) => {
    el.textContent = `${cps} CPS`;
  });

  finalCPSDesc.forEach((el) => {
    el.textContent = `${counter} Clicks in ${secArr[a]} Seconds`;
    if (cps >= 6 && cps <= 8.9) {
      rankImg.src = "./assets/Silver.png";
      rank.textContent = "Silver";
      rankQuote.textContent = "Speed comes with practice — every click counts!";
    } else if (cps >= 9 && cps <= 11.9) {
      rankImg.src = "./assets/Gold.png";
      rank.textContent = "Gold";
      rankQuote.textContent =
        "Don’t stop now, champions are made one click at a time.";
    } else if (cps >= 12 && cps < 14.9) {
      rankImg.src = "./assets/Platinum.png";
      rank.textContent = "Platinum";
      rankQuote.textContent =
        "Legends aren’t born, they’re clicked into existence.";
    } else if (cps >= 15 && cps < 19.9) {
      rankImg.src = "./assets/Diamond.png";
      rank.textContent = "Diamond";
      rankQuote.textContent =
        "Keep breaking your own record — the only rival is you!";
    } else if (cps >= 20) {
      rankImg.src = "./assets/Legendary.png";
      rankImg.style.height = "250px";
      rank.textContent = "Legendary";
      rankQuote.textContent =
        "Fast fingers, faster growth — Your journey has just begun.";
      return;
    }
  });
  scoreCard.style.display = "flex";
}

function stopTimer() {
  clearInterval(startTime);
  timerStarted = true;
  text.textContent = "Click Here to Start!";
}

function resetTimer() {
  miliSec.textContent = miliSecArr[idx];
  sec.textContent = secArr[idx];
}

function resetCounter() {
  counter = 0;
  count.textContent = counter;
}

btns[0].style.backgroundColor = "#276ecc";
btns[0].style.boxShadow = "0 4px 17px -3px #276ecc";

btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    idx = index;
    stopTimer();
    resetTimer();
    resetCounter();
  });

  btn.addEventListener("click", () => {
    a = index;
    btns.forEach((b) => {
      b.style.backgroundColor = "#2c83f5";
      b.style.boxShadow = "";
    });
    btns[index].style.backgroundColor = "#276ecc";
    btns[index].style.boxShadow = "0 4px 17px -3px #276ecc";
  });
});

cpsArea.addEventListener("click", () => {
  if (timerStarted) {
    startTimer();
    resetCounter();
    rankImg.src = "./assets/Bronze.png";
    rank.textContent = "Bronze";
    rankQuote.textContent = "Every expert was once a beginner — keep clicking ";
    text.textContent = "";
    scoreCard.style.display = "none";
    timerStarted = false;
  }

  counter += 1;
  count.textContent = counter;
});
