export interface SpeechOptions {
  lang?: string;
  pitch?: number;
  rate?: number;
  volume?: number;
}

export const speech = async (
  text: string,
  options: SpeechOptions = {}
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

    utterance.lang = options.lang || 'en-US';
    utterance.pitch = options.pitch || 1.0; // ピッチを設定（0.0～2.0）
    utterance.rate = options.rate || 1.0; // 速度を設定（0.1～10.0）
    utterance.volume = options.volume || 1.0; // 音量を設定（0.0～1.0）

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

type CustomEvent = 'updatequestIndex' | 'resetQuestions';
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
