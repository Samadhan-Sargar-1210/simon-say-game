let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let statusEl = document.querySelector("#status");
let startBtn = document.querySelector("#startBtn");

document.addEventListener("keypress", function() {
    if (started === false) {
        beginGame();
    }
});

if (startBtn) {
    startBtn.addEventListener("click", function() {
        if (started === false) {
            beginGame();
        }
    });
}

function beginGame() {
    started = true;
    statusEl.className = "alert alert-primary py-2 mb-3";
    statusEl.textContent = "Game started! Watch the sequence.";
    levelUp();
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    if (statusEl) {
        statusEl.className = "alert alert-info py-2 mb-3";
        statusEl.textContent = `Level ${level}`;
    }

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 800);
        }
    } else {
        if (statusEl) {
            statusEl.className = "alert alert-danger py-2 mb-3";
            statusEl.innerHTML = `Game Over! Your score was <b>${level}</b>. Press Start or any key to try again.`;
        }
        document.body.classList.add("game-over");
        setTimeout(function() {
            document.body.classList.remove("game-over");
        }, 300);
        reset();
    }
}

function btnPress() {
    if (!started) return;
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allTiles = document.querySelectorAll(".tile");
for (let btn of allTiles) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}