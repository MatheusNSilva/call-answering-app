# Call-answering-app

É uma aplicação REACT que simula um softawre de atendimento de chamados,
no qual suas funcionalidades ocorrem pela interação com um Servidor por
meio do protocolo WebSocket.

## Funcionalidade

* Gerenciamento de usuários e conexões.
* Simulação de chamadas com integração WebSocket.
* Exibição de detalhes de chamadas.
* Notificações e controle de erros com alerts.

### Pré-requisitos

Node.js (v18 ou superior)
NPM (Node Package Manager)
Docker e Docker Compose (caso deseje executar via contêiner)

## Scripts Disponíveis

Na raiz do projeto, você pode executar os seguintes comandos:

npm start
Inicia o aplicativo em modo de desenvolvimento.
Acesse http://localhost:3000 no navegador para visualizar o projeto.
npm run build
Cria uma versão otimizada da aplicação para produção na pasta build.
npm test
Inicia o modo de teste interativo para execução de testes.
npm run eject
Ejecta a configuração padrão do react-scripts. Nota: Essa ação é irreversível.


## Configuração do Docker

Este projeto inclui um Dockerfile para criar um contêiner da aplicação para produção.

Construção do Contêiner
Na raiz do projeto, execute:

bash
Copiar código
docker build -t nome-do-projeto .
Executando o Contêiner
Após construir a imagem, execute o contêiner:

bash
Copiar código
docker run -d -p 80:80 nome-do-projeto
Acesse a aplicação em http://localhost.

Explicação do Dockerfile
Etapa de Build

A imagem node:18 é utilizada para instalar as dependências e compilar a aplicação.
dockerfile
Copiar código
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
Etapa de Produção

A imagem nginx:alpine é usada para servir os arquivos estáticos gerados.
dockerfile
Copiar código
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

## Estrutura do Projeto

/src
  /components        # Componentes reutilizáveis
  /pages             # Páginas principais
  /store             # Configuração e slices do Redux
  /hooks             # Hooks personalizados
  /utils             # Funções utilitárias
  /styles            # Estilos CSS
Dockerfile           # Arquivo de configuração para Docker
package.json         # Dependências e scripts do projeto