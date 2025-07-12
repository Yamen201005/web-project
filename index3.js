const emojis = ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐸', '🐵'];
let cards = [...emojis, ...emojis]; // duplicate for pairs
let firstCard = null;
let secondCard = null;
let lock = false;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  const board = document.getElementById('gameBoard');
  board.innerHTML = '';
  shuffle(cards).forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerText = emoji;

    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;

  card.classList.add('flipped');
  
  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    lock = true;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');
      resetTurn();
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetTurn();
      }, 1000);
    }
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lock = false;
}

createBoard();
function restartGame() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  createBoard();
}
