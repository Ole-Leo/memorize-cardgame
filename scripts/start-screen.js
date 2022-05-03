function startFormEngine() {
  return {
    tag: 'form',
    cls: 'start-form',
    content: [
      {
        tag: 'div',
        cls: 'start-form__title',
        content: 'Выбери сложность',
      },
      {
        tag: 'div',
        cls: 'start-form__buttons',
        content: [
          {
            tag: 'button',
            cls: 'form-button',
            content: 1,
            attrs: {
              type: 'button',
              'data-lvl': 1,
            },
          },
          {
            tag: 'button',
            cls: 'form-button',
            content: 2,
            attrs: {
              type: 'button',
              'data-lvl': 2,
            },
          },
          {
            tag: 'button',
            cls: 'form-button',
            content: 3,
            attrs: {
              type: 'button',
              'data-lvl': 3,
            },
          },
        ],
      },
      {
        tag: 'div',
        content: [
          {
            tag: 'button',
            cls: ['start-form', 'start-button'],
            content: 'Старт',
          },
          {
            tag: 'p',
            cls: ['error-text', 'hidden'],
            content: 'Вы не выбрали уровень',
          },
        ],
      },
    ],
  };
}

function renderStartScreen() {
  app.textContent = '';

  app.appendChild(templateEngine(startFormEngine()));

  const startForm = document.querySelector('.start-form');
  const difficultyBtns = startForm.querySelectorAll('.form-button');
  const error = startForm.querySelector('.error-text');

  difficultyBtns.forEach(difficultyBtn => {
    difficultyBtn.addEventListener('click', event => {
      const target = event.target;
      window.application.difficulty = target.dataset.lvl;

      difficultyBtns.forEach(difficultyBtn => {
        difficultyBtn.classList.remove('button-onclick');
        target.classList.add('button-onclick');
      });
    });
  });

  function startGame(event) {
    event.preventDefault();
    if (!window.application.difficulty) {
      error.classList.remove('hidden');
    } else {
      error.classList.add('hidden');
      window.application.renderScreen('game');
    }
  }

  startForm.addEventListener('submit', startGame);
}

window.application.screens.startForm = renderStartScreen;
window.application.renderScreen('startForm');
