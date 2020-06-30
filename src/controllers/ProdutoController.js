module.exports = function (app){
    var controller = {};
    var produto = app.models.produto;

    controller.salvaProduto = function (req, res){
        produto.create(req.body).then(
            function (produto){
                res.status(201).json(produto)
            }, function (erro){
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    };

    controller.listaProdutos = function (req, res){
        produto.find().exec().then(
            function (produto){
                res.status(200).json(produto);
            }, function (erro){
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    };

    controller.alterarProduto = function (req, res){
        var _id = req.body.id;
        produto.findByIdAndUpdate(_id, req.body).exc().then(
            function (produto){
                res.status(200).json(produto);
            }, function (erro){
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    };

    controller.removeProduto = function (req,res){
        var _id = req.params.id;
        produto.remove({"_id": _id}).exec().then(
            function(produto){
                res.status(204).end();
            }, function(erro){
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    };

    controller.obtemProduto = function (req, res) {
        var _id = req.params.id;
        produto.findById(_id).exec().then(
            function(produto){
                if(!produto){
                    res.status(404).end();
                }else{
                    res.produto(200).json(produto);
                }
            }, function (erro){
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    }

    return controller;
}