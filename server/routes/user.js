let parse  = require('co-body')
let should = require('should')
let _      = require('underscore')
let models = require('../models')

let handlers = module.exports = {}

/**
 * Handles user creation
 */
function *add() {
  
  let data = yield parse(this)

  // Validate user fileds
  data.should.have.property('name')
  data.name.should.not.equal(null)

  data.should.have.property('email')
  data.email.should.not.equal(null)

  data.should.have.property('password')
  data.password.should.not.equal(null)

  // Create user
  let newUser = yield models.User.create(
    _(data).pick('name', 'email', 'password')
  )

  this.body = newUser
  this.status = 200

}
handlers.add = add


/**
 * Handles user updates
 */
function *update(id) {

  let data = yield parse(this)

  // Validate user fileds
  data.should.have.any.properties('name', 'password')
  
  data.should.not.have.property('name', null)
  data.should.not.have.property('password', null)

  data.should.not.have.property('email')
  
  let user = yield models.User.find({
    where: { id: id }
  })

  should.exist(user)

  let updatedUser = yield user.updateAttributes(
    _(data).pick('name', 'password')
  )

  this.body = updatedUser
  this.status = 200

}
handlers.update = update

