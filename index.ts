import './style.css';
import { renderStartScreen } from './scripts/start-screen';

interface gameApplication {
  difficulty: number | string;
  timers: number | undefined;
  shuffleCards: string[];
  userSelectedCards: string[];
  finalTime: string;
}

declare global {
  interface Window {
    application: gameApplication;
  }
}

window.application = window.application || {};

window.application = {
  difficulty: '',
  timers: undefined,
  shuffleCards: [],
  userSelectedCards: [],
  finalTime: '',
};

renderStartScreen();
