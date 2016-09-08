let fs        = require('co-fs')
let supertest = require('co-supertest')
let app       = require('../server/app')


describe('/log', () => {

  let server = supertest(app.listen())


  describe('#create', () => {

    beforeEach( function* () {

    })


    it('should write a log message to app.log', function* () {

      let logMessage = {
        actionId: 'LOG_TEST',
        userId  : '12345',
        data    : 'Log test'
      }

      let logJsonBefore = yield fs.readFile('app.log', 'utf8')

      let r = yield server.post('/log').send(logMessage).end()

      r.status.should.equal(200)

      let logJsonAfter = yield fs.readFile('app.log', 'utf8')

      logJsonAfter.should.equal(logJsonBefore + logMessage)

    })

  })

})
