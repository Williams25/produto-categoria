// importa biblioteca http
const http = require('http');
// importa arquivo de configuração principal
const app = require('./config/express')();
// importa arquivo de configuração do banco
require('./config/database.js')('mongodb://127.0.0.1/produto_categoria');
// cria servidor web / inicia a aplicação
http.createServer(app).listen(app.get('port'),
    () => {
        // mostra mensagem no console do terminal
        console.log('Express Server Escutando na porta '
        +app.get('port'));
    } 
)
// npm install body-parser express express-load method-override mongodb mongoose cors --save
// npm i mongoose-type-email --s 
// npm i nodemon -D