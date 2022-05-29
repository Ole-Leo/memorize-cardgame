import { templateEngine } from './template-engine';
import { renderGameScreen } from './game-screen';

export const app: HTMLDivElement = document.querySelector('.app')!;

function startFormEngine() {
  return {
    tag: 'form',
    cls: 'start-form',
    content: [
      {
        tag: 'h1',
        cls: ['start-form__title', 'title'],
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

export function renderStartScreen() {
  app.textContent = '';

  app.appendChild(templateEngine(startFormEngine()));

  const startForm: HTMLFormElement = document.querySelector('.start-form')!;
  const difficultyBtns: NodeListOf<HTMLButtonElement> =
    startForm.querySelectorAll('.form-button');
  const error: HTMLParagraphElement = startForm.querySelector('.error-text')!;

  difficultyBtns.forEach(difficultyBtn => {
    difficultyBtn.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      window.application.difficulty = String(target.dataset.lvl);

      difficultyBtns.forEach(difficultyBtn => {
        difficultyBtn.classList.remove('button-onclick');
        target.classList.add('button-onclick');
      });
    });
  });

  function startGame(event: Event) {
    event.preventDefault();
    if (!window.application.difficulty) {
      error.classList.remove('hidden');
    } else {
      error.classList.add('hidden');
      renderGameScreen();
    }
  }

  startForm.addEventListener('submit', startGame);
}
