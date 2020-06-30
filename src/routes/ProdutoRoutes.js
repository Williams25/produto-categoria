module.exports = function (app){
    var controller = app.controllers.Produto;

    app.post('/produtos', controller.salvaProduto);
    app.get('/produtos', controller.listaProdutos);
    app.put('/produtos', controller.alterarProduto);
    app.delete('/produtos', controller.removeProduto);
    app.get('/produtos/:id', controller.obtemProduto);
};