import van from 'vanjs-core';
import Question from './Question';
import Result from './Result';
import { WORD_PAIRS } from './words';
import type { WordPair } from './words';
import SelectVoice from './SelectVoice';
import { getRecommendVoiceURI } from './utils';
export type LeftRightChoice = 'L' | 'R';

export interface questWordsWithAnswer extends WordPair {
  correct: LeftRightChoice;
  speeched: boolean;
  isLeftCorrect: () => boolean;
}

const { div } = van.tags;
const wordPairWithAnswerProto = {
  left: '',
  right: '',
  speeched: false,
  correct: 'L',
  isLeftCorrect() {
    return this.correct === 'L';
  },
};

const selectQuestionWords = (): questWordsWithAnswer[] => {
  return WORD_PAIRS.sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map((obj) => ({
      ...wordPairWithAnswerProto,
      ...obj,
      correct: Math.random() < 0.5 ? 'L' : 'R',
    }));
};

const LRQuiz = () => {
  const questWords = van.state<questWordsWithAnswer[]>(selectQuestionWords());
  const userAnswers = van.state<LeftRightChoice[]>([]);
  const questIndex = van.state(0);
  const temp = getRecommendVoiceURI();
  const selectedVoiceURI = van.state(temp === undefined ? '' : temp);

  document.addEventListener('updatequestIndex', (e: Event) => {
    const usersChoice = (e as CustomEvent<LeftRightChoice>).detail;
    userAnswers.val.push(usersChoice);
    if (questIndex.val < questWords.val.length) {
      questIndex.val = questIndex.val + 1;
    }
  });

  document.addEventListener('resetQuestions', () => {
    questWords.val = selectQuestionWords();
    userAnswers.val = [];
    questIndex.val = 0;
  });

  document.addEventListener('changeVoiceURI', (e: Event) => {
    selectedVoiceURI.val = (e as CustomEvent<string>).detail;
  });

  return div(
    { class: 'quiz-container' },
    () =>
      questIndex.val < questWords.val.length
        ? Question({
            questWords,
            questIndex,
            selectedVoiceURI,
          })
        : Result({
            userAnswers,
            questWords,
            selectedVoiceURI: selectedVoiceURI.val,
          }),
    () => SelectVoice({ selectedVoiceURI: selectedVoiceURI.val })
  );
};

export default LRQuiz;
