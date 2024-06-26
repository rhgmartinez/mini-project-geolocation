'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable('money_values', {
    treasure_id: {
      type: 'int',
    },
    amt: {
      type: 'varchar',
    },
  }, function (err) {
    if (err) return callback(err);
    return callback();
  });
};

exports.down = function (db, callback) {
  db.dropTable('money_values', callback);
};