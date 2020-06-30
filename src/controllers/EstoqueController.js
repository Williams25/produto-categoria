module.exports = function (app) {
  var controller = {};
  var estoque = app.models.Estoque;

  controller.salvaEstoque = function (req, res) {
    const { produto, quantidadedeMinimaEstoque, quantidadedeEstoque } = req.body;

    if (!produto || !quantidadedeMinimaEstoque || !quantidadedeEstoque) return res.status(400).send({
      mensagem: 'Campos invalidos!',
      body: {
        required: {
          produto: 'ObjectId',
          quantidadedeMinimaEstoque: 'Number',
          quantidadedeEstoque: 'Number',
        }
      }
    })

    const body = {
      produto, quantidadedeMinimaEstoque, quantidadedeEstoque
    }

    estoque.create(body).then(
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
        const response = estoque.map(e => {
          return {
            _id: e._id,
            quantidadedeMinimaEstoque: e.quantidadedeMinimaEstoque,
            quantidadedeEstoque: e.quantidadedeEstoque,
            produto: {
              _id: e.produto._id,
              categoria: e.produto.categoria,
              descricao: e.produto.descricao,
              valor: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(e.produto.valor),
              ativo: e.produto.ativo,
            }
          }
        })
        res.status(200).json({ quantidade: estoque.length, estoque: response });
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  };

  controller.alteraEstoque = function (req, res) {
    const { quantidadedeMinimaEstoque, quantidadedeEstoque, _id } = req.body;

    if (!quantidadedeMinimaEstoque || !quantidadedeEstoque || !_id) return res.status(400).send({
      mensagem: 'Campos invalidos!',
      body: {
        required: {
          _id: 'ObjectId',
          quantidadedeMinimaEstoque: 'Number',
          quantidadedeEstoque: 'Number',
        }
      }
    })

    const body = {
      quantidadedeMinimaEstoque, quantidadedeEstoque, _id
    }

    estoque.findByIdAndUpdate(_id, body).exec().then(
      function (estoque) {
        res.status(200).json(estoque);
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  }

  controller.removeEstoque = function (req, res) {
    const { id } = req.params;
    estoque.remove({ "_id": id }).exec().then(
      function (estoque) {
        res.status(204).end();
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  }

  controller.obtemEstoque = function (req, res) {
    const { id } = req.params;
    estoque.findById(id).populate('produto').exec().then(
      function (estoque) {
        if (!estoque) {
          res.status(404).end();
        } else {
          const response = {
            _id: estoque._id,
            quantidadedeMinimaEstoque: estoque.quantidadedeMinimaEstoque,
            quantidadedeEstoque: estoque.quantidadedeEstoque,
            created: estoque.created,
            produto: {
              _id: estoque.produto._id,
              categoria: estoque.produto.categoria,
              descricao: estoque.produto.descricao,
              valor: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(estoque.produto.valor),
              ativo: estoque.produto.ativo,
              created: estoque.produto.created,
            }
          }

          res.status(200).json({ estoque: response });
        }
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  }

  return controller;
}