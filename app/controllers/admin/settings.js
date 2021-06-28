'use strict';

const settingsModel = require('@models/settings');
const defaultSettings = require('@models/settings/defaultSettings');

module.exports.index = async (req, res) => {
  const settings = await settingsModel.fetchSettings();
  const presentedSettings = {};

  settings.forEach(item => {
    presentedSettings[item.setting_name] = item.setting_value;
  });

  res.renderACP('admin/settings/index', {
    config: presentedSettings,
    helpers: {
      isChecked: function (checkbox, options) {
        return Number(checkbox) == 1 ? options.fn(this) : options.inverse(this);
      },
    },
  });
};

module.exports.update = async (req, res) => {
  const inputSettingsData = req.body;

  const updatedInputSettingData = { ...inputSettingsData };

  for (const settingName in defaultSettings) {
    updatedInputSettingData[settingName]
      ? (updatedInputSettingData[settingName] = 1)
      : (updatedInputSettingData[settingName] = 0);
  }

  await settingsModel.update(updatedInputSettingData);
  res.redirect('/admin/settings');
};
