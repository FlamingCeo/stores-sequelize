'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);


const db = {};
let sequelize
const connectDB = require('../db/connect');
sequelize = connectDB()


//commonfield
const commonFields = {
  created_by:{
      type: Sequelize.DataTypes.UUID,
  },
  updated_by:{
      type: Sequelize.DataTypes.UUID,
  }
};

sequelize.addHook('beforeDefine', (attributes, options) => {
  Object.assign(attributes, commonFields);
  options.timestamps = true
  //deleted_at
  options.paranoid = true
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {

    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;