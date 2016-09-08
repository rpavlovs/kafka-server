let fs        = require('co-fs')
let supertest = require('co-supertest')
var sleep     = require('sleep')
let app       = require('../server/app')


describe('/log', () => {

  let server = supertest(app.listen())


  it('should write a log message to app.log', function* () {

    let logMessage = {
      actionId: 'LOG_TEST',
      userId  : '12345',
      data    : 'Log test'
    }

    var logJsonBefore = ''
    try {
      logJsonBefore = yield fs.readFile('app.log', 'utf8')  
    }
    catch(err) {
      if (err.code !== 'ENOENT') {
        throw err
      }
    }
    
    let r = yield server.post('/log').send(logMessage).end()

    r.status.should.equal(200)

    sleep.sleep(1)

    let logJsonAfter = yield fs.readFile('app.log', 'utf8')

    logJsonAfter.should.equal(
      logJsonBefore + JSON.stringify(logMessage) + '\r\n'
    )

  })


  it('should ignore requests with no actionId', function* () {

    let logMessage = {
      userId: '12345',
      data  : 'Log test'
    }

    let r = yield server.post('/log').send(logMessage).end()

    r.status.should.equal(400)

  })

})
