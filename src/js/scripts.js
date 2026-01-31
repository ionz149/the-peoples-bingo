import confetti from 'canvas-confetti';
const quotes = [
  {
    name: "notarized",
    value: "I wouldn't believe you if your tongue came notarized.",
    lang: "en"
  },
  {
    name: "contractor",
    value: "I am the daughter of a contractor.",
    lang: "en"
  },
  {
    name: "lying-eyes",
    value: "Who am I gonna believe you or my lying eyes?",
    lang: "en"
  },
  {
    name: "bonanza",
    value: "Court is not a bonanza",
    lang: "en"
  },
  {
    name: "fork",
    value: "Stick a fork in me, I'm done!",
    lang: "en"
  },
  {
    name: "barato",
    value: "Lo barato sale caro",
    lang: "es"
  },
  {
    name: "macho",
    value: "Quien es mas macho",
    lang: "es"
  },
  {
    name: "rodeo",
    value: "This is not my first rodeo",
    lang: "en"
  },
  {
    name: "voice",
    value: "If you are within the sound of my voice",
    lang: "en"
  },
  {
    name: "diablo",
    value: "Mas sabe el diablo por viejo que por diablo",
    lang: "es"
  },
  {
    name: "hand",
    value: "Money never leaves this hand without a receipt in the other hand.",
    lang: "en"
  },
  {
    name: "panties",
    value: "Time to put your big girl panties on",
    lang: "en"
  },
  {
    name: "freebie",
    value: "On the house!",
    lang: "en"
  },
  {
    name: "toilet-paper",
    value: "Grab the nearest toilet paper and crayon",
    lang: "en"
  },
  {
    name: "lifetime",
    value: "I've been doing this without you my whole life.",
    lang: "en"
  },
  {
    name: "duck-walk",
    value: "If it walks like a duck",
    lang: "en"
  },
  {
    name: "litigants",
    value: "People like you are called litigants",
    lang: "en"
  },
  {
    name: "phone",
    value: "Do you have a cell phone? Does it have a camera?",
    lang: "en"
  },
  {
    name: "ching-ching",
    value: "Ching ching! Let the cash register ring!",
    lang: "en"
  },
  {
    name: "mango",
    value: "Arroz con mango",
    lang: "es"
  },
  {
    name: "rough-justice",
    value: "Time for some rough justice!",
    lang: "en"
  },
  {
    name: "rascame",
    value: "Me rascas aquí y me picas allá",
    lang: "es"
  },
  {
    name: "sisters",
    value: "Cradle to the grave",
    lang: "en"
  },
  {
    name: "regret",
    value: "Say it, forget it. Write it, regret it.",
    lang: "en"
  },
  {
    name: "cocaine",
    value: "Cocaine",
    lang: "en"
  }
];
const winningCombos = [
  [0,1,2,3,4],
  [5,6,7,8,9],
  [10,11,12,13,14],
  [15,16,17,18,19],
  [20,21,22,23,24],
  [0,5,10,15,20],
  [1,6,11,16,21],
  [2,7,12,17,22],
  [3,8,13,18,23],
  [4,9,14,19,24],
  [0,6,12,18,24],
  [4,8,12,16,20]
];
const gameBoard = document.getElementById('bingo');
let clickedCards = new Array();
// let getCards = Array.from(document.querySelectorAll('.grid-item'));
console.log('Game ready!');
resetBoard();

// buttons
const btnRestart = document.querySelector('.btn-restart');
const aboutModal = document.querySelector('#about');
const aboutClose = document.querySelector('#about .btn-close');
const aboutBtn = document.querySelector('.btn-about');
const winnerModal = document.querySelector('#winner');
const winnerClose = document.querySelector('#winner .btn-close');
const winnerRestartBtn = document.querySelector('.btn-winner-restart');

aboutBtn.addEventListener('click', () => {
  aboutModal.classList.add('modal-active');
  document.querySelector('body').classList.add('modal-open');
});

aboutClose.addEventListener('click', () => {
  aboutModal.classList.remove('modal-active');
  document.querySelector('body').classList.remove('modal-open');
});

btnRestart.addEventListener('click', () => {
  resetBoard();
  gameBoard.classList.remove('game-complete');
  console.log('Shuffle button clicked!');
});

// shuffles array while keeping the freebie item in center
function resetBoard() {
  // clear the click tracking array
  clickedCards = [12];

  // isolate and remove center item
  const fixedIndex = 12;
  const fixedItem = quotes[fixedIndex];
  quotes.splice(fixedIndex, 1);

  // randomization of array
  let currentIndex = quotes.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [quotes[currentIndex], quotes[randomIndex]] = [quotes[randomIndex], quotes[currentIndex]];
  }

  // add center item back in
  quotes.splice(fixedIndex,0,fixedItem);

  // generate grid items html
  let listItem = "";
  for ( let i = 0; i < quotes.length; i++ ) {
    listItem += `
    <div class="grid-item ${i == 12 ? " marked" : ""}">
      <button class="card ${quotes[i].name}">
        <div class="text" ${quotes[i].lang == "es" ? " lang=\"es\"" : ""}>${quotes[i].value}</div>
      </button>
    </div>
    `;
  }

  // update html board class and items

  gameBoard.innerHTML = listItem;

  // restart the click tracking
  cardClick();
}

// card click handling
function cardClick() {
  let getCards = Array.from(document.querySelectorAll('.grid-item'));

  for (let i = 0; i < getCards.length; i++) {
    getCards[i].onclick = function(index) {
      return function(e) {
        if (gameBoard.classList.contains('game-play')) {
          let counted = i;
          if (i === 12) return;
          this.classList.add('marked');
          if (this.classList.contains('marked')) {
            clickedCards.push(i);
            getCards[i].onclick = null;
          }
          console.log(clickedCards);
          checkForWin();
        }
      }
    }(i);
  }
}

function checkForWin() {
  const winningCombo = winningCombos.find(combo =>
    combo.every(num => clickedCards.includes(num))
  );

  if (winningCombo) {
    console.log("WINNER!", winningCombo);

    gameBoard.classList.add('game-complete');

    disableClicks();

    // if .game-complete
    let getCards = Array.from(document.querySelectorAll('.grid-item'));
    let cardIndex = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
    // console.log(cardIndex);
    if ( gameBoard.classList.contains('game-complete') ) {
      // loop thru the winning array
      for ( let i = 0; i < winningCombo.length; i++ ) {
        // add .winner class to each index number
        if(cardIndex.indexOf(winningCombo[i]) != -1){
          let winningIndex = winningCombo[i];
          getCards[winningIndex].classList.add('winner');
        }
      }
      setTimeout(function(){
        winnerModal.classList.add('modal-active');
        winnerModal.querySelector('.modal-box').focus();
        document.querySelector('body').classList.add('modal-open');
        confetti({
          particleCount: 100,
          spread: 85,
          origin: { y: .6 },
          disableForReducedMotion: true
        });
      }, 500);

      winnerClose.addEventListener('click', () => {
        winnerModal.classList.remove('modal-active');
        document.querySelector('body').classList.remove('modal-open');
        gameBoard.classList.remove('game-complete');
        resetBoard();
        btnRestart.disabled = false;
        btnRestart.focus();
      });

      winnerRestartBtn.addEventListener('click', () => {
        winnerModal.classList.remove('modal-active');
        document.querySelector('body').classList.remove('modal-open');
        gameBoard.classList.remove('game-complete');
        resetBoard();
        btnRestart.disabled = false;
        btnRestart.focus();
      });
    }
  }
}

function disableClicks() {
  document.querySelectorAll(".grid-item").forEach(card => {
    card.onclick = null;
  });
}