let parse  = require('co-body')
let models = require('../models')

let handlers = module.exports = {}

/**
 * Handles user creation
 */
function *add() {
  
  let postedUser = yield parse(this)

  postedUser.should.have.property('name')
  postedUser.name.should.not.equal(null)
  
  postedUser.should.not.have.property('email', null)
  postedUser.should.not.have.property('password', null)

  let newUser = yield models.User.create(postedUser)

  this.body = newUser
  this.status = 200

}
handlers.add = add

