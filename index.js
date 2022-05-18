import './style.css';
import { exportScreen } from './scripts/additional';
import { renderStartScreen } from './scripts/start-screen';
import { exportBlocks } from './scripts/game-screen';

export const app = document.querySelector('.app');

window.application = {
  blocks: {},
  screens: {},
  difficulty: '',
  timers: [],
  renderScreen: function (screenName) {
    window.application.screens[screenName]();
  },
  renderBlock: function (blockName, container, additional = '') {
    window.application.blocks[blockName](container, additional);
  },
};

exportScreen('startForm', renderStartScreen);
window.application.renderScreen('startForm');
exportBlocks();
