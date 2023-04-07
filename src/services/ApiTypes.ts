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
