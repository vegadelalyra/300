// import express node for server methods
const express = require('express'),
// save the express node object in a const
      app = express()

// set port to the one provided for the enviroment; else, use local port 3000
app.set('port', process.env.PORT || 3000)

// static files
app.use(express.static('public'))

// starting the server (app.get(port) to access to the map of env.PORT || 3000)
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'))
})