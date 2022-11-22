import { renderWinScreen } from './win-screen';
import { shuffle, isEqual, sortBy } from 'lodash';

type Card = {
  name: string;
  'front-img': string;
  'back-img': string;
};

function generatePairCards(firstOfPairCard: Card[], secondOfPairCard: Card[]) {
  const newArr: Card[] = [...firstOfPairCard, ...secondOfPairCard];
  return shuffle(newArr.flat(Infinity));
}

function matchForWin(shuffleCards: string[], userCards: string[]) {
  const isCardsEqual: boolean = isEqual(
    sortBy(shuffleCards),
    sortBy(userCards)
  );
  if (isCardsEqual) {
    window.clearInterval(window.application.timers);
    setTimeout(() => {
      renderWinScreen();
    }, 350);
  }
}

function stopwatch(element: HTMLElement) {
  let sec = 0;
  let min = 0;

  function changeTimeContent() {
    sec++;
    if (sec > 59) {
      sec = 0;
      min++;
    }
    element.textContent = `${min > 9 ? min : '0' + min}:${
      sec > 9 ? sec : '0' + sec
    }`;

    window.application.finalTime = element.textContent;
  }

  const interval = window.setInterval(changeTimeContent, 1000);
  window.application.timers = interval;
}

export { Card, generatePairCards, matchForWin, stopwatch };
