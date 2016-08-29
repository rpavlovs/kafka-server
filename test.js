var app       = require('./app.js')
let should    = require('should')
let Sequelize = require('sequelize')
let request   = require('supertest').agent(app.listen())


// 'postgres://username:password@host:port/db_name'
let POSTGRESQL_URL = 'postgres://' +
        'oudrxwjg:2zf_R3YnmfpwgJv_jLdqlUc-yoqDJxnt' +
        '@elmer.db.elephantsql.com:5432/' + 
        'oudrxwjg'

describe('Simple NodeJS App', () => {

  let sequelize = {}

  
  before( (done) => {
    sequelize = new Sequelize(POSTGRESQL_URL)
    done()
  })

  
  beforeEach( (done) => {
    // drops all tables and re-creates them
    sequelize.sync({ force : true })
    done()
  })


  it('Create a user', (done) => {

    let testUser = {
      name    : 'Marcus',
      email   : 'm@rc.us',
      password: '123',
    }
    
    request
      .post('/classes/user')
      .send(testUser)
      .expect(200)
      .expect('Content-Type', /json/)
      .end( (err, res) => {

        if (err) {
          throw err
        }

        res.body.name.should.equal(testUser.name)
        res.body.email.should.equal(testUser.email)
        res.body.password.should.equal(testUser.password)
        res.body.should.have.property("_id")
        res.body.should.not.equal(null)

        done()

      })
  
  })

})
