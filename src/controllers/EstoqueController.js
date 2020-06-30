module.exports = function (app) {
  var controller = {};
  var estoque = app.models.Estoque;

  controller.salvaEstoque = function (req, res) {
    estoque.create(req.body).then(
      function (estoque) {
        res.status(201).json(estoque)
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  };

  controller.listaEstoque = function (req, res) {
    estoque.find().populate('produto').exec().then(
      function (estoque) {
        res.status(200).json(estoque);
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  };

  controller.alteraEstoque = function (req, res) {
    var _id = req.body._id;
    estoque.findByIdAndUpdate(_id, req.body).exec().then(
      function (estoque) {
        res.status(200).json(estoque);
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  }

  controller.removeEstoque = function (req, res) {
    var _id = req.params.id;
    estoque.remove({ "_id": _id }).exec().then(
      function (estoque) {
        res.status(204).end();
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  }

  controller.obtemEstoque = function (req, res) {
    var _id = req.params.id;
    estoque.findById(_id).populate('produto').exec().then(
      function (estoque) {
        if (!estoque) {
          res.status(404).end();
        } else {
          res.status(200).json(estoque);
        }
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  }

  return controller;
}