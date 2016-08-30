var app       = require('./app.js')
var should    = require('should')     // eslint-disable-line no-unused-vars
var Sequelize = require('sequelize')
var request   = require('supertest').agent(app.listen())


// 'postgres://username:password@host:port/db_name'
var POSTGRESQL_URL = 'postgres://' +
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
    sequelize.sync({ force : true }).then( () => {
      done()
    })
    
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
        
        res.body.should.have.property('id')
        res.body.id.should.not.equal(null)
        
        res.body.should.have.property('updatedAt')
        res.body.updatedAt.should.not.equal(null)

        res.body.should.have.property('createdAt')
        res.body.createdAt.should.not.equal(null)

        done()

      })
  
  })

})
