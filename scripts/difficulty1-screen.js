function renderDifficulty1Screen() {
  app.textContent = '';

  const content = document.createElement('button');
  content.classList.add('temporary');
  content.textContent = 'Difficulty 1 (click for return)';

  content.addEventListener('click', () => {
    window.application.difficulty = '';
    window.application.renderScreen('startForm');
  });

  app.appendChild(content);
}

window.application.screens.difficulty1 = renderDifficulty1Screen;
