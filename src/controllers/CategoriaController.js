module.exports = function (app) {
  var controller = {};
  var categoria = app.models.Categoria;

  controller.salvaCategoria = function (req, res) {
    const { descricao } = req.body;

    if (!descricao) return res.status(400).send({
      mensagem: 'Campos invalidos!',
      body: {
        required: {
          descricao: 'String'
        }
      }
    })
    const body = {
      descricao
    }

    categoria.create(body).then(
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
        const response = categoria.map(e => {
          return {
            _id: e._id,
            descricao: e.descricao
          }
        })
        res.status(200).json({ quantidade: categoria.length, categoria: response });
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  };

  controller.alterarCategoria = function (req, res) {
    const { descricao, _id } = req.body;

    if (!descricao || !_id) return res.status(400).send({
      mensagem: 'Campos invalidos!',
      body: {
        required: {
          descricao: 'String',
          _id: 'ObjectId'
        }
      }
    })
    const body = {
      descricao, _id
    }

    categoria.findByIdAndUpdate(_id, body).exec().then(
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
          const response = {
            _id: categoria._id,
            descricao: categoria.descricao
          }
          res.status(200).json({ categoria: response });
        }
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  }

  return controller;
}