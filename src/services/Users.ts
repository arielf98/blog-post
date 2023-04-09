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

export async function getAllUsers(
  page: number,
  per_page: number,
  name: string
) {
  const res: AxiosResponse<GetUserListResponse[]> = await axios.get(
    URL_API.users,
    {
      params: {
        page,
        per_page,
        name,
      },
    }
  );
  return res.data;
}

export async function deleteUsers(id: string) {
  const res = await axios.delete(`${URL_API.users}/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    },
  });
  return res.status;
}

export interface UpdateUserType {
  name: string;
  email: string;
  gender: string;
  status: string;
  id?: string;
}
export async function updateUser(params: UpdateUserType) {
  const { email, gender, name, status, id } = params;
  const res: AxiosResponse<GetUserListResponse> = await axios.patch(
    `${URL_API.users}/${id}`,
    { email, gender, name, status },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    }
  );

  return res.data;
}

export async function addUsers(params: UpdateUserType) {
  const { email, gender, name, status } = params;
  const res: AxiosResponse<GetUserListResponse> = await axios.post(
    `${URL_API.users}`,
    { email, gender, name, status },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    }
  );

  return res.data;
}
