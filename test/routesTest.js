let supertest = require('co-supertest')
let app       = require('../server/app')
let models    = require('../server/models')


describe('User routes', () => {

  let server = supertest(app.listen())


  beforeEach( function* () {
    // drops and re-creates all tables
    yield models.sequelize.sync({ force : true })
  })


  it('should create a user', function* () {

    let testUser = {
      name    : 'Marcus',
      email   : 'm@rc.us',
      password: '123',
    }
    
    let r = yield server.post('/classes/user').send(testUser).end()

    r.status.should.equal(200)

    r.body.should.have.property('password', testUser.password)
    r.body.should.have.property('name', testUser.name)
    r.body.should.have.property('email', testUser.email)

    r.body.should.not.have.property('id', null)
    r.body.should.not.have.property('updatedAt', null)
    r.body.should.not.have.property('createdAt', null)
  
  })


  it('should not be create a user without name', function* () {

    let testUser = {
      email   : 'm@rc.us',
      password: '123',
    }
    
    let r = yield server.post('/classes/user').send(testUser).end()

    r.status.should.equal(400)

  })


  it('should not create a user without email', function* () {

    let testUser = {
      name    : 'Marcus',
      password: '123',
    }
    
    let r = yield server.post('/classes/user').send(testUser).end()

    r.status.should.equal(400)

  })


  it('should not create a user without password', function* () {

    let testUser = {
      name    : 'Marcus',
      email   : 'm@rc.us',
    }
    
    let r = yield server.post('/classes/user').send(testUser).end()

    r.status.should.equal(400)

  })

})
