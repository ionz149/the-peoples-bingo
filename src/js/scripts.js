const quotes = [
  {
    name: "notarized",
    value: "I wouldn't believe you if your tongue came notarized.",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "contractor",
    value: "I am the daughter of a contractor.",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "lying-eyes",
    value: "Who am I gonna believe you or my lying eyes?",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "bonanza",
    value: "Court is not a bonanza",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "fork",
    value: "Stick a fork in me, I'm done!",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "barato",
    value: "Lo barato sale caro",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "macho",
    value: "Quien es mas macho",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "rodeo",
    value: "This is not my first rodeo",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "voice",
    value: "If you are within the sound of my voice ...",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "diablo",
    value: "Mas sabe el diablo por viejo que por diablo",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "hand",
    value: "Money never leaves this hand without a receipt in the other hand.",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "panties",
    value: "Time to put your big girl panties on",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "freebie",
    value: "On the house!",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "toilet-paper",
    value: "Grab the nearest toilet paper and crayon ...",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "lifetime",
    value: "I've been doing this without you my whole life.",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "duck-walk",
    value: "If it walks like a duck ...",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "litigants",
    value: "People like you are called litigants",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "phone",
    value: "Do you have a cell phone? Does it have a camera?",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "ching-ching",
    value: "Ching ching! Let the cash register ring!",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "mango",
    value: "Arroz con mango",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "rough-justice",
    value: "Time for some rough justice!",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "rascame",
    value: "Me rascas aquí y me picas allá",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "sisters",
    value: "Cradle to the grave",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "regret",
    value: "Say it, forget it. Write it, regret it.",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  },
  {
    name: "cocaine",
    value: "Cocaine",
    icon: "https://assets.codepen.io/3180931/star-icon.svg"
  }
];
const gameBoard = document.getElementById('bingo');
let clickedCards = new Array();

console.log('Game ready!');
shuffleBoard();

// buttons
let btnShuffle = document.querySelector('.btn-shuffle');
let btnStart = document.querySelector('.btn-start');
let btnPause = document.querySelector('.btn-pause');

btnShuffle.addEventListener('click', () => {
  shuffleBoard();
  console.log('Shuffle button clicked!');
  gameBoard.classList.remove('game-active');
  gameBoard.classList.remove('game-pause');
  gameBoard.classList.add('game-ready');

});

btnStart.addEventListener('click', () => {
  btnShuffle.disabled = true;
  btnStart.disabled = true;
  btnPause.disabled = false;
  gameBoard.classList.add('game-active');
  gameBoard.classList.add('game-play');
  if ( gameBoard.classList.contains('game-pause') && gameBoard.classList.contains('game-active') ) {
    console.log('Start button clicked! Game has re-started.');
    console.log(clickedCards);
  } else {
    console.log('Start button clicked! Game has started');
    console.log(clickedCards);
  }
  gameBoard.classList.remove('game-pause');
  gameBoard.classList.remove('game-ready');
});

btnPause.addEventListener('click', () => {
  btnShuffle.disabled = false;
  btnStart.disabled = false;
  btnPause.disabled = true;
  gameBoard.classList.add('game-pause');
  gameBoard.classList.remove('game-play');
  console.log('Pause button clicked! Game has been paused.');
});

// card click handling
function cards() {
  let getCards = Array.from(document.querySelectorAll('.grid-item'));

  for (let i = 0; i < getCards.length; i++) {
    getCards[i].onclick = function(index) {
      return function(e) {
        if (gameBoard.classList.contains('game-play')) {
          let counted = i;
          this.classList.add('marked');
          if (this.classList.contains('marked')) {
            clickedCards.push(i);
          }
          console.log(clickedCards);
        }
      }
    }(i);
  }
}

// shuffles array while keeping the freebie item in center
function shuffleBoard() {
  // clear the click tracking array
  clickedCards = [];

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
    <div class="grid-item">
      <div class="card ${quotes[i].name}">
        <div class="icon"><img src="${quotes[i].icon}" alt="${quotes[i].name}" /></div>
        <div class="text">${quotes[i].value}</div>
      </div>
    </div>
    `;
  }

  // update html board class and items
  gameBoard.classList.add('game-ready');
  gameBoard.innerHTML = listItem;

  // restart the click tracking
  cards();
}