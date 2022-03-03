import axios from "axios";
import { useQuery } from "react-query";
import { useTokenStore } from "../stores/useTokenStore";

// This hook will be used for fetching current session from the server
export const useFetchSession = () => {
  const { setAccessToken, setRefreshToken } = useTokenStore((state) => state);

  const query = useQuery("session", async () => {
    const response = await axios.get("/api/session");

    if (response.status === 200) {
      setAccessToken(response.data?.accessToken);
      setRefreshToken(response.data?.refreshToken);
    }

    return response;
  });

  return query;
};
