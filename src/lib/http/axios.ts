import __axios from "axios";

const isSession = typeof window === "undefined";

const axios = __axios.create({
  withCredentials: false,
  validateStatus: () => true,
  baseURL: isSession ? process.env.POLYGON_CORE_URL : "/api/proxy",
});

export default axios;
