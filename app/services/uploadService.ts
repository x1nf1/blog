'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = class UploadService {
  static async upload(file, directory = 'thumbnails') {
    if (!file) return null;
    else {
      let fileFormat = file.name.split('.');
      fileFormat = fileFormat[fileFormat.length - 1];
      const newFileName = `${uuidv4()}.${fileFormat}`;
      await file.mv(`${process.env.PWD}/public/uploads/${directory}/${newFileName}`);
      return newFileName;
    }
  }
};
