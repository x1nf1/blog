'use strict';

module.exports.validate = async data => {
  const status = { errors: [] };

  if (!data.title) status.errors.push('عنوان مطلب نمی تواند خالی باشد');
  if (!data.slug) status.errors.push('نامک مطلب نمی تواند خالی باشد');
  if (!data.content) status.errors.push('محتوای مطلب نمی تواند خالی باشد');
  if (!data.status) status.errors.push('وضعیت مطلب را انتخاب کنید');

  return status;
};
