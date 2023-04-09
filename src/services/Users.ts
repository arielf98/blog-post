import axios, { AxiosResponse } from "axios";
import { GetUserListResponse } from "./ApiTypes";
import { URL_API } from "@component/constants/UrlApi";

interface UserDetailsType {
  id?: string | string[];
}
export async function getUserDetails(params: UserDetailsType) {
  const { id } = params;
  const res: AxiosResponse<GetUserListResponse> = await axios.get(
    `${URL_API.users}/${id}`
  );
  return res.data;
}

export async function getAllUsers(page: number, per_page: number) {
  const res: AxiosResponse<GetUserListResponse[]> = await axios.get(
    URL_API.users,
    {
      params: {
        page,
        per_page,
      },
    }
  );
  return res.data;
}
