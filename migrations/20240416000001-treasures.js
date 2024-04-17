'use strict';

var dbm;
var type;
var seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable('treasures', {
    id: {
      type: 'int',
      primaryKey: true
    },
    latitude: {
      type: 'string'
    },
    longitude: {
      type: 'string'
    },
    name: {
      type: 'string',
      length: 50
    },
  }, function (err) {
    if (err) return callback(err);
    return callback();
  });
};

exports.down = function (db, callback) {
  db.dropTable('treasures', callback);
};
