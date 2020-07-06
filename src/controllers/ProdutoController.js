module.exports = function (app) {
  var controller = {};
  var produto = app.models.Produto;

  controller.salvaProduto = function (req, res) {
    const { descricao, valor, categoria} = req.body;

    if (!descricao || !valor || !categoria) return res.status(400).send({
      mensagem: 'Campos invalidos!',
      body: {
        required: {
          descricao: 'String',
          Valor: 'Number',
          categoria: 'ObjectId',
        }
      }
    })

    const body = {
      descricao, valor, categoria
    }

    produto.create(body).then(
      function (produto) {
        res.status(201).json(produto)
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  };

  controller.listaProdutos = function (req, res) {
    produto.find().populate('categoria').exec().then(
      function (produto) {
        const response = produto.map(e => {
          return {
            _id: e._id,
            descricao: e.descricao,
            valor:Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(e.valor),
            created: e.created,
            categoria: {
              _id: e.categoria._id,
              descricao: e.categoria.descricao,
            }
          }
        })
        res.status(200).json({ quantidade: produto.length, produto: response });
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  };

  controller.alterarProduto = function (req, res) {
    const { descricao, valor, categoria, _id} = req.body;

    if (!descricao || !valor || !categoria || !_id) return res.status(400).send({
      mensagem: 'Campos invalidos!',
      body: {
        required: {
          descricao: 'String',
          Valor: 'Number',
          categoria: 'ObjectId',
          _id: 'ObjectId',
        }
      }
    })

    const body = {
      descricao, valor, categoria, _id
    }

    produto.findByIdAndUpdate(_id, body).exec().then(
      function (produto) {
        res.status(200).json(produto);
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  };

  controller.removeProduto = function (req, res) {
    var _id = req.params.id;
    produto.remove({ "_id": _id }).exec().then(
      function (produto) {
        res.status(204).end();
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  };

  controller.obtemProduto = function (req, res) {
    const { id } = req.params;
    produto.findById(id).populate('categoria').exec().then(
      function (produto) {
        if (!produto) {
          res.status(404).end();
        } else {
          const response = {
            _id: produto._id,
            descricao: produto.descricao,
            valor:Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(produto.valor),
            created: produto.created,
            categoria: {
              _id: produto.categoria._id,
              descricao: produto.categoria.descricao,
            }
          }

          res.status(200).json({ produto: response });
        }
      }, function (erro) {
        console.error(erro);
        res.status(500).json(erro);
      }
    );
  }

  return controller;
}