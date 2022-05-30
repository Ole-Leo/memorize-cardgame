import { app } from './start-screen';
import { shuffle } from 'lodash';
import { cards } from './cards-list';
import { templateEngine } from './template-engine';
import { renderStartScreen } from './start-screen';
import {
  Cards,
  Card,
  stopwatch,
  generatePairCards,
  matchForWin,
} from './additional';

function cardEngineTemplate(card: Card) {
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

function renderCardArea(container: HTMLElement) {
  const cardArea = document.createElement('div')!;
  cardArea.classList.add('cards-area');

  const shuffledCards: Cards = shuffle(cards);

  const selectedCards: Cards = shuffledCards.slice(
    0,
    Number(window.application.difficulty) * 3
  );

  const pairCards: Cards = generatePairCards(selectedCards, selectedCards);
  const shuffledPairCards: Cards = shuffle(pairCards);

  shuffledPairCards.forEach(card => {
    window.application.shuffleCards.push(card.name);
    cardArea.appendChild(templateEngine(cardEngineTemplate(card)));
  });

  container.appendChild(cardArea);
}

export function renderStartAgainBtn(container: HTMLElement, text: string) {
  const startAgainBtn = document.createElement('button');
  startAgainBtn.classList.add('start-button');
  startAgainBtn.textContent = text;

  startAgainBtn.addEventListener('click', () => {
    window.clearInterval(window.application.timers);
    window.application.finalTime = '';
    window.application.difficulty = '';
    window.application.shuffleCards = [];
    window.application.userSelectedCards = [];
    renderStartScreen();
  });

  container.appendChild(startAgainBtn);
}

function renderGameHeader(container: HTMLElement) {
  const gameHeader = document.createElement('header');
  gameHeader.classList.add('header');

  const inGameTime = document.createElement('div');
  inGameTime.classList.add('time-in-game');

  const timer = document.createElement('p');
  timer.classList.add('timer');
  timer.textContent = '00:00';

  inGameTime.appendChild(timer);
  gameHeader.appendChild(inGameTime);
  renderStartAgainBtn(gameHeader, 'Начать заново');
  container.appendChild(gameHeader);
}

export function renderGameScreen() {
  app.textContent = '';
  renderGameHeader(app);
  renderCardArea(app);

  const currentCards = document.querySelectorAll('.card');
  const frontFaceCards = document.querySelectorAll('.front-img');
  const backFaceCards = document.querySelectorAll('.back-img');
  const timer: HTMLElement = document.querySelector('.timer')!;

  let hasFlippedCard: boolean = false;
  let firstCard: HTMLElement, secondCard: HTMLElement;

  stopwatch(timer);

  function flipCard(event: Event) {
    frontFaceCards.forEach(frontFaceCard => {
      frontFaceCard.classList.add('is-flipped');
    });

    const target = event.currentTarget as HTMLElement;
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
      window.application.shuffleCards,
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
      String(firstCard.dataset.card),
      String(secondCard.dataset.card)
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

    currentCards.forEach(currentCard => {
      currentCard.addEventListener('click', flipCard);
    });
  }, 3000);
}
