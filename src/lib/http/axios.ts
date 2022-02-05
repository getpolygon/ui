import __axios from "axios";

const axios = __axios.create({
  withCredentials: false,
  validateStatus: () => true,
  baseURL: process.env.NEXT_PUBLIC_POLYGON_CORE,
});

export default axios;
