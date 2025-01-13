import API from "../config/apiClient";

export const register = async (data) => API.post("/auth/register", data);
export const login = async (data:{email:string, password:string}) => API.post("/auth/login", data);
export const logout = async () => API.get("/auth/logout");

export const getUser = async () => API.get("/user");
export const getSessions = async () => API.get("/sessions");
export const deleteSession = async (id:string) => API.delete(`/sessions/${id}`);
export const createBlog = async (data) => API.post('/blog', data);
export const getBlogs = async ({page}) => {
  return page ? API.get(`/blog?page=${page}`) : API.get('/blog'); 
};