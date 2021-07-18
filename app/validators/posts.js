'use strict';

module.exports.validate = async data => {
  const errors = [];

  if (!data.title) errors.push('عنوان مطلب نمی تواند خالی باشد');
  if (!data.slug) errors.push('نامک مطلب نمی تواند خالی باشد');
  if (!data.content) errors.push('محتوای مطلب نمی تواند خالی باشد');
  if (!data.status) errors.push('وضعیت مطلب را انتخاب کنید');

  return errors;
};
