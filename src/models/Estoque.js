var mongoose = require('mongoose');
module.exports = function () {
  var schema = mongoose.Schema({
    produto: {
      type: mongoose.Schema.ObjectId,
      ref: 'Produto',
      required: true
    },
    quantidadedeEstoque: {
      type: Number,
      required: true,
      min: [this.quantidadedeEstoque >= 1],
    },
    quantidadedeMinimaEstoque: {
      type: Number,
      required: true,
      min: [this.quantidadedeMinimaEstoque >= 1],
    },
    created: {
      type: Date,
      required: false,
      default: Date.now
    }
  })
  return mongoose.model('Estoque', schema)
}