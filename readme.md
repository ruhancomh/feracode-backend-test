## Sobre o projeto

Este projeto é divido em duas partes: uma API e uma SPA que ira consumir e enviar dados para a API.

A API foi desenvolvida em **NodeJs** utilizando o framework http **express**. Foi utilizado o banco NoSQL **mongodb** junto com o ODM **mongoose**. Alem disso foram desenvolvidos alguns testes utilizando **mocha** e **chai**.

A SPA foi desenvolvida utilizando **VueJS**, **Vuex**, **VueRouter**, **Axios** e a biblioteca de components **Vuetify**.

## Como rodar o projeto?
- Faça um clone deste repositório
- Acesse o diretório `feracode-backend-test/api`
- **IMPORTANTE**: Altere as configurações de acesso ao banco de dados no arquivo `.env`
- Instale as dependências `npm install` e em seguida inicie o servidor com o comando `npm start`
- Abre outra janela do terminal e acesse o diretório `feracode-backend-test/app`
- Instale as dependências com o comando `npm install` e em seguida inicie o servidor com o comando `npm start`
- Pronto, agora basta acessar a aplicação na url `http://localhost:8080`