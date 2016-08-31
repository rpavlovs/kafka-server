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


  describe('create', () => {
  
    it('should store name', () => {
      user.should.have.property('name', testUser.name)
    })


    it('should store password', () => {
      user.should.have.property('password', testUser.password)
    })


    it('should store email', () => {
      user.should.have.property('email', testUser.email)
    })


    it('should store creation date', () => {
      user.should.not.have.property('createdAt', null)
    })


    it('should store last update date', () => {
      user.should.not.have.property('updatedAt', null)
    })

  })



  describe('update', () => {

    it('should change name', function *() {
      yield user.updateAttributes({name: 'tstUpdate'})
      user.name.should.equal('tstUpdate')
    })


    it('should change email', function *() {
      yield user.updateAttributes({name: 'testUpdate@test.com'})
      user.name.should.equal('testUpdate@test.com')
    })


    it('should change password', function *() {
      yield user.updateAttributes({name: 'pwdUpdate'})
      user.name.should.equal('pwdUpdate')
    })


    it('should change update date', function *() {
      let lastUpdatedAt = user.updateAt
      yield user.updateAttributes({name: 'tstUpdate'})
      user.updatedAt.should.not.equal(lastUpdatedAt)
    })


    it('should not change creation date', function *() {
      let lastCreatedAt = user.createdAt
      yield user.updateAttributes({name: 'tstUpdate'})
      user.createdAt.should.equal(lastCreatedAt)
    })

  })

})