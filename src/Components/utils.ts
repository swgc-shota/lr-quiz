import { getEnglishVoices } from './SelectVoice';

export const getDefaultVoiceURI = () => {
  const savedVoiceURI = localStorage.getItem('voiceURI');
  if (savedVoiceURI === null) {
    const voice = getRecommendVoice();
    return voice === undefined ? '' : voice.voiceURI;
  }
  return savedVoiceURI;
};

const getRecommendVoice = () => {
  const englishVoices = getEnglishVoices();

  englishVoices.find((v) =>
    ['Andrew Online', 'Aaron', 'com.apple.eloquence.en-US.Eddy'].includes(
      v.voiceURI
    )
  );

  return getEnglishVoices()
    .reverse()
    .find((v) =>
      ['Andrew Online', 'Aaron', 'com.apple.eloquence.en-US.Eddy'].some((r) =>
        v.voiceURI.includes(r)
      )
    );
};

export const speech = async (
  text: string,
  selectedVoiceURI: string
): Promise<boolean> => {
  if (!('speechSynthesis' in window)) {
    alert(
      'お使いのブラウザは音声読み上げに対応していません。Chrome、Safari、Edgeなどの最新のブラウザでご利用ください。'
    );
    return false;
  }

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    let voice = undefined;
    if (selectedVoiceURI !== '') {
      voice = getEnglishVoices().find((v) => v.voiceURI === selectedVoiceURI);
    } else {
      voice = getRecommendVoice();
    }

    if (voice === undefined) {
      voice = getEnglishVoices()[0];
    }

    if (voice !== undefined) {
      utterance.voice = voice;
    }

    const speakPromise = new Promise<boolean>((resolve) => {
      utterance.onend = () => resolve(true);
      utterance.onerror = () => resolve(false);
    });

    window.speechSynthesis.speak(utterance);

    return await speakPromise;
  } catch (error) {
    console.error('Text to Speech エラー:', error);
    return false;
  }
};

export const bounceIcon = (button: HTMLButtonElement) => {
  const svg = button.firstElementChild;
  const target = svg instanceof SVGElement ? svg : button;

  target.classList.add('animate-bounce-once');
  setTimeout(() => {
    target.classList.remove('animate-bounce-once');
  }, 500);
};

type CustomEvent = 'updatequestIndex' | 'resetQuestions' | 'changeVoiceURI';
export function fireCustomEvent<T>(
  eventName: CustomEvent,
  detail?: T,
  target: EventTarget = document
): void {
  const event = new CustomEvent(eventName, {
    detail: detail,
    bubbles: true,
    cancelable: true,
  });

  target.dispatchEvent(event);
}
