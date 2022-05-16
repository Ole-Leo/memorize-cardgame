import './style.css';
import { exportScreen } from './scripts/additional';
import { renderStartScreen } from './scripts/start-screen';
import { exportBlocks } from './scripts/game-screen';

export const app = document.querySelector('.app');

window.application = {
  blocks: {},
  screens: {},
  renderScreen: function (screenName) {
    window.application.screens[screenName]();
  },
  renderBlock: function (blockName, container, additional = '') {
    window.application.blocks[blockName](container, additional);
  },
  difficulty: '',
  timers: [],
};

exportScreen('startForm', renderStartScreen);
window.application.renderScreen('startForm');
exportBlocks();
