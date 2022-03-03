import axios from "../http/axios";
import { AxiosResponse } from "axios";
import { useQuery, UseQueryOptions } from "react-query";

interface IUseFetchUserProps {
  accessToken: string;
  refreshToken: string;
}

// This hook will be used for fetching the user from the server
// by supplying access and refresh tokens for the API.
export const useFetchUser = (
  props: IUseFetchUserProps,
  options?: UseQueryOptions<AxiosResponse, any, AxiosResponse>
) => {
  const query = useQuery(
    "user",
    async () => {
      const response = await axios.get("/api/users/me", {
        headers: {
          "X-Refresh-Token": `${props.refreshToken}`,
          Authorization: `Bearer ${props.accessToken}`,
        },
      });

      return response;
    },
    options as any
  );

  return query;
};
