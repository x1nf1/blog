'use strict';

module.exports.validate = async data => {
  const result = {
    messages: [],
    errors: [],
    isSuccessful: null,
  };

  if (!data.title) result.errors.push('عنوان مطلب نمی تواند خالی باشد');
  if (!data.slug) result.errors.push('نامک مطلب نمی تواند خالی باشد');
  if (!data.content) result.errors.push('محتوای مطلب نمی تواند خالی باشد');
  if (!data.status) result.errors.push('وضعیت مطلب را انتخاب کنید');
  result.isSuccessful = result.errors.length === 0;

  return result;
};
