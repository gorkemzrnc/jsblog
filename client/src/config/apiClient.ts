import axios from "axios";
import { UNAUTHORIZED } from "../constants/http.mjs";
import { navigate } from "../lib/navigation";

const options = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
};

const TokenRefreshClient = axios.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);

const API = axios.create(options);

API.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const { config, response } = error;
    const { status, data } = response || {};

    if (status === UNAUTHORIZED && data?.errorCode === "InvalidAccessToken") {
      try {
        await TokenRefreshClient.get("/auth/refresh");
        return TokenRefreshClient(config);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    }

    return Promise.reject({ status, ...data });
  },
);

export default API;
