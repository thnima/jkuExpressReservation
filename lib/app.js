var express = require('express')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

const port = 8080

var events = require('./api/controllers/events')
var users = require('./api/controllers/users')
var registrations = require('./api/controllers/registrations')
var swagger = require('./api/controllers/swagger')
var authCheck = require('./api/utils/auth')
const cors = require('cors');

var app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(cookieParser())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://jku-react-reservation.s3-website.eu-central-1.amazonaws.com");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


app.use('/api/users', users)
app.use(authCheck);
app.use('/api/events', events)
app.use('/api/registrations', registrations)
app.use('/api/docs', swagger.router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  console.error(`Error catched! ${err}`)

  const error = {
    status: err.status || 500,
    message: err.message
  }

  res.status(error.status).send(error)
})

function onError (error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port

    // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

function onListening () {
  const addr = app.address()
  const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
  console.log('\nListening on ' + bind)
}

const isInLambda = !!process.env.LAMBDA_TASK_ROOT;
if (isInLambda) {
    const serverlessExpress = require('aws-serverless-express');
    const server = serverlessExpress.createServer(app);
    exports.main = (event, context) => serverlessExpress.proxy(server, event, context)
} else {
  app.listen(port)
  app.on('error', onError)
  app.on('listening', onListening)
  console.log('Server started on port ' + port)
}
