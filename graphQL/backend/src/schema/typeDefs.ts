export const typeDefs = `#graphql

  # -------------------------------------------------------
  # ENUMS
  # -------------------------------------------------------
  enum Role {
    ADMIN
    AUTHOR
    READER
  }

  # -------------------------------------------------------
  # TIPOS PRINCIPAIS
  # -------------------------------------------------------

  type User {
    id: ID!
    name: String!
    email: String!
    role: Role!
    createdAt: String!

    # DESAFIO 4: Campo computado - resolver de posts do usuário
    # Retorna todos os posts publicados de um autor
    posts: [Post!]!

    # DESAFIO 4: Campo computado - total de posts
    postCount: Int!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    tags: [String!]!
    viewCount: Int!
    createdAt: String!
    updatedAt: String!

    # DESAFIO 4: Campo computado - resolver de author
    # Resolve o objeto User a partir do authorId
    author: User!

    # DESAFIO 4: Campo computado - resolver de comments
    comments: [Comment!]!

    # DESAFIO 4: Campo computado - contagem de comentários
    commentCount: Int!
  }

  type Comment {
    id: ID!
    body: String!
    createdAt: String!

    # DESAFIO 4: Campo computado - resolver de post e author
    post: Post!
    author: User!
  }

  # DESAFIO 6: Paginação - PostsConnection para cursor/offset-based pagination
  type PostsConnection {
    nodes: [Post!]!
    totalCount: Int!
    hasNextPage: Boolean!
  }

  # -------------------------------------------------------
  # INPUTS
  # -------------------------------------------------------

  input CreatePostInput {
    title: String!
    content: String!
    tags: [String!]
    published: Boolean
    authorId: ID!
  }

  input UpdatePostInput {
    title: String
    content: String
    tags: [String!]
    published: Boolean
  }

  input CreateCommentInput {
    body: String!
    postId: ID!
    authorId: ID!
  }

  # DESAFIO 6: Input de filtro para posts
  input PostsFilter {
    published: Boolean
    authorId: ID
    tag: String
    search: String
  }

  # DESAFIO 6: Input de paginação
  input PaginationInput {
    limit: Int
    offset: Int
  }

  # -------------------------------------------------------
  # QUERIES
  # -------------------------------------------------------

  type Query {
    # DESAFIO 1: Implemente o resolver desta query
    # Deve retornar todos os usuários
    users: [User!]!

    # DESAFIO 1: Implemente o resolver desta query
    # Deve retornar um usuário pelo ID ou null se não encontrado
    user(id: ID!): User

    # DESAFIO 2: Implemente o resolver desta query
    # Deve retornar todos os posts publicados
    posts(
      filter: PostsFilter
      pagination: PaginationInput
    ): PostsConnection!

    # DESAFIO 2: Implemente o resolver desta query
    # Deve retornar um post pelo ID
    post(id: ID!): Post

    # DESAFIO 3: Implemente esta query
    # Deve retornar posts ordenados por viewCount (mais vistos primeiro)
    trendingPosts(limit: Int): [Post!]!

    # DESAFIO 3: Implemente esta query
    # Deve retornar todos os posts de um usuário específico
    postsByAuthor(authorId: ID!): [Post!]!

    # DESAFIO 3: Implemente esta query
    # Deve retornar todos os comentários de um post específico
    commentsByPost(postId: ID!): [Comment!]!
  }

  # -------------------------------------------------------
  # MUTATIONS
  # -------------------------------------------------------

  type Mutation {
    # DESAFIO 5: Implemente esta mutation
    # Deve criar um novo post e retorná-lo
    createPost(input: CreatePostInput!): Post!

    # DESAFIO 5: Implemente esta mutation
    # Deve atualizar um post existente (apenas campos enviados)
    # Deve lançar erro se o post não existir
    updatePost(id: ID!, input: UpdatePostInput!): Post!

    # DESAFIO 5: Implemente esta mutation
    # Deve deletar um post e retornar true se bem sucedido
    deletePost(id: ID!): Boolean!

    # DESAFIO 5: Implemente esta mutation
    # Deve criar um comentário em um post existente
    # Deve lançar erro se o post não existir
    createComment(input: CreateCommentInput!): Comment!

    # DESAFIO 5: Implemente esta mutation
    # Deve incrementar viewCount do post e retornar o post atualizado
    incrementPostView(postId: ID!): Post!
  }
`;
