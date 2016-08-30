var koa = require('koa')
var app = module.exports = koa()
var routes = require('koa-route')
var parse = require('co-body')
var db = require('./db')
var co = require('co')

app.use(routes.post('/classes/user', add))
function *add() {
  
  var postedUser = yield parse(this)

  var newUser = yield db.User.create(postedUser)

  this.body = newUser
  this.status = 200

}


co.wrap(function *(){
  var connection = yield db.sequelize.sync()
  if(connection){
    app.listen(3000)
    console.log('Connected to database and listening on port 3000')
  }
})()