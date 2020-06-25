const mongoose = require('mongoose')
mongoose.set('debug', true)

module.exports = uri => {
  mongoose.Promise = global.Promise
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  mongoose.connection.on('connected', () => {
    console.log('Mongoose! Conectado em ' + uri)
  })

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose! Desconectado de ' + uri)
  })

  mongoose.connection.on('error', erro => {
    console.log('Mongoose! Erro na conexão: ' + erro)
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose desconectado pelo término da aplicação')
      process.exit(0)
    })
  })

}