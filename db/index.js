var fs = require('fs')
var path = require('path')
var Sequelize = require('sequelize')

// 'postgres://username:password@host:port/db_name'
let POSTGRESQL_URL = 'postgres://' +
        'oudrxwjg:2zf_R3YnmfpwgJv_jLdqlUc-yoqDJxnt' +
        '@elmer.db.elephantsql.com:5432/' + 
        'oudrxwjg'

var models = {}
var sequelize = new Sequelize(POSTGRESQL_URL)

// read all models and import them into the "db" object
fs
  .readdirSync(__dirname + '/models')
  .filter( (file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach( (file) => {
    var model = sequelize.import(path.join(__dirname + '/models', file))
    models[model.name] = model
  })

Object.keys(models).forEach( (modelName) => {
  if (models[modelName].options.hasOwnProperty('associate')) {
    models[modelName].options.associate(models)
  }
})

module.exports = models
module.exports.sequelize = sequelize