import { describe, expect, it } from 'vitest';
import { WORD_PAIRS } from './words';

describe('WORD_PAIRS', () => {
  it('各ペアのleftプロパティが存在する', () => {
    WORD_PAIRS.forEach((pair) => {
      expect(pair).toHaveProperty('left');
    });
  });

  it('各ペアのrightプロパティが存在する', () => {
    WORD_PAIRS.forEach((pair) => {
      expect(pair).toHaveProperty('right');
    });
  });

  it('leftプロパティに"l"が含まれているかチェック', () => {
    WORD_PAIRS.forEach((pair) => {
      const hasL = pair.left.toLowerCase().includes('l');
      expect(hasL).toBe(true);
      if (!hasL) {
        console.log(`Warning: "${pair.left}" doesn't contain "l"`);
      }
    });
  });

  it('重複するペアがないかチェック', () => {
    const pairStrings = WORD_PAIRS.map((pair) =>
      JSON.stringify([pair.left, pair.right].sort())
    );

    const duplicatePairs = pairStrings.filter(
      (pair, index) => pairStrings.indexOf(pair) !== index
    );

    const message =
      duplicatePairs.length > 0
        ? `重複あり: ${duplicatePairs.map((p) => JSON.parse(p)).join(', ')}`
        : '重複なし';

    expect(duplicatePairs, message).toHaveLength(0);
  });

  it('rightプロパティに"r"が含まれているかチェック', () => {
    WORD_PAIRS.forEach((pair) => {
      const hasR = pair.right.toLowerCase().includes('r');
      expect(hasR).toBe(true);
      if (!hasR) {
        console.log(`Warning: "${pair.right}" doesn't contain "r"`);
      }
    });
  });

  it('型チェック: leftとrightが文字列である', () => {
    WORD_PAIRS.forEach((pair) => {
      expect(typeof pair.left).toBe('string');
      expect(typeof pair.right).toBe('string');
    });
  });

  // すべてのペアを一度に確認する総合テスト
  it('すべてのペアが条件を満たしている', () => {
    const invalidPairs = WORD_PAIRS.filter((pair) => {
      const hasL = pair.left.toLowerCase().includes('l');
      const hasR = pair.right.toLowerCase().includes('r');
      return !hasL || !hasR;
    });

    if (invalidPairs.length > 0) {
      console.log('Invalid pairs:', invalidPairs);
    }

    expect(invalidPairs).toHaveLength(0);
  });
});
