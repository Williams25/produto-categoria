var mongoose = require('mongoose');
module.exports = function(){
    var schema = mongoose.Schema({
        descricao: {
            type: String,
            required: true
        },
        valor: {
            type: Number,
            required: false,
            default: function(v){
                if(this.valor < 0)
                    return 'O valor tem que ser maior que 0'
            }
        },
        ativo: {
            type: Boolean,
            required: false,
            default: function(v){
                this.ativo = true
            }
        },
        categoria: {
            type: mongoose.Schema.ObjectId,
            ref:'Categoria',
            required: true
        },
        created: {
            type: Date,
            default:Date.now,
            required: false
        }
    })
}