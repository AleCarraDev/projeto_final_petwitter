# projeto_final_petwitter

Boilerplate de front-end (SPA) da Otterwise
Esse boilerplate deve ser utilizado para realizar o desafio final do curso WEB Developer da Otterwise, mas também pode ser usado para criar qualquer aplicação SPA, pois é baseado no Create React APP.

O boilerplate também conta uma integração de autenticação com o boilerplate de back-end da Otterwise via REST api pré setada.

Tecnologias
Create react app
Styled components
React Router
Axios
Rodando a aplicação
Instale as dependências através do comando yarn ou npm install.

Crie um novo arquivo chamado .env.local e copie o conteúdo do arquivo .env-example modificando a url da API para a url do seu backend.

Rode a aplicação utilizando yarn start ou npm start.

Gerando o build da aplicação para ambiente de produção
Para gerar a aplicação que ficará hospedada no ambiente de produção rode yarn build ou npm run build.

Estrutura de pastas
components: componentes gerais da aplicação.

context: configuração de estados globais da aplicação utilizando a Context API.

providers: configuração de clientes http e outros provedores externos a aplicação.

services: pasta com arquivos que exportam funcões externas a aplicação como requisições.

routes: contém as rotas da aplicação.
