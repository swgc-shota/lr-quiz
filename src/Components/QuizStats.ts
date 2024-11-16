import van, { State } from 'vanjs-core';
import { WORD_PAIRS } from './words';
import type { questWordsWithAnswer, LeftRightChoice } from './Quiz';
import { TrashIcon } from './icons';
import { SpeechButton } from './Result';
const { div, h2, table, thead, tr, th, td, button } = van.tags;

interface QuestionStat {
  questionId: string;
  attempts: number;
  correct: number;
}

const getQuizStats = (): QuestionStat[] => {
  const stats = localStorage.getItem('quizStats');
  if (stats) {
    return JSON.parse(stats) as QuestionStat[];
  }
  return WORD_PAIRS.map((w) => ({
    questionId: `${w.left}-${w.right}`,
    attempts: 0,
    correct: 0,
  }));
};

export const saveStats = (
  userAnswers: State<LeftRightChoice[]>,
  questWords: State<questWordsWithAnswer[]>
) => {
  const currentStats = getQuizStats();
  const pairIds = questWords.val.map((w) => `${w.left}-${w.right}`);

  const newStats = currentStats.map((t) => {
    const questIndex = pairIds.indexOf(t.questionId);
    if (questIndex !== -1) {
      const isCorrect =
        userAnswers.val[questIndex] === questWords.val[questIndex].correct;
      return {
        ...t,
        attempts: t.attempts + 1,
        correct: isCorrect ? t.correct + 1 : t.correct,
      };
    }
    return t;
  });

  localStorage.setItem('quizStats', JSON.stringify(newStats));
};

const loadStats = () => {
  const savedStats = localStorage.getItem('quizStats');
  if (savedStats) {
    return JSON.parse(savedStats) as QuestionStat[];
  }

  return WORD_PAIRS.map(
    (w) =>
      ({
        questionId: `${w.left}-${w.right}`,
        attempts: 0,
        correct: 0,
      } as QuestionStat)
  );
};

interface QuizStatProps {
  selectedVoiceURI: string;
}
const QuizStats = ({ selectedVoiceURI }: QuizStatProps) => {
  const stats = van.state(loadStats());
  const middleIndex = Math.floor(stats.val.length / 2);
  const firstHalf = stats.val.slice(0, middleIndex);
  const secondHalf = stats.val.slice(middleIndex);
  const clearStorage = () => {
    if (confirm('本当に成績データを削除しますか？')) {
      localStorage.clear();
      location.reload();
    }
  };
  return div(
    { class: 'stat-container' },
    h2('これまでの統計'),
    div(
      { class: 'stat-tables-container' },
      StatsTable({ stats: firstHalf, selectedVoiceURI }),
      StatsTable({ stats: secondHalf, selectedVoiceURI })
    ),
    button(
      {
        class: 'clear-storage-button',
        onclick: () => clearStorage(),
      },
      TrashIcon(),
      '成績データを削除する'
    )
  );
};

interface StatsTableProps {
  stats: QuestionStat[];
  selectedVoiceURI: string;
}

const StatsTable = ({ stats, selectedVoiceURI }: StatsTableProps) =>
  table(
    { class: 'stat-table' },
    thead(tr(th('問題'), th('正解数'), th('正解率'))),
    stats.map((stat) => StatRow({ stat, selectedVoiceURI }))
  );

interface StatRowProps {
  stat: QuestionStat;
  selectedVoiceURI: string;
}

const StatRow = ({ stat, selectedVoiceURI }: StatRowProps) => {
  const correctRate =
    stat.attempts > 0 ? Math.round((stat.correct / stat.attempts) * 100) : 0;
  return tr(
    td(
      stat.questionId
        .split('-')
        .map((w) =>
          SpeechButton({ speechText: w, labelText: w, selectedVoiceURI })
        )
    ),
    td(`${stat.correct} / ${stat.attempts}`),
    td(`${correctRate}%`)
  );
};
export default QuizStats;
