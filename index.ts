import './style.css';
import { renderStartScreen } from './scripts/start-screen';

interface GameApplication {
  difficulty: number | string;
  timers?: number;
  shuffleCards: string[];
  userSelectedCards: string[];
  finalTime: string;
}

declare global {
  interface Window {
    application: GameApplication;
  }
}

window.application = {
  difficulty: '',
  shuffleCards: [],
  userSelectedCards: [],
  finalTime: '',
};

export const GAME = window.application;

renderStartScreen();
