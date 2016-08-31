var co         = require('co')
var koa        = require('koa')
var route      = require('koa-route')

var models     = require('./models')
var userRoutes = require('./routes/user')

var app = module.exports = koa()


co(setupAndStart).catch(onerror)


/**
 * Setup server and start listening
 */
function *setupAndStart() {
  
  // Connect to DB and sync models
  yield models.sequelize.sync()

  // Setup routes
  app.use(route.post('/classes/user/', userRoutes.add))
  
  app.listen(3000)
  console.log('Connected to database and listening on port 3000')

}


/**
 * Server error handler
 * @param {error} err object containing error info
 */
function onerror(err) {
  console.error(err.stack)
}