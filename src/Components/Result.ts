import van, { State } from 'vanjs-core';
import type { LeftRightChoice, questWordsWithAnswer } from './Quiz';
import { speech } from './utils';
import { fireCustomEvent } from './utils';
import { SpeechIcon } from './icons';
import { saveStats } from './QuizStats';
import QuizStats from './QuizStats';

const { div, h2, button, table, tr, th, td, span } = van.tags;

interface ResultProps {
  userAnswers: State<LeftRightChoice[]>;
  questWords: State<questWordsWithAnswer[]>;
  selectedVoiceURI: string;
}

const Result = ({ userAnswers, questWords, selectedVoiceURI }: ResultProps) => {
  const correctCount = userAnswers.val.filter(
    (a, i) => a === questWords.val[i].correct
  ).length;
  saveStats(userAnswers, questWords);
  return div(
    h2(),
    table(
      { class: 'result-table' },
      tr(
        th(
          { colspan: 2 },
          `正答数 : ${correctCount} / ${questWords.val.length}`
        )
      ),
      ResultRows({ userAnswers, questWords, selectedVoiceURI })
    ),
    button(
      {
        class: 'one-more-button',
        onclick: () => fireCustomEvent('resetQuestions'),
      },
      'One more set!'
    ),
    QuizStats({ selectedVoiceURI })
  );
};

interface ResultRowsProps {
  userAnswers: State<LeftRightChoice[]>;
  questWords: State<questWordsWithAnswer[]>;
  selectedVoiceURI: string;
}

const ResultRows = ({
  userAnswers,
  questWords,
  selectedVoiceURI,
}: ResultRowsProps) =>
  questWords.val.map((q, i) => {
    const isUserCorrect = userAnswers.val[i] === q.correct;
    let leftStyles = '';
    let rightStyles = '';

    if (isUserCorrect && q.isLeftCorrect()) {
      leftStyles = 'correct';
    } else if (!isUserCorrect && !q.isLeftCorrect()) {
      leftStyles = 'wrong';
    } else if (isUserCorrect && !q.isLeftCorrect()) {
      rightStyles = 'correct';
    } else if (!isUserCorrect && q.isLeftCorrect()) {
      rightStyles = 'wrong';
    }

    return tr(
      td(
        userAnswers.val[i] === q.correct
          ? span({ class: '' }, '✅')
          : span({ class: '' }, '❌')
      ),
      td(
        div(
          { class: `${leftStyles}` },
          SpeechButton({
            speechText: q.left,
            labelText: q.left,
            selectedVoiceURI,
          })
        ),
        div(
          { class: `${rightStyles}` },
          SpeechButton({
            speechText: q.right,
            labelText: q.right,
            selectedVoiceURI,
          })
        )
      )
    );
  });

interface SpeechButtonProps {
  speechText: string;
  labelText: string;
  selectedVoiceURI: string;
}
export const SpeechButton = ({
  speechText,
  labelText,
  selectedVoiceURI,
}: SpeechButtonProps) => {
  return button(
    {
      class: 'speech-button',
      onclick: () => speech(speechText, selectedVoiceURI),
    },
    SpeechIcon(),
    labelText
  );
};

export default Result;
