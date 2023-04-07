import axios, { AxiosResponse } from "axios";
import { GetPostListResponse } from "./ApiTypes";

interface GetBlogListParams {
  page: number;
  per_page: number;
}
export async function getBlogList(params: GetBlogListParams) {
  const { page, per_page } = params;
  const res: AxiosResponse<GetPostListResponse[]> = await axios.get(
    `https://gorest.co.in/public/v2/posts?`,
    {
      params: { page, per_page },
    }
  );
  return res.data;
}
