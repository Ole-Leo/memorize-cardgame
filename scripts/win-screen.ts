import { app } from './start-screen';
import { renderStartAgainBtn } from './game-screen';

export function renderWinScreen() {
  const winForm = document.createElement('div');
  winForm.classList.add('win-form');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const winImg = document.createElement('img');
  winImg.setAttribute('src', 'img/win-image.svg');
  winImg.classList.add('win-form__img');

  const winText = document.createElement('h1');
  winText.classList.add('win-form__title', 'title');
  winText.textContent = 'Вы выиграли!';

  const timeText = document.createElement('h2');
  timeText.classList.add('win-form__text');
  timeText.textContent = 'Затраченное время:';

  const finalTime = document.createElement('p');
  finalTime.classList.add('win-form__time');
  finalTime.textContent = window.application.finalTime;

  winForm.appendChild<HTMLImageElement>(winImg);
  winForm.appendChild<HTMLHeadingElement>(winText);
  winForm.appendChild<HTMLHeadingElement>(timeText);
  winForm.appendChild<HTMLParagraphElement>(finalTime);
  renderStartAgainBtn(winForm, 'Играть снова');
  app.appendChild(winForm);
  app.appendChild(overlay);
}
