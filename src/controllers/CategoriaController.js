module.exports = function (app) {
  var controller = {};
  var categoria = app.models.Categoria;

  controller.salvaCategoria = function (req, res) {
    categoria.create(req.body).then(
      function (categoria) {
        res.status(201).json(categoria)
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  };

  controller.listaCategoria = function (req, res) {
    categoria.find().exec().then(
      function (categoria) {
        res.status(200).json(categoria);
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  };

  controller.alterarCategoria = function (req, res) {
    var _id = req.body.id;
    categoria.findOneAndUpdate(_id, req.body).exec().then(
      function (categoria) {
        res.status(200).json(categoria);
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  };

  controller.removeCategoria = function (req, res) {
    var _id = req.params.id;
    categoria.remove({ "_id": _id }).exec().then(
      function (categoria) {
        console.log(categoria)
        res.status(204).end();
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  };

  controller.obtemCategoria = function (req, res) {
    var _id = req.params.id;
    categoria.findById(_id).exec().then(
      function (categoria) {
        if (!categoria) {
          res.status(404).end();
        } else {
          res.status(200).json(categoria);
        }
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  }

  return controller;
}