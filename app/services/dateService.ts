'use strict';
const jalaliMoment = require('jalali-moment');

module.exports = class DateService {
  static dateToPersian(date, format = 'YYYY/MM/DD') {
    return jalaliMoment(date).locale('fa').format(format);
  }
};
//# sourceMappingURL=dateServiceCopy.js.map
