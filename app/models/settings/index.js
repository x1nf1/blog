'use strict';

const db = require('@database/mysql');

module.exports.fetchSettings = async (columns = []) => {
  const sqlColumns = columns.length === 0 ? '*' : columns.join(',');
  const [settings] = await db.query(`SELECT ${sqlColumns} FROM settings`);
  return settings;
};

module.exports.update = async updateFields => {
  for (const settingName in updateFields) {
    await db.query(
      'UPDATE settings SET setting_value = ? WHERE setting_name = ?',
      [updateFields[settingName], settingName]
    );
  }
};

module.exports.get = async function(settingName) {
  const [settingValue] = await db.query(`
  SELECT setting_value
  FROM settings
  WHERE setting_name = ?
  `, [settingName]);
  return settingValue[0].setting_value ?? null;
};
