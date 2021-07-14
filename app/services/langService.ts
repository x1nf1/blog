'use strict';

module.exports = class LangService {
  private static numbers = {
    0: '۰',
    1: '۱',
    2: '۲',
    3: '۳',
    4: '۴',
    5: '۵',
    6: '۶',
    7: '۷',
    8: '۸',
    9: '۹'
  };

  static numberToPersian(input: number) {
    return String(input)
      .split(' ')
      .map(char => (LangService.numbers[char] ? LangService.numbers[char] : char));
  }
};
