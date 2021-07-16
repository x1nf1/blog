'use strict';
const jalaliMoment = require('jalali-moment');

interface isDateService {
  dateToPersian(): string
}

module.exports = class JalaliMomentService implements isDateService {
  constructor(private _date: string, private _foramt: string = 'YYYY/MM/DD') {
  }

  dateToPersian(): string {
    return jalaliMoment(this._date).locale('fa').format(this._foramt);
  }
};
//# sourceMappingURL=dateServiceCopy.js.map
