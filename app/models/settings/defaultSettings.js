'use strict';

class DefaultSettings {
  constructor() {
    this.users_can_register = 1;
    this.users_can_submit_comment = 1;
  }
}

module.exports = new DefaultSettings();
