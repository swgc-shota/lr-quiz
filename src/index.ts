import van from 'vanjs-core';
import Header from './Common/Header';
import Footer from './Common/Footer';
import LRQuiz from './Components/Quiz';
import Instruction from './Components/Instruction';
import './index.css';

const { main } = van.tags;
const appTitle = import.meta.env.VITE_TITLE;
const appSlug = import.meta.env.VITE_SLUG;

const voices = speechSynthesis.getVoices();
const initApp = () => {
  van.add(
    document.body,
    Header(appTitle, appSlug),
    main({ class: 'pt-10 dark:bg-stone-900' }, LRQuiz(), Instruction()),
    Footer(appTitle)
  );

  if ('onvoiceschanged' in speechSynthesis) {
    speechSynthesis.removeEventListener('voiceschanged', initApp);
  }
};

if (voices.length === 0 && 'onvoiceschanged' in speechSynthesis) {
  speechSynthesis.addEventListener('voiceschanged', initApp);
} else {
  initApp();
}
