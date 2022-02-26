import __axios from "axios";

const axios = __axios.create({
  withCredentials: false,
  validateStatus: () => true,
  baseURL: process.env.POLYGON_CORE_URL,
});

export default axios;
