module.exports = app => {
  const controller = app.controllers.EstoqueController

  app.get('/estoques', controller.listaEstoque)
  app.get('/estoques/:id', controller.obtemEstoque)
  app.post('/estoques', controller.salvaEstoque)
  app.put('/estoques', controller.alteraEstoque)
  app.delete('/estoques/:id', controller.removeEstoque)
} 