import { templateEngine } from './template-engine';
import { app } from '../index';
import { cards } from './cards-list';
import { generatePairCards, matchForWin } from './additional';
import { shuffle } from 'lodash';

const cardsList = JSON.parse(cards);

function cardEngineTemplate(card) {
  return {
    tag: 'article',
    cls: 'card',
    attrs: {
      'data-card': card.name,
    },
    content: [
      {
        tag: 'img',
        cls: ['card-img', 'front-img'],
        attrs: {
          src: card['front-img'],
        },
      },
      {
        tag: 'img',
        cls: ['card-img', 'back-img'],
        attrs: {
          src: card['back-img'],
        },
      },
    ],
  };
}

function renderCardArea(container) {
  const cardArea = document.createElement('div');
  cardArea.classList.add('cards-area');

  const shuffledCards = shuffle(cardsList);

  const selectedCards = shuffledCards.slice(
    0,
    3 * window.application.difficulty
  );

  const pairCards = generatePairCards(selectedCards, selectedCards);
  const shuffledPairCards = shuffle(pairCards);

  window.application.shuffledCards = [];

  shuffledPairCards.forEach(card => {
    window.application.shuffledCards.push(card.name);
    cardArea.appendChild(templateEngine(cardEngineTemplate(card)));
  });

  container.appendChild(cardArea);
}

function renderStartAgainBtn(container, text) {
  const startAgainBtn = document.createElement('button');
  startAgainBtn.classList.add('start-button');
  startAgainBtn.textContent = text;

  startAgainBtn.addEventListener('click', () => {
    window.application.difficulty = '';
    window.application.timers.forEach(timer => {
      clearInterval(timer);
    });
    window.application.renderScreen('startForm');
  });

  container.appendChild(startAgainBtn);
}

function renderGameHeader(container) {
  const gameHeader = document.createElement('header');
  gameHeader.classList.add('header');

  const inGameTime = document.createElement('div');
  inGameTime.classList.add('time-in-game');

  const timer = document.createElement('p');
  timer.classList.add('timer');
  timer.textContent = '00:00';

  inGameTime.appendChild(timer);
  gameHeader.appendChild(inGameTime);
  window.application.renderBlock('startAgainBtn', gameHeader, 'Начать заново');
  container.appendChild(gameHeader);
}

export function renderGameScreen() {
  app.textContent = '';

  window.application.renderBlock('gameHeader', app);
  window.application.renderBlock('cardArea', app);

  const currentCards = document.querySelectorAll('.card');
  const frontFaceCards = document.querySelectorAll('.front-img');
  const backFaceCards = document.querySelectorAll('.back-img');
  const timer = document.querySelector('.timer');
  window.application.userSelectedCards = [];

  let hasFlippedCard = false;
  let firstCard, secondCard;

  function stopwatch() {
    let sec = 0;
    let min = 0;

    function timeChange() {
      sec++;
      if (sec > 59) {
        sec = 0;
        min++;
      }
      timer.textContent = `${min > 9 ? min : '0' + min}:${
        sec > 9 ? sec : '0' + sec
      }`;

      window.application.finalTime = timer.textContent;
    }

    const interval = setInterval(timeChange, 1000);
    window.application.timers.push(interval);
  }

  function flipCard(event) {
    frontFaceCards.forEach(frontFaceCard => {
      frontFaceCard.classList.add('is-flipped');
    });

    const target = event.currentTarget;
    target.classList.toggle('is-flipped');
    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = target;
      return;
    }

    secondCard = target;
    hasFlippedCard = false;

    checkForMatch();

    matchForWin(
      window.application.shuffledCards,
      window.application.userSelectedCards
    );
  }

  function checkForMatch() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
      guessedCards();
      return;
    }

    unflippedCards();
  }

  function guessedCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    window.application.userSelectedCards.push(
      firstCard.dataset.card,
      secondCard.dataset.card
    );
  }

  function unflippedCards() {
    setTimeout(() => {
      firstCard.classList.remove('is-flipped');
      secondCard.classList.remove('is-flipped');
    }, 400);
  }

  setTimeout(() => {
    backFaceCards.forEach(backFaceCard => {
      backFaceCard.classList.add('visible');
    });

    stopwatch();

    currentCards.forEach(currentCard => {
      currentCard.addEventListener('click', flipCard);
    });
  }, 3000);
}

export function exportBlocks() {
  window.application.blocks.startAgainBtn = renderStartAgainBtn;
  window.application.blocks.gameHeader = renderGameHeader;
  window.application.blocks.cardArea = renderCardArea;
}
