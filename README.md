# 🛒 Carrinho de Compras com Node.js e Vue.js

## 📌 Descrição do Projeto
Este é um sistema de **e-commerce** desenvolvido com **Vue.js** no frontend e **Node.js** no backend. Ele permite a gestão de usuários, produtos, carrinho de compras e pedidos, garantindo uma experiência fluida para os clientes.

## 🚀 Tecnologias Utilizadas
- **Frontend:** Vue.js (Composition API, Vue Router, Pinia)
- **Backend:** Node.js com Express
- **Banco de Dados:** MongoDB (com Mongoose)
- **Autenticação:** JWT (JSON Web Token)
- **Gerenciamento de Estado:** Pinia
- **Estilização:** Tailwind CSS

## 🎯 Funcionalidades
- Cadastro e login de usuários
- Listagem de produtos
- Adição e remoção de produtos no carrinho
- Finalização de compras
- Exibição do histórico de pedidos
- Sistema de avaliações

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
│   ├── router/       # Definição das rotas
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
O sistema utiliza **JWT** para autenticação. Ao logar, o token é armazenado no **localStorage** e utilizado nas requisições para rotas protegidas.

## 📌 Endpoints da API
### 🔹 Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login de usuário
- `GET /api/auth/me` - Obtém dados do usuário autenticado

### 🔹 Produtos
- `GET /api/products` - Lista todos os produtos
- `GET /api/products/:id` - Obtém um produto específico

### 🔹 Carrinho
- `POST /api/cart` - Adiciona um item ao carrinho
- `GET /api/cart` - Obtém os itens do carrinho
- `DELETE /api/cart/:id` - Remove um item do carrinho

### 🔹 Pedidos
- `POST /api/orders` - Finaliza uma compra
- `GET /api/orders` - Obtém o histórico de pedidos do usuário

## 📜 Licença
Este projeto é distribuído sob a licença **MIT**.

## 🤝 Contribuição
Pull requests são bem-vindos! Para melhorias significativas, abra uma issue para discutirmos.

## 📬 Contato
- **Autor:** Leonardo Bernardo
- **GitHub:** [Leonardobern10](https://github.com/Leonardobern10)

