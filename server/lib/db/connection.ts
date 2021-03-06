import mongoose from 'mongoose'
import configuration from '../../configuration'

mongoose.Promise = global.Promise

const connection = mongoose.createConnection(configuration.dbURL)

// Suppress logging when testing
function log (...args: any[]) {
  if (configuration.nodeEnv !== 'test') {
    console.log(...args)
  }
}

connection.on('connecting', function () {
  log('connecting to Mongoconnection...')
})
connection.on('error', function (error) {
  console.error('Error in Mongoconnection connection: ' + error.message)
  mongoose.disconnect()
    .catch(error => {
      console.error(error)
    })
})
connection.on('connected', function () {
  log('Mongoconnection connected!')
})
connection.once('open', function () {
  log('Mongoconnection connection opened!')
})
connection.on('reconnected', function () {
  log('Mongoconnection reconnected!')
})
connection.on('disconnected', function () {
  log('Mongoconnection disconnected!')
})

export default connection
