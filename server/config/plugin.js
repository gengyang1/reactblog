'use strict';

/** @type Egg.EggPlugin */


exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

// config/plugin.js
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
