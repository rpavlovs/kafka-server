let supertest = require('co-supertest')
let app       = require('../server/app')
let models    = require('../server/models')


describe('/classes/user', () => {

  let server = supertest(app.listen())


  describe('#create', () => {

    beforeEach( function* () {
      // drop and re-creates all tables
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
      r.body.should.have.property('id')
      r.body.should.have.property('updatedAt')
      r.body.should.have.property('createdAt')

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


    it('should strip down extra data fields', function* () {

      let testUser = {
        name      : 'Marcus',
        email     : 'm@rc.us',
        password  : '123',
        extraStaff: 'qwerty',
      }
      
      let r = yield server.post('/classes/user').send(testUser).end()

      r.body.should.not.have.property('extraStaff')

    })

  })



  describe('#update', () => {

    let user = {}
    let testUserData = {
      name    : 'Marcus',
      email   : 'm@rc.us',
      password: '123',
    }

    beforeEach( function* () {
      
      // drop and re-creates all tables
      yield models.sequelize.sync({ force : true })
      
      // create test user
      user = yield server.post('/classes/user').send(testUserData).end()
    
    })


    it('should update user name only', function* () {

      let update = {
        name: 'MarcusUpdated'
      }

      let r = yield server.put('/classes/user' + user.id).send(update).end()
      
      r.body.name.should.equal(update.name)
      r.body.email.should.equal(testUserData.email)
      r.body.password.should.equal(testUserData.password)

    })

    it('should update user password only', function* () {

      let update = {
        password: '123'
      }

      let r = yield server.put('/classes/user' + user.id).send(update).end()
      
      r.body.password.should.equal(update.password)
      r.body.name.should.equal(testUserData.name)
      r.body.email.should.equal(testUserData.email)
      
    })


    it('should not update user email', function* () {

      let update = {
        email: 'mUpdated@rc.us'
      }

      let r = yield server.put('/classes/user' + user.id).send(update).end()
      
      r.status.should.equal(400)
      
    })
  
  })

})
