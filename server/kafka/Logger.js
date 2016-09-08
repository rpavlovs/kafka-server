var co    = require('co')
var fs    = require('co-fs')
var Kafka = require('no-kafka')

var logger = module.exports = {}

const connectionSettings = {
  connectionString: 'dogsled-01.srvs.cloudkafka.com:9093,' +
                    'dogsled-02.srvs.cloudkafka.com:9093,' + 
                    'dogsled-03.srvs.cloudkafka.com:9093',
  ssl: {
    certFile: __dirname + '/CLOUDKAFKA.crt',
    keyFile:  __dirname + '/CLOUDKAFKA.key'
  }
}

let consumer = new Kafka.SimpleConsumer(connectionSettings)
let producer = new Kafka.Producer(connectionSettings)

let isProducerReady = false

producer.init().then( () => {
  isProducerReady = true
})

consumer.init().then( () => {
  consumer.subscribe('gjgr-kafka-test-topic', dataHandler)
})


/**
 * Handler for new Kafka messages.
 * Writes all new messages to app.lo
 */
function dataHandler(messageSet) {
  
  messageSet.forEach( (m) => {
    console.log(m.message.value.toString('utf8'))
    co(fs.appendFile('app.log', m.message.value.toString('utf8') + '\r\n'))
  })

}


/**
 * Send log to Kafka
 */
function *co_log(msg) {
  
  if (!isProducerReady) {
    console.log('Waiting for producer')
    yield producer.init()
  }

  yield producer.send({
    topic:      'gjgr-kafka-test-topic',
    partition:  0,
    message: {
      value: JSON.stringify(msg)
    }
  })

}

/**
 * Async wrapper for co_log
 */
function log(msg) {
  co(co_log(msg))
}
logger.log = log