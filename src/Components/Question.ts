import van, { State } from 'vanjs-core';
import { speech } from './utils';
import type { LeftRightChoice, questWordsWithAnswer } from './Quiz';
import { fireCustomEvent } from './utils';

const { div, button, h2, span } = van.tags;

interface QuestionProps {
  questWords: State<questWordsWithAnswer[]>;
  questIndex: State<number>;
}

const Question = ({ questWords, questIndex }: QuestionProps) => {
  const speeched = van.derive(
    () =>
      questIndex.val < questWords.val.length &&
      questWords.val[questIndex.val].speeched
  );

  return div(
    h2(() => `Question ${questIndex.val + 1} / ${questWords.val.length}`),
    div(
      { class: 'ripple-container' },
      BigSpeechButton({ questIndex, questWords })
    ),
    div(
      { class: 'answer-buttons' },
      AnswerButton({ choice: 'L', speeched }),
      AnswerButton({ choice: 'R', speeched })
    )
  );
};

interface BigSpeechButtonProps {
  questWords: State<questWordsWithAnswer[]>;
  questIndex: State<number>;
}
const BigSpeechButton = ({ questIndex, questWords }: BigSpeechButtonProps) => {
  return button(
    {
      autofocus: true,
      class: 'big-speech-button circle',
      onclick: async () => {
        const wordPair = questWords.val[questIndex.val];
        const word = wordPair.correct === 'L' ? wordPair.left : wordPair.right;
        const speeched = await speech(word);

        if (wordPair.speeched) {
          return;
        }
        questWords.val = questWords.val.map((word, index) =>
          index === questIndex.val ? { ...word, speeched: speeched } : word
        );
      },
    },
    span(questWords.val[questIndex.val].left),
    'or',
    span(questWords.val[questIndex.val].right)
  );
};

interface AnswerButtonProps {
  choice: LeftRightChoice;
  speeched: State<boolean>;
}

const AnswerButton = ({ choice, speeched }: AnswerButtonProps) => {
  return button(
    {
      class: 'answer-button',
      disabled: () => !speeched.val,
      onclick: () =>
        fireCustomEvent<LeftRightChoice>('updatequestIndex', choice),
    },
    choice
  );
};

export default Question;
