document.addEventListener('DOMContentLoaded', () => {
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

    const shuffledCards = shuffleCards(cardsList);

    const selectedCards = shuffledCards.slice(
      0,
      3 * window.application.difficulty
    );

    const pairCards = generatePairCards(selectedCards, selectedCards);
    const shuffledPairCards = shuffleCards(pairCards);

    window.application.shuffledCards = [];

    shuffledPairCards.forEach(card => {
      window.application.shuffledCards.push(card.name);
      window.application.shuffledCards.sort();
      cardArea.appendChild(templateEngine(cardEngineTemplate(card)));
    });

    container.appendChild(cardArea);
  }

  function renderGameHeader(container) {
    const gameHeader = document.createElement('header');
    gameHeader.classList.add('header');

    const inGameTime = document.createElement('div');
    inGameTime.classList.add('time-in-game');

    const timer = document.createElement('p');
    timer.classList.add('timer');
    timer.textContent = '00:00';

    const startAgainBtn = document.createElement('button');
    startAgainBtn.classList.add('start-button');
    startAgainBtn.textContent = 'Начать заново';

    startAgainBtn.addEventListener('click', () => {
      window.application.difficulty = '';
      window.application.renderScreen('startForm');
    });

    inGameTime.appendChild(timer);
    gameHeader.appendChild(inGameTime);
    gameHeader.appendChild(startAgainBtn);
    container.appendChild(gameHeader);
  }

  window.application.blocks.gameHeader = renderGameHeader;
  window.application.blocks.cardArea = renderCardArea;

  function renderGameScreen() {
    app.textContent = '';

    window.application.renderBlock('gameHeader', app);
    window.application.renderBlock('cardArea', app);

    const currentCards = document.querySelectorAll('.card');
    const frontFaceCards = document.querySelectorAll('.front-img');
    const backFaceCards = document.querySelectorAll('.back-img');
    window.application.userSelectedCards = [];

    let hasFlippedCard = false;
    let firstCard, secondCard;

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

      equalArrays(
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

      window.application.userSelectedCards.sort();
    }

    function unflippedCards() {
      setTimeout(() => {
        firstCard.classList.remove('is-flipped');
        secondCard.classList.remove('is-flipped');
      }, 400);
    }

    const preGameTimer = setTimeout(() => {
      backFaceCards.forEach(backFaceCard => {
        backFaceCard.classList.add('visible');
      });

      currentCards.forEach(currentCard => {
        currentCard.addEventListener('click', flipCard);
      });
    }, 2000);

    window.application.timers.push(preGameTimer);
  }

  window.application.screens.game = renderGameScreen;
});
