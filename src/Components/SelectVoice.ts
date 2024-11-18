import van from 'vanjs-core';
import { fireCustomEvent } from './utils';
const { div, select } = van.tags;

interface SelectVoiceProps {
  selectedVoiceURI: string;
}

const SelectVoice = ({ selectedVoiceURI }: SelectVoiceProps) => {
  const selectRef = select({
    class: 'select-voice',
    onchange: function () {
      const newVoiceURI = (this as HTMLSelectElement).value;
      localStorage.setItem('voiceURI', (this as HTMLSelectElement).value);
      fireCustomEvent('changeVoiceURI', newVoiceURI);
    },
  });

  const voices = speechSynthesis.getVoices();
  if (voices.length === 0 && 'onvoiceschanged' in speechSynthesis) {
    speechSynthesis.onvoiceschanged = () =>
      appendVoiceListTo(selectRef, selectedVoiceURI);
  } else {
    appendVoiceListTo(selectRef, selectedVoiceURI);
  }

  return div(selectRef);
};

const appendVoiceListTo = async (
  selectRef: HTMLSelectElement,
  selectedVoiceURI: string
) => {
  if (!('speechSynthesis' in window)) {
    alert(
      'お使いのブラウザは音声読み上げに対応していません。Chrome、Safari、Edgeなどの最新のブラウザでご利用ください。'
    );
    return;
  }

  const englishVoices = getEnglishVoices();

  if (englishVoices.length === 0) {
    const option = document.createElement('option');
    option.textContent = '有効な英語の音声が見つかりません。';
    option.value = '';
    selectRef.appendChild(option);
    return;
  }

  for (let i = 0; i < englishVoices.length; i++) {
    const option = document.createElement('option');
    option.textContent = `${englishVoices[i].name} (${englishVoices[i].lang})`;
    option.value = englishVoices[i].voiceURI;

    selectRef.appendChild(option);

    if (selectedVoiceURI === englishVoices[i].voiceURI) {
      option.selected = true;
    }

    selectRef.appendChild(option);
  }
};

export const getEnglishVoices = () => {
  const excludeVoices = [
    'Albert',
    'Bad News',
    'BadNews',
    'Bahh',
    'Boing',
    'Bubbles',
    'Cellos',
    'Good News',
    'GoodNews',
    'Zarvox',
    'オルガン',
    'Organ',
    'ささやき声',
    'Whisper',
    'スーパースター',
    'Princess',
    'トリノイド',
    'Trinoids',
    'ベル',
    'Bells',
    '震え',
    'Deranged',
    '道化',
    'Hysterical',
  ];
  const englishVoices = speechSynthesis
    .getVoices()
    .filter(
      (v) =>
        v.lang.startsWith('en') &&
        !excludeVoices.some((exclude) => v.voiceURI.includes(exclude))
    );

  return englishVoices;
};

export default SelectVoice;
