export type Role = "ADMIN" | "AUTHOR" | "READER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  postCount?: number;
  posts?: Post[];
}

export interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  tags: string[];
  viewCount: number;
  createdAt: string;
  updatedAt?: string;
  author?: User;
  comments?: Comment[];
  commentCount?: number;
}

export interface Comment {
  id: string;
  body: string;
  createdAt: string;
  author?: User;
  post?: Post;
}

export interface PostsConnection {
  nodes: Post[];
  totalCount: number;
  hasNextPage: boolean;
}

export interface PostsFilter {
  published?: boolean;
  authorId?: string;
  tag?: string;
  search?: string;
}

export interface CreatePostInput {
  title: string;
  content: string;
  tags?: string[];
  published?: boolean;
  authorId: string;
}

export interface CreateCommentInput {
  body: string;
  postId: string;
  authorId: string;
}
