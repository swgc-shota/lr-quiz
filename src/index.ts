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
if (voices.length === 0 && 'onvoiceschanged' in speechSynthesis) {
  speechSynthesis.onvoiceschanged = () => {
    van.add(
      document.body,
      Header(appTitle, appSlug),
      main({ class: 'pt-10 dark:bg-stone-900' }, LRQuiz(), Instruction()),
      Footer(appTitle)
    );
  };
} else {
  van.add(
    document.body,
    Header(appTitle, appSlug),
    main({ class: 'pt-10 dark:bg-stone-900' }, LRQuiz(), Instruction()),
    Footer(appTitle)
  );
}
