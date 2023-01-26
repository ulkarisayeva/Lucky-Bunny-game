const colors = new Map();
colors.set(1, "green");
colors.set(2, "lila");
colors.set(3, "blue");
colors.set(4, "orange");
colors.set(5, "red");
colors.set(6, "yellow");

class Game {
  constructor() {
    this.diceColor = 0;
    this.lifeCount = 10;
    this.grabbedCarrots = 0;
  }
}
let game = new Game();

var elDice = document.getElementById("dice");
var elComeOut = document.getElementById("roll");
let grabbedCarrotsEl = document.getElementById("stats-grabbed-carrots");
let lifesOfBunny = document.getElementById("stats-lifes");
let tdElements = document.getElementsByTagName("td");
let popupRollDiceElement = document.getElementById("popup-roll-dice");
let popupGrabCarrotElement = document.getElementById("popup-grab-carrot");
let popupCongratsElement = document.getElementById("popup-congrats");
let popupGameOverElement = document.getElementById("popup-game-over");

elComeOut.onclick = function () {
  if (game.lifeCount === 0) {
    console.log( "You lost all your lifes. please refresh the page to start again."
    );
  } else if (game.diceColor === 0) {
    document.getElementsByTagName("img")[0].classList.remove("show-carrot");
    rollDice();
  } else {
    document.getElementById("content").classList.add("is-blurred");
    popupGrabCarrotElement.classList.add("open-popup");

    let oopsAudioElement = document.getElementById("oops-audio");
    oopsAudioElement.play();
  }
};

function rollDice() {
  if (game.grabbedCarrots == 25) {
    console.log("Game is over. You have grabbed all the carrots.");
  }

  var dice = Math.floor(Math.random() * 6 + 1);

  game.diceColor = dice;
  game.diceRolled = true;

  for (var i = 1; i <= 6; i++) {
    elDice.classList.remove("show-" + i);
    if (dice === i) {
      elDice.classList.add("show-" + i);
    }
  }
}

function showCarrot(e) {
  if (game.diceColor === 0) {
    document.getElementById("content").classList.add("is-blurred");
    popupRollDiceElement.classList.add("open-popup");

    let oopsAudioElement = document.getElementById("oops-audio");
    oopsAudioElement.play();
  } else {
    e.getElementsByTagName("img")[0].classList.add("show-carrot");
    let currentDiceColor = game.diceColor;
    setTimeout(function () {
      console.log(e.dataset.color, game.diceColor);
      if (e.dataset.color != currentDiceColor) {
        game.lifeCount -= 1;
        lifesOfBunny.innerText = game.lifeCount;
        if (game.lifeCount === 0) {
          console.log("lost")
          document.getElementById("content").classList.add("is-blurred");
          popupGameOverElement.classList.add("open-popup");

          let gameOverAudioElement = document.getElementById("game-over-audio");
          gameOverAudioElement.play();

        }
      } else {
        console.log("You found it");
        game.grabbedCarrots += 1;

      }
      console.log(game.grabbedCarrots)
      grabbedCarrotsEl.innerText = game.grabbedCarrots;

      if (game.grabbedCarrots == 5 ) {
        document.getElementById("content").classList.add("is-blurred");
        popupCongratsElement.classList.add("open-popup");

        let congratsAudioElement = document.getElementById("congrats-audio");
        congratsAudioElement.play();
      }
    }, 1000);
    game.diceColor = 0;
  }
}





function closePopUp(el) {
  el.parentNode.classList.remove("open-popup");
  document.getElementById("content").classList.remove("is-blurred");
}

function goHome() {
  window.location.href = "./index.html";
}

for (let i = 0; i < tdElements.length; i++) {
  let randomColor = Math.floor(Math.random() * 6 + 1);

  tdElements[i].getElementsByTagName("img")[0].classList.add("show-carrot");
  tdElements[i].setAttribute("data-color", randomColor);
  tdElements[i].getElementsByTagName("img")[0].src = "./images/carrot-" + colors.get(randomColor) + ".png";
}

setTimeout(function () {
  for (let i = 0; i < tdElements.length; i++) {  
    tdElements[i].getElementsByTagName("img")[0].classList.remove("show-carrot");
  }
}, 3000);

grabbedCarrotsEl.innerText = game.grabbedCarrots;
lifesOfBunny.innerText = game.lifeCount;
