var User = require('../server/models').User

describe('User', () => {

  var user = {}


  before(function* () {
    user = yield User.create({
      name: 'tst',
      email: 'test@test.com',
      password: 'pwd'
    })
  })


  it('should have a name', () => {
    user.should.have.property('name', 'tst')
  })


  it('should have a password', () => {
    user.should.have.property('password', 'pwd')
  })


  it('should have an email', () => {
    user.should.have.property('email', 'test@test.com')
  })


  it('should have a not null creation date', () => {
    user.should.not.have.property('createdAt', null)
  })

  it('should have a not null last update date', () => {
    user.should.not.have.property('updatedAt', null)
  })

})