export interface GetPostListResponse {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export interface GetUserListResponse {
  id: number;
  name: string;
  email: string;
  gender: string;
  status: string;
}

export interface BlogPostComments {
  id: number;
  post_id: number;
  name: string;
  email: string;
  body: string;
}
