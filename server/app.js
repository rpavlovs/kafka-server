let co         = require('co')
let koa        = require('koa')
let route      = require('koa-route')
let onerror    = require('koa-onerror')
let models     = require('./models')
let userRoutes = require('./routes/user')

let app = module.exports = koa()


let port = null

co(setupAndStart).catch(onSetupError)


/**
 * Setup server and start listening
 */
function *setupAndStart() {
  
  // Try to get port from env
  port = normalizePort(process.env.PORT || '3000')

  // Connect to DB and sync models
  yield models.sequelize.sync()

  // Setup error handling
  onerror(app)

  // Setup middleware
  app.use(onError)

  // Setup routes
  app.use(route.post('/classes/user/', userRoutes.add))

  
  app.listen(port)
  console.log('Connected to database and listening on port 3000')

}


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  let port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}


/**
 * Custom error handler
 */
function *onError(next) {

  try {
    yield next
  } 
  catch (err) {

    if (err.assertion) {
      this.status = 400
      this.body = '400 Bad Request - ' + err.message
      console.error(this.body)
      return
    }

    this.status = err.status || 500
    this.body = err.message
    console.error(err.message)

  }

}


/**
 * Event listener for HTTP server "error" event.
 * @param {error} err object containing error info
 */
function onSetupError(err) {

  if (err.syscall !== 'listen') {
    throw err
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (err.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges')
    process.exit(1)
    break
  case 'EADDRINUSE':
    console.error(bind + ' is already in use')
    process.exit(1)
    break
  default:
    throw err
  }
  console.error(err.stack)

}