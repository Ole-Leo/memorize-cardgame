import { renderWinScreen } from './win-screen';
import { shuffle, isEqual, sortBy } from 'lodash';

export function generatePairCards() {
  const newArr = [...arguments];
  return shuffle(newArr.flat(Infinity));
}

export function matchForWin(shuffleCards, userCards) {
  if (isEqual(sortBy(shuffleCards), sortBy(userCards))) {
    setTimeout(() => {
      exportScreen('winScreen', renderWinScreen);
      window.application.renderScreen('winScreen');
    }, 350);
  }
}

export function exportScreen(screenName, renderScreenFunc) {
  window.application.screens[screenName] = renderScreenFunc;
}
