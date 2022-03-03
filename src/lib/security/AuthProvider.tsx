import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { noop } from "lodash";
import { useRouter } from "next/router";
import { useToast } from "../ui/useToast";
import { useFetchUser } from "./useFetchUser";
import { Flex, Spinner } from "@chakra-ui/react";
import { useFetchSession } from "./useFetchSession";

interface User {
  id: string;
  email: string;
  lastName: string;
  username: string;
  firstName: string;
}

interface IAuthContext {
  user: User | null;
  signOut: () => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  signOut: noop,
});

interface IAuthProviderProps {
  children?: ReactNode;
}

export const useAuthProvider = (): IAuthContext =>
  useContext<IAuthContext>(AuthContext);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const { isLoading: sessionIsLoading, data: sessionData } = useFetchSession();
  const { isLoading: userIsLoading, data: userResponse } = useFetchUser(
    sessionData?.data,
    {
      enabled: !sessionIsLoading,
    }
  );

  const toast = useToast();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // This function will be used for logging the user out and redirecting them
  // to the main page.
  const signOut = async () => {
    const response = await axios.post("/api/auth/logout", undefined, {
      validateStatus: () => true,
    });

    if (response.status === 200 && !response.data.error) {
      setUser(null);
      await router.push("/");
    } else {
      toast({
        title: "There was an error",
        description: "We were not able to log you out",
      });

      router.back();
    }
  };

  useEffect(() => {
    if (!sessionIsLoading) {
      if (userResponse?.status === 200) setUser(userResponse.data);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userResponse, sessionData]);

  return userIsLoading || sessionIsLoading ? (
    <Flex
      w={"full"}
      h={"100vh"}
      bgColor={"gray.900"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner color={"purple.400"} />
    </Flex>
  ) : (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
