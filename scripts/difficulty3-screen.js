function renderDifficulty3Screen() {
  app.textContent = '';

  const content = document.createElement('button');
  content.classList.add('temporary');
  content.textContent = 'Difficulty 3 (click for return)';
  content.addEventListener('click', () => {
    window.application.difficulty = '';
    window.application.renderScreen('startForm');
  });

  app.appendChild(content);
}

window.application.screens.difficulty3 = renderDifficulty3Screen;
