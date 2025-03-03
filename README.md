# 🛒 Carrinho de Compras com Node.js e Vue.js

## 📌 Descrição do Projeto

Este é um sistema de **e-commerce** desenvolvido com **Vue.js** no frontend e **Node.js** no backend. Ele permite a gestão de usuários, produtos, carrinho de compras e pedidos, garantindo uma experiência fluida para os clientes.

## 🚀 Tecnologias Utilizadas

- **Frontend:** Vue.js (Composition API, Vue Router, Pinia)
- **Backend:** Node.js com Express
- **Banco de Dados:** MongoDB (com Mongoose)
- **Autenticação:** JWT (JSON Web Token)
- **Gerenciamento de Estado:** Pinia
- **Estilização:** CSS puro

## 🎯 Funcionalidades

- Cadastro e login de usuários
- Geração de tokens
- Listagem de produtos
- Adição e remoção de produtos no carrinho
- Finalização de compras
- Exibição do histórico de pedidos
- Sistema de avaliações

## 📸 Imagens do Projeto

![](./images/Captura%20de%20tela%202025-03-02%20201219.png)
![](./images/Captura%20de%20tela%202025-03-02%20201229.png)
![](./images/Captura%20de%20tela%202025-03-02%20201246.png)
![](./images/Captura%20de%20tela%202025-03-02%20201256.png)
![](./images/Captura%20de%20tela%202025-03-02%20201307.png)

## 📂 Estrutura do Projeto

```
Carrinho_de_compras_Node_Vuejs/
├── backend/       # Código-fonte do servidor Node.js
├── frontend/      # Código-fonte da aplicação Vue.js
├── README.md      # Documentação do projeto
```

### 📌 Backend (Node.js + Express)

Estrutura do backend:

```
backend/
├── controllers/   # Lógica dos endpoints
|-- middlewares/   # Definição de middlewares para autentição
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
│   ├── components/   # Componentes reutilizáveis
│   ├── views/        # Páginas da aplicação
│   ├── store/        # Gerenciamento de estado (Pinia)
│   ├── routes/       # Definição das rotas
|   |-- services/    # Definição dos serviços
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

## 📌 Endpoints da API

### 🔹 Autenticação

- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/refresh` - Renovação do AccessToken
- `POST /api/auth/logout` - Desconexão do usuário
- `GET /api/auth/userStatus` - Obtém dados do usuário autenticado

### 🔹 Produtos

- `GET /api/products` - Lista todos os produtos
- `POST /api/products` - Adiciona um produto ao sistema
- `PUT /api/products/:id` - Atualiza os dados de um produto
- `GET /api/products/:id` - Obtém um produto específico

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
