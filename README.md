# C9L Project — E-commerce

O **C9L Project** é um projeto de e-commerce desenvolvido com **ReactJS** no front-end e **Java Spring Boot** no back-end.

O objetivo do projeto é simular o fluxo principal de uma loja virtual, permitindo que usuários se cadastrem, façam login, visualizem produtos, adicionem itens ao carrinho, finalizem compras e consultem seu histórico de pedidos.

Este projeto está sendo desenvolvido em dupla, com divisão entre front-end e back-end.

---

## Funcionalidades desenvolvidas

### Autenticação e usuários

- Cadastro de usuário
- Criptografia de senha com BCrypt
- Login, logout e autenticação com token JWT
- Recuperação do usuário autenticado
- Controle de permissões com `Role`:
  - `ADMIN`
  - `CLIENT`

### Produtos

- Cadastro inicial de produtos via `import.sql`
- Listagem paginada de produtos
- Busca de produtos por nome
- Retorno de produtos com id, nome, descrição, preço e imagem

### Carrinho

- Criação automática de carrinho para o usuário autenticado
- Adição de produtos ao carrinho
- Atualização da quantidade de cada item
- Listagem do carrinho do usuário autenticado
- Remoção de item do carrinho
- Validação para impedir que um usuário remova ou altere itens do carrinho de outro usuário
- Cálculo de subtotal por item e total do carrinho

### Pedidos

- Finalização de compra a partir dos itens do carrinho
- Criação de pedido (`Order`) e itens do pedido (`OrderItem`)
- Cópia do preço unitário do produto no momento da compra
- Cálculo do valor total do pedido
- Limpeza do carrinho após finalizar a compra
- Status inicial do pedido como `PENDING`
- Listagem paginada do histórico de pedidos do usuário autenticado

---

## Tecnologias utilizadas

### Back-end

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- JWT
- BCrypt
- Bean Validation
- H2 Database
- Maven
- Lombok

### Front-end

- ReactJS
- JavaScript
- React Router DOM
- Fetch API
- CSS

### Banco de dados

- H2 Database em ambiente de desenvolvimento
- Console H2 habilitado para testes locais
- Dados iniciais carregados via `import.sql`

---

## Estrutura principal do projeto

```text
C9L-project/
├── backend/
│   └── src/main/java/com/c9l/backend/
│       ├── config/
│       ├── controllers/
│       ├── dto/
│       ├── entities/
│       ├── repositories/
│       └── services/
└── front-end/
    └── src/
        ├── components/
        ├── pages/
        └── services/
```

---

## Endpoints principais

### Autenticação

#### Cadastro de usuário

```http
POST /user/register
```

Exemplo de body:

```json
{
  "name": "Fulano da Silva",
  "email": "usuario@email.com",
  "password": "123456"
}
```

#### Login

```http
POST /auth/login
```

Exemplo de body:

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

Retorno esperado:

```json
{
  "token": "jwt_token"
}
```

#### Usuário autenticado

```http
GET /auth/me
```

Header necessário:

```http
Authorization: Bearer jwt_token
```

### Produtos

#### Listar produtos

```http
GET /product?page=0&size=20
```

### Carrinho

#### Listar carrinho do usuário autenticado

```http
GET /cart
```

#### Adicionar item ao carrinho

```http
POST /cart/items
```

Exemplo de body:

```json
{
  "productId": 1,
  "quantity": 2
}
```

#### Atualizar quantidade de um item

```http
PUT /cart/{id}
```

Exemplo de body:

```json
{
  "quantity": 1
}
```

#### Remover item do carrinho

```http
DELETE /cart/{id}
```

> Em `PUT /cart/{id}` e `DELETE /cart/{id}`, o `{id}` deve ser o id do `CartItem`, não o id do produto.

Para os endpoints protegidos do carrinho, use o header:

```http
Authorization: Bearer jwt_token
```

### Pedidos

#### Finalizar compra

```http
POST /orders
```

Este endpoint cria um pedido com base nos itens atuais do carrinho do usuário autenticado.

#### Listar histórico de pedidos

```http
GET /orders?page=0&size=20
```

Para os endpoints de pedidos, use o header:

```http
Authorization: Bearer jwt_token
```

---

## Como executar o projeto

### Pré-requisitos

Antes de iniciar, é necessário ter instalado:

- Java 17
- Maven
- Node.js
- npm
- Git

### Executando o back-end

```bash
cd backend
mvn spring-boot:run
```

A API será iniciada em `http://localhost:8080`.

### Banco de dados H2

O projeto utiliza o banco H2 em ambiente de desenvolvimento.

Console H2:

```text
http://localhost:8080/h2-console
```

Configurações utilizadas:

```text
JDBC URL: jdbc:h2:mem:testdb
User Name: sa
Password:
```

### Executando o front-end

```bash
cd front-end
npm install
npm start
```

O front-end será iniciado em `http://localhost:3000`.

---

## Fluxo principal da aplicação

1. O usuário realiza o cadastro.
2. O usuário faz login.
3. O back-end retorna um token JWT.
4. O front-end armazena o token.
5. O usuário visualiza a lista de produtos.
6. O usuário adiciona produtos ao carrinho.
7. O back-end identifica o usuário autenticado pelo JWT.
8. O carrinho é criado ou atualizado.
9. O usuário finaliza a compra.
10. O back-end cria um pedido com os itens do carrinho.
11. O carrinho é limpo.
12. O usuário pode consultar seu histórico de compras.

---

## Status atual do projeto

Funcionalidades já implementadas:

- Cadastro de usuário
- Login, logout e autenticação com JWT
- Criptografia de senha
- Listagem e busca de produtos
- Integração entre front-end e back-end
- Adição, atualização e remoção de produtos do carrinho
- Finalização de compra
- Histórico de pedidos paginado

---

## Funcionalidades futuras

- Área administrativa
- Cadastro e edição de produtos pelo administrador
- Área de perfil do usuário
- Alteração de status dos pedidos
- Envio de e-mails
- Filtros de produtos
- Melhorias visuais no front-end
- Deploy da aplicação

---

## Autores

Projeto desenvolvido por:

- Vinicius Coelho
- Lucas Novelli
