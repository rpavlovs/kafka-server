let parse  = require('co-body')
let models = require('../models')

let handlers = module.exports = {}

/**
 * Handles user creation
 */
function *add() {
  
  let postedUser = yield parse(this)

  // Validate user fileds
  postedUser.should.have.property('name')
  postedUser.name.should.not.equal(null)

  postedUser.should.have.property('email')
  postedUser.email.should.not.equal(null)

  postedUser.should.have.property('password')
  postedUser.password.should.not.equal(null)

  // Create user
  let newUser = yield models.User.create(postedUser)

  this.body = newUser
  this.status = 200

}
handlers.add = add

