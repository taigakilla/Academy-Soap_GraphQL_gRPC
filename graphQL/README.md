# ⚡ GraphQL Challenge

Um projeto de desafio focado em GraphQL com **Node.js + TypeScript** no backend e **Vite + React** no frontend.

> 💡 Tente resolver cada desafio antes de buscar referências externas. Os arquivos já têm a estrutura e os comentários `// TODO` para te guiar!

---

## 📦 Estrutura do Projeto

```
graphql-challenge/
├── backend/          # Apollo Server + TypeScript
│   └── src/
│       ├── schema/   # typeDefs GraphQL
│       ├── resolvers/ # Query, Mutation e Field Resolvers
│       ├── data/     # Store em memória
│       └── types/    # Interfaces TypeScript
│
└── frontend/         # Vite + React + Apollo Client
    └── src/
        ├── graphql/  # Queries, mutations e client
        ├── pages/    # Páginas da aplicação
        └── types/    # Tipos TypeScript
```

---

## 🚀 Como Rodar

### Backend

```bash
cd backend
npm install
npm run dev
# Servidor em http://localhost:4000
# Apollo Sandbox disponível em http://localhost:4000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# App em http://localhost:5173
```

---

## 🎯 Desafios

### 🟢 DESAFIO 1 — Queries Básicas
**Arquivo:** `backend/src/resolvers/index.ts`

- [ ] Implementar o resolver `users` — retorna lista de todos os usuários
- [ ] Implementar o resolver `user(id)` — retorna um usuário pelo ID ou null

**Conceitos:** Resolver básico, acesso ao store, retorno tipado

---

### 🟢 DESAFIO 2 — Query com Filtros e Paginação
**Arquivo:** `backend/src/resolvers/index.ts`

- [ ] Implementar o resolver `posts(filter, pagination)` com suporte a:
  - [ ] Filtro por `published` (boolean)
  - [ ] Filtro por `authorId`
  - [ ] Filtro por `tag` (inclusão no array)
  - [ ] Filtro por `search` (busca no título e conteúdo)
  - [ ] Paginação com `limit` e `offset`
- [ ] Retornar `PostsConnection` com `nodes`, `totalCount` e `hasNextPage`
- [ ] Implementar o resolver `post(id)` — retorna um post pelo ID

**Conceitos:** Arguments em resolvers, paginação offset-based, tipo de conexão

---

### 🟡 DESAFIO 3 — Queries Específicas de Domínio
**Arquivo:** `backend/src/resolvers/index.ts`

- [ ] Implementar `trendingPosts(limit)` — posts publicados ordenados por `viewCount` DESC
- [ ] Implementar `postsByAuthor(authorId)` — todos os posts de um autor
- [ ] Implementar `commentsByPost(postId)` — todos os comentários de um post

**Conceitos:** Sorting, filtragem, arguments opcionais

---

### 🟡 DESAFIO 4 — Field Resolvers (Relacionamentos)
**Arquivo:** `backend/src/resolvers/index.ts`

- [ ] Implementar `Post.author` — resolve o objeto `User` a partir do `authorId`
- [ ] Implementar `Post.comments` — lista os comentários do post
- [ ] Implementar `Post.commentCount` — conta os comentários (campo computado)
- [ ] Implementar `User.posts` — lista os posts publicados do usuário
- [ ] Implementar `User.postCount` — conta todos os posts do usuário (campo computado)
- [ ] Implementar `Comment.post` — resolve o `Post` do comentário
- [ ] Implementar `Comment.author` — resolve o `User` autor do comentário

**Conceitos:** Field resolvers, parent object, campos computados, relações N:1 e 1:N

---

### 🔴 DESAFIO 5 — Mutations
**Arquivo:** `backend/src/resolvers/index.ts`

- [ ] Implementar `createPost(input)` — valida autor, cria e retorna o post
- [ ] Implementar `updatePost(id, input)` — patch parcial, lança erro se não encontrar
- [ ] Implementar `deletePost(id)` — remove e retorna `true`/`false`
- [ ] Implementar `createComment(input)` — valida post e autor, cria e retorna o comentário
- [ ] Implementar `incrementPostView(postId)` — incrementa `viewCount` em 1

**Conceitos:** Input types, mutations com efeitos colaterais, erros com `GraphQLError`, imutabilidade do store

---

### 🔴 DESAFIO 6 — Schema Design (Discussão/Revisão)
**Arquivo:** `backend/src/schema/typeDefs.ts`

- [ ] Entender por que usamos `PostsConnection` ao invés de `[Post!]!` para a query `posts`
- [ ] Entender a diferença entre `String` e `String!` no schema
- [ ] Entender por que `user(id: ID!): User` retorna `User` (nullable) ao invés de `User!`
- [ ] Discutir: quando usar `input types` vs arguments diretos?
- [ ] Discutir: qual a diferença entre `enum` e `String` para o campo `role`?

**Conceitos:** Nullability, tipos de conexão, design de schema, enums vs strings

---

## 🛠 Tecnologias

| Camada | Tecnologia |
|--------|-----------|
| Runtime | Node.js 20+ |
| Linguagem | TypeScript 5 |
| GraphQL Server | Apollo Server 4 |
| Frontend | Vite 5 + React 18 (já implementado) |
| GraphQL Client | Apollo Client 3 |
| Roteamento | React Router 6 |

---

## 💡 Dicas

- Use o **Apollo Sandbox** em `http://localhost:4000` para testar suas queries e mutations
- O store é **em memória** — reiniciar o servidor reseta os dados
- Usuário fixo para criar posts: `user-2` (Bruno Costa, AUTHOR)
- Usuário fixo para comentários: `user-4` (Diego Rocha, READER)
- O frontend já está funcionando — rode os dois e use a UI para validar suas implementações

---

## 📚 Recursos

- [Apollo Server Docs](https://www.apollographql.com/docs/apollo-server)
- [GraphQL Spec](https://spec.graphql.org/)
- [How to GraphQL](https://www.howtographql.com/)
