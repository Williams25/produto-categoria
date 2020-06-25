const load = require('express-load')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')

module.exports = () => {
    const app = express()
    app.set('port', 3300)
    app.use(bodyParser.urlencoded({
       extended: true
    }))
    app.use(bodyParser.json())
    app.use(require('method-override')())

    //enables cors
    app.use(cors({
      'allowedHeaders': ['sessionId', 'Content-Type'],
      'exposedHeaders': ['sessionId'],
      'origin': '*',
      'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'preflightContinue': false
    }))

    load('models',{
        cwd: 'src'
    }).then('controllers').then('routes').into(app)
    return app;
};
