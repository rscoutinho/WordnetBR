Wordnet BR/Tradução


Para utilizar é necessário primeiro instalar os programas:




.Node.js  - http://nodejs.org/

.express.js  - http://expressjs.com/

.couchDB  - http://couchdb.apache.org/

.cradle  - https://github.com/cloudhead/cradle




Em seguida, é necessário salvar alguns synsets no banco de dados. Para isso, é possível usar o arquivo "registro.js". Abra a tela de comando, e execute node registro.js. Depois, entre em http://localhost:3467/index e registre alguns synsets.

Além disso, é importante gravar no banco de dados o mapa dos views, par isso faça o mesmo procedimento anterior só que executando salvar_views.js. Entre no servidor uma vez que estará salvo os mapas.

Feito isso, já é possível executar o wordnet.js que é onde realmente a aplicação está funcionando