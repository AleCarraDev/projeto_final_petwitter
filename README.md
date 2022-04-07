# Petwitter

A aplicação consite em twitter para pets, onde é possivel logar, cadastrar, twittar e acessar pefil do usuario.

## Pré-requisitos

Tenha instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) e [Yarn](https://yarnpkg.com/).

## Rodando a aplicação

Para iniciar o projeto, siga o passo a passo abaixo.

1. Baixe o [projeto do Back-End](https://github.com/AleCarraDev/projeto_final_petwitter_backend) em sua máquina e crie um repositório no Github baseado nele.
2. Execute os seguintes passos

```bash
# Instalar as dependências
$ yarn
# Executar o server
$ yarn dev
```

3. Agora na pasta do propio projeto, faça o clone no seu computador também e execute os seguintes passos

```bash
# Instalar as dependências
$ yarn
```

4. Crie na raiz da pasta "FinalProject-Petwitter-FrontEnd" um .env-local e adicione uma variável de ambiente "REACT_APP_API_URL" que irá conter o link para a api. Nesse projeto utiliza-se "REACT_APP_API_URL=http://localhost:3000"
5. Execute o projeto em uma porta diferente da 3000, pois ela já vai estar em uso (caso você esteja executando o vscode, na hora de executar, ele vai perguntar se você quer rodar o projeto em outra porta)

```bash
# Executando o projeto
$ yarn start
```
