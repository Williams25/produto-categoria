module.exports = function (app) {
	var controller = app.controllers.CategoriaController;

	app.post('/categorias', controller.salvaCategoria);
	app.get('/categorias', controller.listaCategoria);
	app.put('/categorias', controller.alterarCategoria);
	app.delete('/categorias/:id', controller.removeCategoria);
	app.get('/categorias/:id', controller.obtemCategoria);
};