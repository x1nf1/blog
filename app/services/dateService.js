'use strict';

const moment = require('jalali-moment');

exports.dateToPersian = (date, format = 'YYYY/MM/DD') => {
  return moment(date).locale('fa').format(format);
};
