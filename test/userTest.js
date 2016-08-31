let models = require('../server/models')

describe('User', () => {

  let user     = {}
  let testUser = {
    name    : 'tst',
    email   : 'test@test.com',
    password: 'pwd'
  }


  before(function* () {
    user = yield models.User.create(testUser)
  })


  it('should have a name', () => {
    user.should.have.property('name', testUser.name)
  })


  it('should have a password', () => {
    user.should.have.property('password', testUser.password)
  })


  it('should have an email', () => {
    user.should.have.property('email', testUser.email)
  })


  it('should have a not null creation date', () => {
    user.should.not.have.property('createdAt', null)
  })


  it('should have a not null last update date', () => {
    user.should.not.have.property('updatedAt', null)
  })

})