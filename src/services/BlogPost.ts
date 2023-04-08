import axios, { AxiosResponse } from "axios";
import { BlogPostComments, GetPostListResponse } from "./ApiTypes";
import { URL_API } from "@component/constants/UrlApi";

interface GetBlogListParams {
  page: number;
  per_page: number;
}
export async function getBlogList(params: GetBlogListParams) {
  const { page, per_page } = params;
  const res: AxiosResponse<GetPostListResponse[]> = await axios.get(
    URL_API.posts,
    {
      params: { page, per_page },
    }
  );
  return res.data;
}

interface BlogPostDetailsParams {
  id?: string | string[];
}
export async function getBlogPostDetails(params: BlogPostDetailsParams) {
  const { id } = params;
  const res: AxiosResponse<GetPostListResponse> = await axios.get(
    `${URL_API.posts}/${id}`
  );
  return res.data;
}

export async function getBlogPostComment(id?: string | string[]) {
  const res: AxiosResponse<BlogPostComments[]> = await axios.get(
    `${URL_API.posts}/${id}/comments`
  );
  return res.data;
}
