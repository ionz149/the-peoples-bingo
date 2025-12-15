const numbers = [
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

// shuffles array while keeping the freebie item in center
function shuffleBoard() {

  // isolate and remove center item
  const fixedIndex = 12;
  const fixedItem = numbers[fixedIndex];
  numbers.splice(fixedIndex, 1);

  // randomization of array
  let currentIndex = numbers.length;
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [numbers[currentIndex], numbers[randomIndex]] = [
      numbers[randomIndex], numbers[currentIndex]];
  }

  // add ceter item back in
  numbers.splice(fixedIndex,0,fixedItem);

  // generate grid items html
  let listItem = "";
  for ( let i = 0; i < numbers.length; i++ ) {
    listItem += `
    <div class="grid-item">
      <div class="card ${numbers[i].name}">
        <div class="icon"><img src="${numbers[i].icon}" alt="${numbers[i].name}" /></div>
        <div class="text">${numbers[i].value}</div>
      </div>
    </div>
    `;
  }
  gameBoard.classList.add('game-ready');
  gameBoard.innerHTML = listItem;
}
console.log('Game ready!');

// cards
let cards = document.querySelectorAll('.grid-item');
for ( let i = 0; i < numbers.length; i++ ) {
  console.log(cards);
  console.log(`${i} - ${numbers[i].name}`);
}

// buttons
let btnShuffle = document.querySelector('.btn-shuffle');
let btnStart = document.querySelector('.btn-start');
let btnPause = document.querySelector('.btn-pause');

btnShuffle.addEventListener('click', () => {
  shuffleBoard();
  console.log('Shuffle button clicked!');
  gameBoard.classList.remove('game-active');
  gameBoard.classList.remove('game-paused');
  gameBoard.classList.add('game-ready');
});

btnStart.addEventListener('click', () => {
  btnShuffle.disabled = true;
  btnStart.disabled = true;
  btnPause.disabled = false;
  gameBoard.classList.add('game-active');
  if ( gameBoard.classList.contains('game-paused') && gameBoard.classList.contains('game-active') ) {
    console.log('Start button clicked! Game has re-started.')
  } else {
    console.log('Start button clicked! Game has started');
  }
  gameBoard.classList.remove('game-paused');
  gameBoard.classList.remove('game-ready');
});

btnPause.addEventListener('click', () => {
  btnShuffle.disabled = false;
  btnStart.disabled = false;
  btnPause.disabled = true;
  // gameBoard.classList.remove('game-active');
  gameBoard.classList.add('game-paused');
  console.log('Pause button clicked! Game has been paused.');
});

// run that shit
shuffleBoard();

