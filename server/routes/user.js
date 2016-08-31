let parse  = require('co-body')
let models = require('../models')

let handlers = module.exports = {}

/**
 * Handles user craetion
 */
function *add() {
  
  let postedUser = yield parse(this)

  let newUser = yield models.User.create(postedUser)

  this.body = newUser
  this.status = 200

}
handlers.add = add

