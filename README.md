# 🛒 Carrinho de Compras com Node.js e Vue.js

## 📌 Descrição do Projeto

Este é um sistema de **e-commerce** desenvolvido com **Vue.js** no frontend e **Node.js** no backend. Ele permite a gestão de usuários, produtos, carrinho de compras e pedidos, garantindo uma experiência fluida para os clientes.

## 🚀 Tecnologias Utilizadas

- **Frontend:** Vue.js (Composition API, Vue Router)
- **Backend:** Node.js com Express
- **Banco de Dados:** MongoDB (com Mongoose)
- **Autenticação:** JWT (JSON Web Token)
- **Gerenciamento de Estado:** Pinia
- **Estilização:** CSS puro
- **Animação:** GSAP

## 🎯 Funcionalidades

- Cadastro e login de usuários
- Niveis de permissão baseado em roles
- Geração de tokens
- Adição, listagem, atualização e remoção de produtos via formulario
- Adição, alteração de quantidade e remoção de produtos no carrinho
- Finalização de compras
- Exibição do histórico de pedidos
- Rotas protegidas
- Painel administrativo com acesso restrito

## 📸 Imagens do Projeto

### Pagina Inicial

![](./images/Captura%20de%20tela%202025-04-04%20224139.png)
![](./images/Captura%20de%20tela%202025-04-04%20224207.png)
![](./images/Captura%20de%20tela%202025-04-04%20224212.png)
![](./images/Captura%20de%20tela%202025-04-04%20224217.png)

### Lista de Produtos

![](./images/Captura%20de%20tela%202025-04-04%20224227.png)
![](./images/Captura%20de%20tela%202025-04-04%20224236.png)
![](./images/Captura%20de%20tela%202025-04-04%20224243.png)

### Página de Login

![](./images/Captura%20de%20tela%202025-04-04%20224253.png)

### Página de Cadastro

![](./images/Captura%20de%20tela%202025-04-04%20224301.png)

### Carrinho de Compras

![](./images/Captura%20de%20tela%202025-04-04%20224334.png)

### Histórico de Pedidos

![](./images/Captura%20de%20tela%202025-04-04%20224341.png)

## 📂 Estrutura do Projeto

```
Carrinho_de_compras_Node_Vuejs/
├── backend/       # Código-fonte do servidor Node.js
├── frontend/      # Código-fonte da aplicação Vue.js
|-- images/        # Imagens capturadas do projeto
├── README.md      # Documentação do projeto
```

### 📌 Backend (Node.js + Express)

Estrutura do backend:

```
backend/
├── utils/         # Ferramentas para geração de tokens
|-- middlewares/   # Definição de middlewares para autentição e roles
├── models/        # Modelos do MongoDB
├── routes/        # Definição das rotas da API
├── config/        # Configurações do banco de dados
├── server.js      # Arquivo principal
```

### 📌 Frontend (Vue.js)

Estrutura do frontend:

```
frontend/
├── src/
|   |-- assets/       # Arquivos auxiliares como imagens, icones, etc.
│   ├── components/   # Componentes reutilizáveis
|   |-- constants/    # Informações como URIs, URLs, etc.
│   ├── views/        # Páginas da aplicação
│   ├── store/        # Gerenciamento de estado (Pinia)
│   ├── routes/       # Definição das rotas
|   |-- services/     # Definição dos serviços
│   ├── App.vue       # Componente raiz
│   ├── main.js       # Arquivo de inicialização
```

## 📦 Instalação e Execução

### 🔹 Clonar o repositório

```sh
git clone https://github.com/Leonardobern10/Carrinho_de_compras_Node_Vuejs.git
cd Carrinho_de_compras_Node_Vuejs
```

### 🔹 Backend

```sh
cd backend
npm install
npm start
```

### 🔹 Frontend

```sh
cd frontend
npm install
npm run dev
```

## 🔑 Autenticação

O sistema utiliza **JWT** para autenticação. Ao logar, um refreshtoken é armazenado no **banco de dados** e vinculado ao usuário. Esse refreshToken é utilizado para gerar um token (**accessToken**) de menor duração, garantindo que o usuário fique logado por mais tempo.
Cada cliente tem um nivel de permissão, sendo o padrão User. Esse nivel de permissão é necessário para o acesso à algumas seções e funcionalidades do sistema (ex: Funcionalidades administrativas).

## 📌 Endpoints da API

### 🔹 Autenticação

- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/refresh` - Renovação do AccessToken
- `POST /api/auth/logout` - Desconexão do usuário
- `GET /api/auth/userStatus` - Verifica se o usuário está autenticado
- `GET /api/auth/me` - Obtém dados do usuario como roles

### 🔹 Produtos

- `GET /api/products` - Lista todos os produtos
- `GET /api/products/:id` - Obtém um produto específico
- `POST /api/products` - Adiciona um produto ao sistema
- `PUT /api/products/:id` - Atualiza os dados de um produto
- `PATCH /api/change/:id` - Atualiza parcialmente um produto
- `DELETE /api/delete/:id` - Remove um produto específico

### 🔹 Pedidos

- `POST /api/orders` - Finaliza uma compra
- `GET /api/orders` - Obtém o histórico de pedidos do usuário

_Os itens armazenados no carrinho são salvos no **LocalStorage** permitindo que esses dados persistam entre sessões._

## 📜 Licença

Este projeto é distribuído sob a licença **MIT**.

## 🤝 Contribuição

Pull requests são bem-vindos! Para melhorias significativas, abra uma issue para discutirmos.

## 📬 Contato

- **Autor:** Leonardo Bernardo
- **GitHub:** [Leonardobern10](https://github.com/Leonardobern10)
- **LinkedIn:** [in/leonardo-bern](https://www.linkedin.com/in/leonardo-bern/)
