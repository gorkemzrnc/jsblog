import API from "../config/apiClient";
import { ArticleParams, CategoriesParams, CreateArticleParams, GetArticlesResponse, LoginParams, RegisterParams, User } from "../types";

type AxiosResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
};


export const register = async (data: RegisterParams) => API.post("/auth/register", data);
export const login = async (data: LoginParams) => API.post("/auth/login", data);
export const logout = async () => API.get("/auth/logout");

export const getUser = async ():Promise<AxiosResponse<User>> => API.get("/user");
export const getUserById = async (id: string):Promise<AxiosResponse<User>> => API.get(`/user/${id}`);
export const updateUser = async (data: any) => API.patch(`/user`, data); 

export const getSessions = async () => API.get("/sessions");
export const deleteSession = async (id: string) => API.delete(`/sessions/${id}`);

export const createBlog = async (data: CreateArticleParams) => API.post('/blog', data);
export const getBlogs = async ({ page }: { page: number }):Promise<AxiosResponse<GetArticlesResponse>> => {
  return page ? API.get(`/blog?page=${page}`) : API.get('/blog');
};
export const getBlog = async (id: string):Promise<AxiosResponse<ArticleParams>> => API.get(`blog/${id}`);

export const getCategories = async ():Promise<AxiosResponse<CategoriesParams[]>> => API.get('category');
export const getCategoriesById = async (ids: string[]):Promise<AxiosResponse<CategoriesParams[]>> => API.get('category/by-ids', { params: { ids: ids.join(',') } });
export const getCategory = async (id: string): Promise<AxiosResponse<CategoriesParams>> => API.get(`category/${id}`)