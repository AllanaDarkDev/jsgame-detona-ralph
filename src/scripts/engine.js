const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        livesLeft: document.getElementById("lives"),
        thaChild: document.getElementById("child"),
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives: 3,
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
        timerId: setInterval(randomSquare, 1000),
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert("GAME OVER!")
        alert(`resultados: ${state.values.result}`)
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    let randomNumer = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumer];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function livesCalculator() {
    state.values.lives--
    state.view.livesLeft.textContent = `x${state.values.lives}`
    if(state.values.lives <= 0){
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        clearInterval(livesCalculator)
        alert("GAME OVER!")
        alert(`resultados: ${state.values.result}`)
        playSoundGameOver()
    } else {
        playSoundDamage()
    }
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSoundHitbox()
            } else {
                livesCalculator()
            }
        });
    });
}

function checkThaChild() {
    state.view.thaChild.addEventListener("mousedown", () => {
        playSoundChild()
        state.view.livesLeft.textContent = ">:("
        setInterval(livesCalculator, 2000)
    });
}

function playSoundHitbox(){
    let audio = new Audio("./src/audios/sqek.mp3")
    audio.volume = 0.5
    audio.play();
}

function playSoundDamage() {
    let hitAudio = new Audio("./src/audios/damage.mp3")
    hitAudio.volume = 0.2
    hitAudio.play();
}

function playSoundChild() {
    let childAudio = new Audio("./src/audios/child.mp3")
    childAudio.volume = 0.2
    childAudio.play();
}

function playSoundGameOver() {
    let gameOverAudio = new Audio("./src/audios/gameOver.mp3")
    gameOverAudio.volume = 0.2
    gameOverAudio.play();
}

function initialize(){
    checkThaChild();
    addListenerHitBox();
}


initialize();