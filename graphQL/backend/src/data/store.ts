import { User, Post, Comment } from "../types";

export const users: User[] = [
  {
    id: "user-1",
    name: "Ana Silva",
    email: "ana@example.com",
    role: "ADMIN",
    createdAt: "2024-01-01T10:00:00Z",
  },
  {
    id: "user-2",
    name: "Bruno Costa",
    email: "bruno@example.com",
    role: "AUTHOR",
    createdAt: "2024-01-05T14:00:00Z",
  },
  {
    id: "user-3",
    name: "Carla Mendes",
    email: "carla@example.com",
    role: "AUTHOR",
    createdAt: "2024-01-10T09:00:00Z",
  },
  {
    id: "user-4",
    name: "Diego Rocha",
    email: "diego@example.com",
    role: "READER",
    createdAt: "2024-02-01T11:00:00Z",
  },
];

export const posts: Post[] = [
  {
    id: "post-1",
    title: "Introdução ao GraphQL",
    content: "GraphQL é uma linguagem de consulta para APIs...",
    published: true,
    authorId: "user-2",
    tags: ["graphql", "api", "tutorial"],
    viewCount: 320,
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-01-15T08:00:00Z",
  },
  {
    id: "post-2",
    title: "TypeScript Avançado",
    content: "Neste post exploramos generics e utility types...",
    published: true,
    authorId: "user-2",
    tags: ["typescript", "javascript", "tutorial"],
    viewCount: 215,
    createdAt: "2024-01-20T10:00:00Z",
    updatedAt: "2024-01-22T12:00:00Z",
  },
  {
    id: "post-3",
    title: "Node.js com Apollo Server",
    content: "Como configurar um servidor GraphQL com Apollo...",
    published: true,
    authorId: "user-3",
    tags: ["nodejs", "graphql", "apollo"],
    viewCount: 180,
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-02-01T09:00:00Z",
  },
  {
    id: "post-4",
    title: "Rascunho: React Hooks Avançados",
    content: "Este post ainda está em desenvolvimento...",
    published: false,
    authorId: "user-3",
    tags: ["react", "hooks"],
    viewCount: 0,
    createdAt: "2024-02-10T15:00:00Z",
    updatedAt: "2024-02-10T15:00:00Z",
  },
  {
    id: "post-5",
    title: "Docker para Devs Frontend",
    content: "Aprenda a containerizar suas aplicações React...",
    published: true,
    authorId: "user-1",
    tags: ["docker", "devops", "frontend"],
    viewCount: 95,
    createdAt: "2024-02-15T11:00:00Z",
    updatedAt: "2024-02-15T11:00:00Z",
  },
];

export const comments: Comment[] = [
  {
    id: "comment-1",
    body: "Ótimo artigo! Me ajudou muito.",
    postId: "post-1",
    authorId: "user-4",
    createdAt: "2024-01-16T10:00:00Z",
  },
  {
    id: "comment-2",
    body: "Tenho uma dúvida sobre mutations, pode elaborar mais?",
    postId: "post-1",
    authorId: "user-3",
    createdAt: "2024-01-17T14:00:00Z",
  },
  {
    id: "comment-3",
    body: "Perfeito! Exatamente o que eu precisava.",
    postId: "post-2",
    authorId: "user-4",
    createdAt: "2024-01-21T09:00:00Z",
  },
  {
    id: "comment-4",
    body: "Funcionou perfeitamente no meu projeto.",
    postId: "post-3",
    authorId: "user-2",
    createdAt: "2024-02-03T16:00:00Z",
  },
];

let userIdCounter = 5;
let postIdCounter = 6;
let commentIdCounter = 5;

export const generateUserId = () => `user-${userIdCounter++}`;
export const generatePostId = () => `post-${postIdCounter++}`;
export const generateCommentId = () => `comment-${commentIdCounter++}`;
