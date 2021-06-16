'use strict';

const db = require('@database/mysql');

module.exports.fetchSessions = async (columns = [], sessID) => {
  const sqlColumns = columns.length == 0 ? '*' : columns.join(',');
  const [[result]] = await db.query(
    `SELECT ${sqlColumns} FROM sessions
     WHERE session_id = ?`,
    sessID
  );

  return result;
};

module.exports.updateSessions = async (data, sessID) => {
  const [result] = await db.query(
    `UPDATE sessions SET errors = '${data}'
     WHERE session_id = '${sessID}'`
  );

  return result;
};

module.exports.deleteSession;
