var supertest = require('co-supertest')
var app       = require('../server/app')
var models    = require('../server/models')

var server = supertest(app.listen())


describe('User routes', () => {

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

})
