import axios from "axios";

const projectRApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

//TODO configurar interceptores
projectRApi.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };

  return config;
});

export default projectRApi;
